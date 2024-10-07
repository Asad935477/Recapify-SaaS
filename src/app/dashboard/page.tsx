import DashNav from "@/components/dashboard/DashNav";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <>
      <div className="container">
        <DashNav user={session?.user!} userCoins={null} />
      </div>
    </>
  );
}

export default Dashboard;
