import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    goatcounter?: {
      count: (opts: { path: string; title?: string }) => void;
    };
  }
}

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "/";
    const send = () => {
      window.goatcounter?.count({ path, title: document.title });
    };

    if (window.goatcounter?.count) {
      send();
    } else {
      // 等脚本加载完再发送（首次加载时）
      window.addEventListener("load", send, { once: true });
    }
  }, [location.pathname]);
}
