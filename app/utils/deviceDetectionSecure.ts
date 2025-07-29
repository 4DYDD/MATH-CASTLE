/**
 * ENHANCED Triple Detection Method untuk Device Detection
 * Multiple layers security untuk mencegah bypass
 * Sesuai instruksi Math Castle - akurasi maksimal untuk mobile-only access
 */

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: "mobile" | "tablet" | "desktop";
  userAgent: string;
  screenSize: {
    width: number;
    height: number;
  };
  hasTouchCapability: boolean;
  confidence: number; // 0-100 confidence score
  securityFlags: {
    potentialSpoof: boolean;
    suspiciousUA: boolean;
    inconsistentData: boolean;
  };
}

/**
 * 1. Enhanced User Agent Detection dengan anti-spoof
 */
export const detectMobileUserAgent = (): {
  isMobile: boolean;
  suspicious: boolean;
} => {
  if (typeof window === "undefined")
    return { isMobile: false, suspicious: false };

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    "android",
    "webos",
    "iphone",
    "ipad",
    "ipod",
    "blackberry",
    "windows phone",
    "mobile",
    "opera mini",
  ];

  const isMobile = mobileKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );

  // Anti-spoof detection
  const suspiciousPatterns = [
    "chrome/99.0.0.0", // Common spoof pattern
    "mozilla/5.0 (mobile;", // Malformed mobile UA
    "desktop mode", // Explicit desktop mode mention
  ];

  const suspicious = suspiciousPatterns.some((pattern) =>
    userAgent.includes(pattern)
  );

  return { isMobile, suspicious };
};

/**
 * 2. Enhanced Screen Size Detection dengan multiple checks
 */
interface ScreenData {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
  screenWidth: number;
  screenHeight: number;
  viewportRatio: number;
  screenRatio: number;
  checks: {
    viewportSize: boolean;
    viewportRatio: boolean;
    screenSize: boolean;
    screenRatio: boolean;
    consistent: boolean;
  };
}

export const detectMobileScreenSize = (): {
  isMobile: boolean;
  data: ScreenData;
} => {
  if (typeof window === "undefined")
    return {
      isMobile: false,
      data: {
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0,
        screenWidth: 0,
        screenHeight: 0,
        viewportRatio: 0,
        screenRatio: 0,
        checks: {
          viewportSize: false,
          viewportRatio: false,
          screenSize: false,
          screenRatio: false,
          consistent: false,
        },
      },
    };

  const { innerWidth, innerHeight, outerWidth, outerHeight } = window;
  const { width: screenWidth, height: screenHeight } = window.screen;

  // Multiple size checks
  const viewportRatio =
    Math.max(innerWidth, innerHeight) / Math.min(innerWidth, innerHeight);
  const screenRatio =
    Math.max(screenWidth, screenHeight) / Math.min(screenWidth, screenHeight);

  const maxMobileWidth = 768;
  const minMobileRatio = 1.3;

  const checks = {
    viewportSize: innerWidth <= maxMobileWidth,
    viewportRatio: viewportRatio > minMobileRatio,
    screenSize: screenWidth <= maxMobileWidth,
    screenRatio: screenRatio > minMobileRatio,
    consistent: Math.abs(innerWidth - screenWidth) < 50, // Consistency check
  };

  const mobileChecks = Object.values(checks).filter(Boolean).length;
  const isMobile = mobileChecks >= 3; // Minimal 3 dari 5 checks

  return {
    isMobile,
    data: {
      innerWidth,
      innerHeight,
      outerWidth,
      outerHeight,
      screenWidth,
      screenHeight,
      viewportRatio,
      screenRatio,
      checks,
    },
  };
};

/**
 * 3. Enhanced Touch Capability dengan feature detection
 */
