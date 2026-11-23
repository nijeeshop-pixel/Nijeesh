"use client";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottiePlayer({
  data,
  className,
  loop = true,
}: {
  data: unknown;
  className?: string;
  loop?: boolean;
}) {
  return <Lottie animationData={data} loop={loop} autoplay className={className} aria-hidden />;
}
