import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {

////(작동 안되면 삭제할 공간)



////(작동 안되면 삭제할 공간)

async signIn(user, account, metadata) {
  if (account.provider === "kakao") {
    // 카카오 로그인인 경우, 관리자 권한 부여
    if (user.kakao_account.email === "pon20150@naver.com") {
      user.isAdmin = true;
    } else {
      user.isAdmin = false;
    }
  }

  return true;
},


    async session({ session, token, user }) {
      session.user.id = token.sub;
      session.user.name = token.name;
// console.log("token", token);

////망하면 지울 것

if (user.email === "pon20150@naver.com") {
  session.user.isAdmin = true;
} else {
  session.user.isAdmin = false;
}
////망하면 지울 것



      return session;
    },
  },
});
