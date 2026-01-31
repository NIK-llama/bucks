import { Appbar } from "@/components/Appbar";
import { Balance } from "@/components/Balance";
import { Users } from "@/components/Users";

export default function DashBoard() {

  
  return (
    <div className="min-h-screen">
      <Appbar />
      <main className="max-w-7xl mx-auto">
        <Balance />
        <Users />
      </main>
    </div>
  );
}
