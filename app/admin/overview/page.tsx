import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGolferCount } from "@/lib/actions/golfer.actions";
import { getUserCount } from "@/lib/actions/user.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { formatNumber } from "@/lib/utils";
import { User, Users, LandPlot } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import golferIcon from "@/assets/golfer.svg";
import { getTwoManTeamCount } from "@/lib/actions/two-man-team.actions";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const AdminOverviewPage = async () => {
  await requireAdmin();
  const { userCount } = await getUserCount();
  const { golferCount } = await getGolferCount();
  const { twoManTeamCount } = await getTwoManTeamCount();
  const eventCount = 0;

  return (
    <div className="space-y-2">
      <h1 className="h2-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href={"/admin/users"}>
          <Card className="hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <User />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(userCount || 0)}
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href={"/admin/golfers"}>
          <Card className="hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Golfers</CardTitle>
              <Image
                src={golferIcon}
                width={25}
                height={25}
                alt="Golfer Icon"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(golferCount || 0)}
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href={"/admin/two-man-teams"}>
          <Card className="hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Two Man Teams
              </CardTitle>
              <Users />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(twoManTeamCount || 0)}
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href={"/admin/events"}>
          <Card className="hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <LandPlot />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(eventCount || 0)}
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
