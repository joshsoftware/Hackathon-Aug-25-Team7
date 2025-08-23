import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { SystemOverview } from "../types/dashboard";

interface SystemOverviewCardProps {
  systemOverview: SystemOverview;
}

const SystemOverviewCard = ({ systemOverview }: SystemOverviewCardProps) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">System Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Active Users</span>
          <span className="text-sm font-bold text-gray-900">{systemOverview.activeUsers}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Pending Reviews</span>
          <span className="text-sm font-bold text-gray-900">{systemOverview.pendingReviews}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">This Month Hires</span>
          <span className="text-sm font-bold text-green-600">{systemOverview.monthlyHires}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Success Rate</span>
          <span className="text-sm font-bold text-green-600">{systemOverview.successRate}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemOverviewCard;
