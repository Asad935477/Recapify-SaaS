import DashNav from "@/components/dashboard/DashNav";
import { getServerSession } from "next-auth";
import { getOldSummary, getUserCoins } from "@/actions/fetchActions";
import UrlInput from "@/components/dashboard/UrlInput";
import OldSummaryCard from "@/components/dashboard/OldSummaryCard";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";

async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userCoins = await getUserCoins(session?.user?.id!);
  const oldSummaries = await getOldSummary(session?.user?.id!);

  return (
    <>
      <div className="container">
        <DashNav user={session?.user!} userCoins={userCoins} />
        <UrlInput user={session?.user!} />
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oldSummaries &&
              oldSummaries.length > 0 &&
              oldSummaries.map((item, index) => (
                <OldSummaryCard summary={item} key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
