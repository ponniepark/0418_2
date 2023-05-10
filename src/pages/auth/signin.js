import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";








export default function Signin() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogin = () => {
    const password = prompt("Enter the password:");
    if (password === "ponnieguppie") {
      router.push("/admin"); // admin.js에서 작업한 페이지로 변경
    } else {
      alert("idiot");
    }
  };


  return (
    <div className="flex justify-center h-screen">
      {session ? (
        <div className="grid m-auto text-center">
          <div className="m-4">Signed in as {session.user.name}</div>
          <button
            className={`w-40
                      justify-self-center
                      p-1 mb-4
                    bg-blue-500 text-white
                      border border-blue-500 rounded
                    hover:bg-white hover:text-blue-500`}
            onClick={() => router.push("/")}
          >
            Go to Home
          </button>
          <button
            className={`w-40
                      justify-self-center
                      p-1 mb-4
                    text-blue-500
                      border border-blue-500 rounded
                    hover:bg-white hover:text-blue-500`}
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="grid m-auto text-center">
          <div className="m-4">Not signed in</div>
          <button
            className={`w-40
                      justify-self-center
                      p-1 mb-4
                    bg-blue-500 text-white
                      border border-blue-500 rounded
                    hover:bg-white hover:text-blue-500`}
            onClick={() => signIn()}
          >
            Sign in
          </button>

          <button
      className={`w-40 justify-self-center p-1 mb-4 bg-blue-500 text-white border border-blue-500 rounded hover:bg-white hover:text-blue-500`}
      style={{ position: "fixed", bottom: 0, right: 0 }}
      onClick={handleLogin}
    >
      Admin?
    </button>


        </div>
      )}
    </div>
  );
}


