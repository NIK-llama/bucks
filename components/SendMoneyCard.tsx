"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SpinnerButton } from "@/components/SpinnerButton";

interface SendMoneyCardProps {
  name: string;
  id: string | null;
}

export function SendMoneyCard({ name, id }: SendMoneyCardProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      return toast.error("Please enter a valid amount.");
    }

    setIsLoading(true);

    try {
      const amountInPaise = Math.round(parseFloat(amount) * 100);

      await axios.post("/api/v1/transfer", {
        to: Number(id),
        amount: amountInPaise,
      });

      toast.success("Transfer Successful", {
        description: `Sent Rs ${amount} to ${name}`,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error: unknown) {
      let message = "Transaction could not be completed.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error ?? message;
      }

      toast.error("Transfer Failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="space-y-1 pt-12">
          <CardTitle className="text-3xl font-bold text-center">
            Send Money
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleTransfer}>
          <CardContent className="space-y-6 px-8 pb-10">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-green-500 text-white text-xl font-bold">
                  {name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold">{name}</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Amount (in Rs)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01" // Allows decimals for Paise in the UI
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <SpinnerButton isLoading={isLoading} type="transfer" />
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
