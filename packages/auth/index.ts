import { issuer } from "@openauthjs/openauth";
import { CodeUI } from "@openauthjs/openauth/ui/code";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { MemoryStorage } from "@openauthjs/openauth/storage/memory";
import { PrismaClient } from "db";

import { subjects } from "./subjects";

const db = new PrismaClient()

async function getUser(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export default issuer({
  subjects,
  storage: MemoryStorage({
    persist: "./persist.json",
  }),
  providers: {
    code: CodeProvider(
      CodeUI({
        sendCode: async (email, code) => {
          console.log(email, code)
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    let userId: string;

    if (value.provider === "code") {
      const user = await getUser(value.claims.email)

      if (user) {
        userId = user.id
      } else {
        const newUser = await db.user.create({
          data: { email: value.claims.email },
        });

        userId = newUser.id
      }

      return ctx.subject("user", {
        id: userId,
      })
    }

    throw new Error("Invalid provider")
  },
})