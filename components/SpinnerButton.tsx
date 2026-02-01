import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface SpinnerButtonProps {
  isLoading: boolean;
  type: "signup" | "signin" | "transfer";
}

export function SpinnerButton({ isLoading, type }: SpinnerButtonProps) {
  const labels = {
    signup: "Sign Up",
    signin: "Sign In",
    transfer: "Initiate Transfer",
  };

  const baseStyles = "w-full font-medium transition-colors";
  const transferStyles = "bg-orange-500 text-white hover:bg-orange-600 py-6 text-md";
  const authStyles = "bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 dark:bg-white dark:text-black dark:hover:bg-slate-200";
  
  return (
    <Button 
      type="submit" 
      disabled={isLoading}
      className={cn(
        baseStyles, 
        type === "transfer" ? transferStyles : authStyles
      )} 
    >
      {isLoading ? (
        <>
          <Spinner className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        labels[type]
      )}
    </Button>
  );
}