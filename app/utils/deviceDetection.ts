/**
 * Triple Detection Method untuk Device Detection
 * Sesuai instruksi Math Castle - akurasi maksimal untuk mobile-only access
 */

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLaptop: boolean; // Add isLaptop property
  deviceType: "mobile" | "tablet" | "desktop" | "laptop"; // Include laptop as a valid type
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
    "ipad",
    "ipod",
    "blackberry",
    "windows phone",
    "mobile",
    "opera mini",
  ];

  return mobileKeywords.some((keyword) => userAgent.includes(keyword));
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
      deviceType: "desktop",
      userAgent: "",
      screenSize: { width: 0, height: 0 },
      hasTouchCapability: false,
    };
  }

  const isMobileUA = detectMobileUserAgent();
  const isMobileScreen = detectMobileScreenSize();
  const hasTouch = detectTouchCapability();

  const { innerWidth, innerHeight } = window;

  const mobileScore = [isMobileUA, isMobileScreen, hasTouch].filter(
    Boolean
  ).length;
  const isMobile = mobileScore >= 2;

  const isTablet = hasTouch && innerWidth > 768 && innerWidth <= 1024; // Ensure tablet detection is accurate
  const isLaptop = !hasTouch && innerWidth > 1024 && innerWidth <= 1440; // Add laptop detection logic
  const isDesktop = !isMobile && !isTablet && !isLaptop;

  let deviceType: "mobile" | "tablet" | "desktop" | "laptop" = "desktop"; // Add laptop as a valid type
  if (isMobile) deviceType = "mobile";
  else if (isTablet) deviceType = "tablet";
  else if (isLaptop) deviceType = "laptop"; // Assign laptop type

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLaptop,
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
