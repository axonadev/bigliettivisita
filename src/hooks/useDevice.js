import { useState, useEffect } from "react";

const getDeviceInfo = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isAndroid: false,
      isIOS: false,
      isDesktop: false,
      deviceType: "unknown",
    };
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ua = navigator.userAgent;
  const isMobile = width < 600;
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isDesktop = !isMobile && !isAndroid && !isIOS;
  let deviceType = "desktop";
  if (isAndroid) deviceType = "android";
  else if (isIOS) deviceType = "ios";
  else if (isMobile) deviceType = "mobile";
  return {
    width,
    height,
    isMobile,
    isAndroid,
    isIOS,
    isDesktop,
    deviceType,
  };
};

const useDevice = () => {
  const [device, setDevice] = useState(getDeviceInfo());

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceInfo());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return device;
};

export default useDevice;
