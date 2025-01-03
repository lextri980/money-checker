"use client";
import { useEffect, useState } from "react";

export default function useClientCookie(cookieName: string) {
  const [cookieValue, setCookieValue] = useState("");

  useEffect(() => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const splitedCookie = decodedCookie.split(";");
    for (let i = 0; i < splitedCookie.length; i++) {
      let cookie = splitedCookie[i];
      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        setCookieValue(cookie.substring(name.length, cookie.length));
        return;
      }
    }
  }, [cookieName]);

  return `${cookieValue}`;
}
