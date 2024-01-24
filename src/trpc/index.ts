import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { procedure, router } from "./trpc";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const appRouter = router({
  authCallback: procedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user: KindeUser | null = await getUser();

    if (!user?.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email
        }
      })
    }

    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
