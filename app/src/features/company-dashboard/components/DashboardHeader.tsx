import { FileText } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface DashboardHeaderProps {
  onViewAllJobs: () => void;
}

const DashboardHeader = ({ onViewAllJobs }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your recruitment pipeline</p>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline" onClick={onViewAllJobs}>
          <FileText className="h-4 w-4 mr-2" />
          View All Jobs
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
