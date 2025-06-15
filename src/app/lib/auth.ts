

// import { NextAuthOptions, getServerSession } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectToDatabase } from "./mongodb";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";

// export async function hashPassword(password: string) {
//   return bcrypt.hash(password, 12);
// }

// export async function verifyPassword(plainTextPassword: string, hashedPassword: string) {
//   return bcrypt.compare(plainTextPassword, hashedPassword);
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new Error("Email and password required");
//         }

//         await connectToDatabase();

//         const user = await User.findOne({ email: credentials.email });
//         if (!user) {
//           throw new Error("No user found");
//         }

//         const isValid = await verifyPassword(credentials.password, user.password);
//         if (!isValid) {
//           throw new Error("Invalid password");
//         }
//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       await connectToDatabase();

//       if (account?.provider === "google") {
//         let existingUser = await User.findOne({ email: user.email });

//         if (!existingUser) {
//           existingUser = await User.create({
//             name: user.name,
//             email: user.email,
//             role: "user",
//           });
//         }

//         user.id = existingUser._id.toString();
//         user.role = existingUser.role || "user";
//         user.name = existingUser.name || user.name;
//       }

//       console.log("signIn callback user:", user);
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user && token.id && token.role && token.name) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//         session.user.name = token.name;
//       }
//       return session;
//     },
//   },
// };

// export const auth = () => getServerSession(authOptions);

import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";

// Password helpers
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(plainTextPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      await connectToDatabase();

      if (account?.provider === "google") {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            role: "user",
          });
        }

        user.id = existingUser._id.toString();
        user.role = existingUser.role || "user";
        user.name = existingUser.name || user.name;
      }

      return true;
    },

    async jwt({ token, user }) {
      // Runs at sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? '';
        session.user.role = token.role ?? 'user';
        session.user.name = token.name ?? '';
      }
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

export const auth = () => getServerSession(authOptions);
