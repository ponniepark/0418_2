import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import TodoList from "../components/TodoList";



export default function Home() {
  const router = useRouter();
  const { data : session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/signin");
    },
  });

  return (
    <div>

<nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {session.user.isAdmin && (
            <li>
              <a href="/admin">Admin</a>
            </li>
          )}
        </ul>
      </nav>

      <TodoList />
    </div>
  );
}