export const detectTouchCapability = (): {
  hasTouch: boolean;
  confidence: number;
} => {
  if (typeof window === "undefined") return { hasTouch: false, confidence: 0 };

  const msMaxTouchPoints =
    (navigator as unknown as { msMaxTouchPoints?: number }).msMaxTouchPoints ||
    0;

  const touchTests = [
    "ontouchstart" in window,
    "ontouchend" in window,
    "ontouchmove" in window,
    navigator.maxTouchPoints > 0,
    msMaxTouchPoints > 0,
    "TouchEvent" in window,
  ];

  const touchScore = touchTests.filter(Boolean).length;
  const hasTouch = touchScore >= 2;
  const confidence = (touchScore / touchTests.length) * 100;

  return { hasTouch, confidence };
};

/**
 * 4. Advanced Device Fingerprinting
 */
export const getDeviceFingerprint = () => {
  if (typeof window === "undefined") return {};

  return {
    pixelRatio: window.devicePixelRatio || 1,
    colorDepth: window.screen.colorDepth || 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine,
    connectionType:
      (navigator as unknown as { connection?: { effectiveType?: string } })
        .connection?.effectiveType || "unknown",
  };
};

/**
 * 5. Comprehensive Device Detection dengan Security Layers
 */
export const getDeviceInfo = (): DeviceInfo => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      deviceType: "desktop",
      userAgent: "",
      screenSize: { width: 0, height: 0 },
      hasTouchCapability: false,
      confidence: 0,
      securityFlags: {
        potentialSpoof: false,
        suspiciousUA: false,
        inconsistentData: false,
      },
    };
  }

  const uaResult = detectMobileUserAgent();
  const sizeResult = detectMobileScreenSize();
  const touchResult = detectTouchCapability();
  const fingerprint = getDeviceFingerprint();

  const { innerWidth, innerHeight } = window;

  // Scoring system
  const scores = {
    userAgent: uaResult.isMobile ? 30 : 0,
    screenSize: sizeResult.isMobile ? 25 : 0,
    touch: touchResult.hasTouch ? 25 : 0,
    fingerprint: (fingerprint.pixelRatio || 1) > 1 ? 10 : 0, // High DPI typical untuk mobile
    consistency: 10, // Base score
  };

  // Security flags
  const securityFlags = {
    potentialSpoof: uaResult.suspicious,
    suspiciousUA: uaResult.suspicious,
    inconsistentData: !sizeResult.data.checks.consistent,
  };

  // Adjust scores berdasarkan security flags
  if (securityFlags.potentialSpoof) scores.userAgent -= 20;
  if (securityFlags.inconsistentData) scores.screenSize -= 15;

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = Math.max(0, Math.min(100, totalScore));

  // Final detection dengan threshold
  const isMobile = confidence >= 60 && !securityFlags.potentialSpoof;
  const isTablet =
    touchResult.hasTouch && innerWidth > 768 && innerWidth <= 1024 && !isMobile;
  const isDesktop = !isMobile && !isTablet;

  let deviceType: "mobile" | "tablet" | "desktop" = "desktop";
  if (isMobile) deviceType = "mobile";
  else if (isTablet) deviceType = "tablet";

  return {
    isMobile,
    isTablet,
    isDesktop,
    deviceType,
    userAgent: navigator.userAgent,
    screenSize: { width: innerWidth, height: innerHeight },
    hasTouchCapability: touchResult.hasTouch,
    confidence,
    securityFlags,
  };
};

/**
 * Enhanced security check untuk game access
 */
export const isDeviceAllowed = (): { allowed: boolean; reason?: string } => {
  const deviceInfo = getDeviceInfo();

  // Security validations
  if (deviceInfo.securityFlags.potentialSpoof) {
    return { allowed: false, reason: "Suspicious device signature detected" };
  }

  if (deviceInfo.confidence < 60) {
    return { allowed: false, reason: "Device confidence too low" };
  }

  if (!deviceInfo.isMobile) {
    return { allowed: false, reason: "Mobile device required" };
  }

  return { allowed: true };
};
