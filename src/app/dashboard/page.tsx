import DashNav from "@/components/dashboard/DashNav";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getUserCoins } from "@/actions/fetchActions";
import UrlInput from "@/components/dashboard/UrlInput";

async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userCoins = await getUserCoins(session?.user?.id!);
  return (
    <>
      <div className="container">
        <DashNav user={session?.user!} userCoins={userCoins} />
        <UrlInput user={session?.user!} />
      </div>
    </>
  );
}

export default Dashboard;
