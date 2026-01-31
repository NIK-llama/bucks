"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

interface User {
  firstName: string;
  lastName: string;
  _id: string;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filter = searchParams.get("filter") || "";

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!filter || filter.trim() === "") {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/v1/bulk?filter=${filter}`);
        setUsers(response.data.users);
      } catch (e) {
        console.error("Error while fetching users:", e);
      }
    };
    fetchUsers();
  }, [filter]);

  const handleSearch = (term: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("filter", term);
      } else {
        params.delete("filter");
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);
  };

  return (
    <div className="px-8 mt-4">
      <h2 className="font-bold text-xl mb-4">Users</h2>
      <div className="my-2">
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={filter}
          type="text"
          placeholder="Search users..."
          className="w-full border-slate-200"
        />
      </div>

      <div className="mt-6">
        {filter.length > 0 && users.length > 0 ? (
          users.map((user) => <UserRow key={user._id} user={user} />)
        ) : filter.length > 0 ? (
          <div className="text-muted-foreground text-sm">No users found.</div>
        ) : null}
      </div>
    </div>
  );
}

function UserRow({ user }: { user: User }) {
  const router = useRouter();
  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-500 flex justify-center items-center mr-4">
          {user.firstName[0].toUpperCase()}
        </div>
        <div className="font-semibold text-lg">{fullName}</div>
      </div>
      <Button
        onClick={() =>
          router.push(`/send?id=${user._id}&name=${user.firstName}`)
        }
        className="bg-slate-900 text-white hover:bg-slate-800"
      >
        Send Money
      </Button>
    </div>
  );
}
