"use client";
import { useEffect, useState } from "react"; // Added useEffect import
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

export function Balance() {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("/api/v1/balance");
        console.log(response.data.balance)
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex items-center px-8 py-6 border-b border-slate-100 dark:border-slate-800">
      <div className="font-bold text-lg text-slate-900 dark:text-slate-100">
        Your balance
      </div>
      <div className="font-semibold text-lg ml-4 text-slate-900 dark:text-slate-100">
        {loading ? (
          <Skeleton className="h-6 w-24 inline-block" />
        ) : (
          <span>
            Rs{" "}
            {(balance / 100).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        )}
      </div>
    </div>
  );
}
