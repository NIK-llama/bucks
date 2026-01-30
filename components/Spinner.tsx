import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Use lowercase 'boolean' for TypeScript types
export function SpinnerButton({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading ? (
        <Button variant="outline" disabled className="w-full">
          <Spinner className="mr-2 h-4 w-4" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Signup
        </Button>
      )}
    </>
  );
}