"use client";
import { useSearchParams } from "next/navigation";
import { SendMoneyCard } from "@/components/SendMoneyCard";
import { Suspense } from "react";

export default function SendPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SendContent />
    </Suspense>
  );
}

function SendContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name") || "Recipient";

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md p-4">
        <SendMoneyCard name={name} id={id} />
      </div>
    </div>
  );
}