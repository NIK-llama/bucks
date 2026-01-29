import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SendMoneyCardProps {
  name: string;
}

export function SendMoneyCard({ name }: SendMoneyCardProps) {
  // We'll use a derived initial for the green circle
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="space-y-1 pt-12">
          <CardTitle className="text-3xl font-bold text-center">
            Send Money
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-8">
          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-xl font-semibold text-white">
              {initial}
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              {name}
            </h3>
          </div>
          
          {/* Input Section */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Amount (in Rs)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="bg-background border-input py-5"
            />
          </div>
        </CardContent>
        <CardFooter className="px-8 pb-12">
          <Button 
            className="w-full bg-orange-400 text-white hover:bg-orange-600 font-medium py-6 text-md"
          >
            Initiate Transfer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}