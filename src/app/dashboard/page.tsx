import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

type Props = {};

export default async function DashboardPage({}: Props) {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  return <div>{user?.email}</div>;
}
