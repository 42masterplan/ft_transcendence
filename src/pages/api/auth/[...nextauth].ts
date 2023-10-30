import NextAuth from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
import FortyTwoProvider from '@auth/core/providers/42-school';
export default NextAuth({
  providers: [
    FortyTwoProvider({
      client_id: process.env.FortyTwo_CLIENT_ID,
      client_secret: process.env.FortyTwo_SECRET
    })
  ]
});
