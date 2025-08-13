"use client";
// Global gameplay store untuk status pause / resume dan statistik dasar.
// Fokus saat ini sederhana: simpan apakah game sedang di‑pause.
// Disiapkan extensible untuk limit durasi pause (misal 20s max) & sync real‑time nanti.

import { create } from "zustand";

// Konfigurasi default (bisa diubah nanti jika ada rule baru)
// Format ekspresif: detik * 1000 (menit * 60 * 1000, dst).
// const PAUSE_LIMIT_MS = 20 * 1000; // (PROD) Batas total akumulasi pause per match 20 detik
const PAUSE_LIMIT_MS = 0; // (DEV) 0 = unlimited (tidak dibatasi sementara untuk development)
const SIMULATED_SOCKET_LATENCY_MS = 400; // Simulasi RTT server (sementara sebelum Socket.IO asli)

// Tipe state utama
interface GameplayState {
  // ===== PAUSE STATE =====
  isPaused: boolean;
  lastPausedAt: number | null; // timestamp mulai pause aktif sekarang
  pauseAccumulatedMs: number; // total durasi pause final (yang sudah ditutup resume)
  pauseCount: number;
  pauseLimitMs: number; // batas durasi pause (future enforcement)
  isPauseSyncing: boolean; // sedang menunggu "ack" simulasi server untuk pause/resume
  pendingPauseTarget: "pause" | "resume" | null; // target state yang sedang di-sync
  lastPauseSyncError: string | null; // jika simulasi gagal (future)

  // ===== MATCH TIMER STATE =====
  matchDurationMs: number; // default 10 menit = 600_000ms
  matchStarted: boolean;
  matchFinished: boolean;
  matchStartAt: number | null; // kapan match dimulai
  matchFinishAt: number | null; // kapan match selesai (natural / force end)

  // ===== ACTIONS (Pause) =====
  pause: () => void; // async-simulated (commit setelah timeout)
  resume: () => void; // async-simulated
  togglePause: () => void; // pilih pause/resume bergantung state
  resetPauseStats: () => void;

  // ===== ACTIONS (Match) =====
  startMatch: (opts?: { durationMs?: number; resetPause?: boolean }) => void;
  forceEndMatch: () => void; // paksa selesai sekarang
  resetMatch: () => void; // reset ke state awal (tanpa start)

  // ===== HELPERS =====
  getRemainingPauseMs: () => number; // sisa kuota pause (tidak negatif)
  getMatchElapsedMs: () => number; // waktu berjalan (exclude pause aktif)
  getMatchRemainingMs: () => number; // waktu tersisa (0 jika habis / belum mulai => full duration)
  isPauseUnlimited: () => boolean; // dev helper
}

