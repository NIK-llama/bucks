import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserProps {
    username: string;
}
export function Users({username}: UserProps) {
    const firstLetter = username.charAt(0).toUpperCase();
  return (
    <div className="px-8 mt-4">
      <h2 className="font-bold text-xl mb-4">Users</h2>
      <div className="my-2">
        <Input 
          type="text" 
          placeholder="Search users..." 
          className="w-full border-slate-200"
        />
      </div>
      <div className="mt-6">
        {/* User Row */}
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <div className="rounded-full h-12 w-12 bg-slate-500 flex justify-center items-center mr-4">
              {firstLetter}
            </div>
            <div className="font-semibold text-lg">{username}</div>
          </div>
          <Button className="bg-slate-900 text-white hover:bg-slate-800">
            Send Money
          </Button>
        </div>
      </div>
    </div>
  );
}