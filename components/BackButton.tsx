"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  text?: string;
};

export function BackButton({ text = "BACK_TO_GALLERY" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")}
      className="mb-6 flex items-center space-x-2 bg-gray-900 border border-gray-700 px-3 py-2 text-xs text-gray-400 hover:text-lime-300 hover:border-lime-300 transition-colors duration-300 font-mono group"
      style={{
        clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
      }}
    >
      <ArrowLeft size={14} className="group-hover:text-lime-300" />
      <span>{text}</span>
    </button>
  );
} 