export const useGameplayStore = create<GameplayState>((set, get) => ({
  // ===== INITIAL VALUES =====
  isPaused: false,
  lastPausedAt: null,
  pauseAccumulatedMs: 0,
  pauseCount: 0,
  pauseLimitMs: PAUSE_LIMIT_MS,
  isPauseSyncing: false,
  pendingPauseTarget: null,
  lastPauseSyncError: null,

  matchDurationMs: 600_000, // 10 menit default
  matchStarted: false,
  matchFinished: false,
  matchStartAt: null,
  matchFinishAt: null,

  // ===== PAUSE ACTIONS =====
  pause: () => {
    const {
      isPaused,
      lastPausedAt,
      matchStarted,
      matchFinished,
      isPauseSyncing,
    } = get();
    if (!matchStarted || matchFinished) return; // tidak boleh pause sebelum start / sesudah selesai
    if (isPaused) return; // sudah pause
    if (lastPausedAt !== null) return; // safety
    if (isPauseSyncing) return; // request in-flight
    // Simulasi kirim event ke server: set flag syncing dahulu
    set({
      isPauseSyncing: true,
      pendingPauseTarget: "pause",
      lastPauseSyncError: null,
    });
    setTimeout(() => {
      // Future: jika server tolak, set error & batal
      const { pendingPauseTarget } = get();
      if (pendingPauseTarget !== "pause") return; // Race / dibatalkan
      set({
        isPaused: true,
        lastPausedAt: Date.now(),
        pauseCount: get().pauseCount + 1,
        isPauseSyncing: false,
        pendingPauseTarget: null,
      });
    }, SIMULATED_SOCKET_LATENCY_MS);
  },

  resume: () => {
    const { isPaused, matchStarted, matchFinished, isPauseSyncing } = get();
    if (!matchStarted || matchFinished) return;
    if (!isPaused) return; // sudah jalan
    if (isPauseSyncing) return; // tunggu request sebelumnya
    set({
      isPauseSyncing: true,
      pendingPauseTarget: "resume",
      lastPauseSyncError: null,
    });
    setTimeout(() => {
      const {
        pendingPauseTarget,
        lastPausedAt: lp,
        pauseAccumulatedMs: acc,
      } = get();
      if (pendingPauseTarget !== "resume") return; // Race
      const now = Date.now();
      const added = lp ? now - lp : 0;
      set({
        isPaused: false,
        lastPausedAt: null,
        pauseAccumulatedMs: acc + added,
        isPauseSyncing: false,
        pendingPauseTarget: null,
      });
    }, SIMULATED_SOCKET_LATENCY_MS);
  },

  togglePause: () => {
    const { isPaused } = get();
    if (isPaused) get().resume();
    else get().pause();
  },

  resetPauseStats: () => {
    set({
      isPaused: false,
      lastPausedAt: null,
      pauseAccumulatedMs: 0,
      pauseCount: 0,
      isPauseSyncing: false,
      pendingPauseTarget: null,
      lastPauseSyncError: null,
    });
  },

  // ===== MATCH ACTIONS =====
  startMatch: (opts) => {
    const { matchStarted } = get();
    if (matchStarted) return; // idempotent
    const duration = opts?.durationMs ?? get().matchDurationMs;
    if (opts?.durationMs) {
      // Jika custom duration diberikan, simpan sebagai baseline baru.
      set({ matchDurationMs: duration });
    }
    if (opts?.resetPause !== false) {
      // Reset pause stats by default sebelum mulai match.
      set({
        isPaused: false,
        lastPausedAt: null,
        pauseAccumulatedMs: 0,
        pauseCount: 0,
      });
    }
    set({
      matchStarted: true,
      matchFinished: false,
      matchStartAt: Date.now(),
      matchFinishAt: null,
    });
  },

  forceEndMatch: () => {
    const { matchStarted, matchFinished, matchFinishAt } = get();
    if (!matchStarted || matchFinished) return;
    set({
      matchFinished: true,
      matchFinishAt: matchFinishAt ?? Date.now(),
      isPaused: false,
      lastPausedAt: null,
      isPauseSyncing: false,
      pendingPauseTarget: null,
    });
  },

  resetMatch: () => {
    set({
      matchStarted: false,
      matchFinished: false,
      matchStartAt: null,
      matchFinishAt: null,
      isPaused: false,
      lastPausedAt: null,
      isPauseSyncing: false,
      pendingPauseTarget: null,
      lastPauseSyncError: null,
    });
  },

  // ===== HELPERS =====
  getRemainingPauseMs: () => {
    const { pauseLimitMs, pauseAccumulatedMs, isPaused, lastPausedAt } = get();
    if (pauseLimitMs <= 0) return Number.POSITIVE_INFINITY; // unlimited mode dev
    let used = pauseAccumulatedMs;
    if (isPaused && lastPausedAt) used += Date.now() - lastPausedAt;
    return Math.max(0, pauseLimitMs - used);
  },

  getMatchElapsedMs: () => {
    const {
      matchStarted,
      matchStartAt,
      pauseAccumulatedMs,
      isPaused,
      lastPausedAt,
      matchFinished,
      matchFinishAt,
    } = get();
    if (!matchStarted || !matchStartAt) return 0;
    const now = matchFinished && matchFinishAt ? matchFinishAt : Date.now();
    let pauseUsed = pauseAccumulatedMs;
    if (isPaused && lastPausedAt) pauseUsed += now - lastPausedAt; // hitung pause aktif
    const elapsed = now - matchStartAt - pauseUsed;
    return Math.max(0, elapsed);
  },

  getMatchRemainingMs: () => {
    const { matchDurationMs } = get();
    const elapsed = get().getMatchElapsedMs();
    return Math.max(0, matchDurationMs - elapsed);
  },
  isPauseUnlimited: () => get().pauseLimitMs <= 0,
}));

// Catatan Integrasi (sementara):
// 1. Ganti state lokal isPaused di komponen dengan: const { isPaused, togglePause } = useGameplayStore();
// 2. Untuk enforce limit nanti: sebelum pause(), cek getRemainingPauseMs() > 0.
// 3. Saat end match atau keluar room, panggil resetPauseStats().
// 4. Sinkronisasi real-time (Socket.IO) bisa emit event tiap pause/resume untuk broadcast ke lawan.

// Contoh penggunaan cepat:
// const isPaused = useGameplayStore(s => s.isPaused);
// const togglePause = useGameplayStore(s => s.togglePause);
// <GameButton onTouch={togglePause}>{isPaused ? 'Resume' : 'Pause'}</GameButton>
// const matchRemaining = useGameplayStore(s => s.getMatchRemainingMs());
// const startMatch = useGameplayStore(s => s.startMatch);
// useEffect(() => { startMatch(); }, []);
