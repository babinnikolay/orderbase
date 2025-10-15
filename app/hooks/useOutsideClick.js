"use client";
import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () => removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return modalRef;
}
