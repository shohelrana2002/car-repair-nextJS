import loginUser from "@/app/actions/auth/loginUser";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect, { collectionName } from "./dbConnect";
const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your Email",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await loginUser(credentials);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email, image, name } = user;
        const userCollection = dbConnect(collectionName.USERS);
        const userInsert = await userCollection.findOne({ providerAccountId });
        if (!userInsert) {
          const payLoad = {
            email,
            image,
            name,
            providerAccountId,
            provider,
          };
          await userCollection.insertOne(payLoad);
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
};

export default authOptions;
