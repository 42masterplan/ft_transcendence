import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import FortyTwoProvider from '@auth/core/providers/42-school';
export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
  providers: [
    FortyTwoProvider({
      client_id: process.env.FortyTwo_SCHOOL_CLIENT_ID,
      client_secret: process.env.FortyTwo_SCHOOL_CLIENT_SECRET
    })
  ]
});
