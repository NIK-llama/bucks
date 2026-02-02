"use client";
import useSWR from "swr";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => {
  return axios.get(url).then(res => res.data);
}

export function Balance() {
  const { data, isLoading, error } = useSWR("/api/v1/balance", fetcher);

  if (error) return <div>Failed to load balance</div>;

  return (
    <div className="flex items-center px-8 py-6 border-b">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold text-lg ml-4">
        {isLoading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          `Rs ${(data.balance / 100).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}`
        )}
      </div>
    </div>
  );
}
