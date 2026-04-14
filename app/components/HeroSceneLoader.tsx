"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-background" />
  ),
});

export default function HeroSceneLoader() {
  return <HeroScene />;
}
