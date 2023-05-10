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

async jwt(token, user, account) {
  // 로그인 후 관리자 여부를 판단
  if (user?.birthday === '2002-11-28') {
    token.isAdmin = true;
  }
  return token;
},

////(작동 안되면 삭제할 공간)

    async session({ session, token, user }) {
      session.user.id = token.sub;
      session.user.name = token.name;
// console.log("token", token);

////망하면 지울 것


////망하면 지울 것



      return session;
    },
  },
});
