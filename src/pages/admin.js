import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Admin() {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/signin");
    },
  });

  if (!session.user.isAdmin) {
    // 권한이 없으면 홈 페이지로 이동
    router.replace("/");
    return null;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}


/*
  import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Admin() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session?.user?.isAdmin) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      {/* 관리자 페이지 내용을 작성하세요 }
    </div>
  );
}

*/

/*
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: session } = useSession();
  const router = useRouter();

  // 만약 현재 사용자가 관리자가 아니라면 홈페이지로 이동합니다.
  if (!session?.user?.isAdmin) {
    router.replace("/");
    return null;
  }

  return (
    <div>
      <h1>관리자 페이지</h1>
      {/* 관리자 페이지에 필요한 컴포넌트들을 작성합니다. }
    </div>
  );
}






