"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
  fetch("/api/track", {
    method: "POST",
    cache: "no-store",
  });
}, []);


  return null;
}
