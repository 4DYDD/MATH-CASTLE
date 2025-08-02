/**
 * Triple Detection Method untuk Device Detection
 * Sesuai instruksi Math Castle - akurasi maksimal untuk mobile-only access
 */

export type DeviceType =
  | "mobile"
  | "tablet"
  | "desktop"
  | "laptop"
  | "unsupported";

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLaptop: boolean; // Add isLaptop property
  isUnsupported: boolean; // Add isUnsupported property
  deviceType: DeviceType; // Use DeviceType for deviceType
  userAgent: string;
  screenSize: {
    width: number;
    height: number;
  };
  hasTouchCapability: boolean;
}

/**
 * 1. User Agent Detection - Check mobile device signatures
 */
export const detectMobileUserAgent = (): boolean => {
  if (typeof window === "undefined") return false;

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    "android",
    "webos",
    "iphone",
    "ipod",
    "blackberry",
    "windows phone",
    "mobile",
    "opera mini",
  ];

  return mobileKeywords.some((keyword) => userAgent.includes(keyword));
};

/**
 * Detect tablet based on user agent
 */
export const detectTabletUserAgent = (): boolean => {
  if (typeof window === "undefined") return false;

  const userAgent = navigator.userAgent.toLowerCase();
  const tabletKeywords = ["ipad", "tablet", "kindle", "silk", "playbook"];

  return tabletKeywords.some((keyword) => userAgent.includes(keyword));
};

/**
 * 2. Screen Size Detection - Verify mobile screen dimensions
 */
export const detectMobileScreenSize = (): boolean => {
  if (typeof window === "undefined") return false;

  const { innerWidth, innerHeight } = window;
  const maxMobileWidth = 768; // Standar mobile breakpoint
  const aspectRatio =
    Math.max(innerWidth, innerHeight) / Math.min(innerWidth, innerHeight);

  // Mobile biasanya punya aspect ratio > 1.3 dan width <= 768px
  return innerWidth <= maxMobileWidth && aspectRatio > 1.3;
};

/**
 * 3. Touch Capability Detection - Confirm touch interface support
 */
export const detectTouchCapability = (): boolean => {
  if (typeof window === "undefined") return false;

  const msMaxTouchPoints =
    (navigator as unknown as { msMaxTouchPoints?: number }).msMaxTouchPoints ||
    0;

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    msMaxTouchPoints > 0
  );
};

/**
 * Comprehensive Device Detection - Triple Method Combined
 */
export const getDeviceInfo = (): DeviceInfo => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLaptop: false, // Default to false for server-side rendering
      isUnsupported: false,
      deviceType: "desktop",
      userAgent: "",
      screenSize: { width: 0, height: 0 },
      hasTouchCapability: false,
    };
  }

  const isMobileUA = detectMobileUserAgent();
  const isTabletUA = detectTabletUserAgent();
  const isMobileScreen = detectMobileScreenSize();
  const hasTouch = detectTouchCapability();

  const { innerWidth, innerHeight } = window;

  // Debug logs untuk troubleshooting (only in development)
  // if (process.env.NODE_ENV === "development") {
  //   console.log("🔍 Device Detection Debug:", {
  //     userAgent: navigator.userAgent,
  //     screenSize: { innerWidth, innerHeight },
  //     isMobileUA,
  //     isTabletUA,
  //     isMobileScreen,
  //     hasTouch,
  //   });
  // }

  // Tablet detection (prioritize over mobile)
  const isTablet =
    (isTabletUA && hasTouch) ||
    (hasTouch &&
      innerWidth > 768 &&
      innerWidth <= 1024 &&
      innerHeight >= 1024 &&
      innerHeight <= 1366);

  // Mobile detection (exclude tablets)
  const mobileScore = [
    isMobileUA && !isTabletUA,
    isMobileScreen,
    hasTouch,
  ].filter(Boolean).length;
  const isMobile = mobileScore >= 2 && !isTablet;

  const isLaptop = !hasTouch && innerWidth > 1024 && innerWidth <= 1440;
  const isUnsupported =
    hasTouch &&
    innerWidth >= 700 &&
    innerWidth <= 1200 &&
    innerHeight >= 700 &&
    innerHeight <= 1200 &&
    navigator.userAgent.toLowerCase().includes("surface duo");
  const isDesktop = !isMobile && !isTablet && !isLaptop && !isUnsupported;

  // Debug hasil deteksi (only in development)
  // if (process.env.NODE_ENV === "development") {
  //   console.log("📱 Device Detection Results:", {
  //     isMobile,
  //     isTablet,
  //     isDesktop,
  //     isLaptop,
  //     isUnsupported,
  //     mobileScore,
  //   });
  // }

  let deviceType: "mobile" | "tablet" | "desktop" | "laptop" | "unsupported" =
    "desktop";
  if (isTablet) deviceType = "tablet"; // Check tablet first
  else if (isMobile) deviceType = "mobile"; // Then mobile
  else if (isLaptop) deviceType = "laptop";
  else if (isUnsupported) deviceType = "unsupported";

  // if (process.env.NODE_ENV === "development") {
  //   console.log("🎯 Final Device Type:", deviceType);
  // }

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLaptop,
    isUnsupported,
    deviceType,
    userAgent: navigator.userAgent,
    screenSize: { width: innerWidth, height: innerHeight },
    hasTouchCapability: hasTouch,
  };
};

/**
 * Check if device is allowed to access the game
 * Sesuai instruksi: Hanya mobile yang bisa akses game (temporary)
 */
export const isDeviceAllowed = (): boolean => {
  const deviceInfo = getDeviceInfo();
  return deviceInfo.isMobile || deviceInfo.isTablet; // Allow both mobile and tablet devices
};
