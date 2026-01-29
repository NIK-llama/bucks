import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Appbar() {
  return (
    <div className="flex justify-between items-center border-b px-8 py-4 ">
      <div className="font-bold text-lg">
        BuCKs
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Hello</span>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-slate-500 text-white">U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}