"use client";
import { useSearchParams } from "next/navigation";
import { SendMoneyCard } from "@/components/SendMoneyCard";

export default function SendPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name") || "Friend";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-950">
      <SendMoneyCard name={name}/>
    </div>
  );
}