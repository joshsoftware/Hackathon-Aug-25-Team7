import AppHeader from "@/shared/components/layout/AppHeader";
import {
  DashboardHeader,
  StatCard,
  RecentActivitiesCard,
  QuickActionCard,
  SystemOverviewCard
} from "../components";
import { mockStats, mockRecentActivities, mockSystemOverview } from "../data/mockData";

const AdminDashboard = () => {
  const handleViewAllJobs = () => {
    window.location.href = "/jobdescription";
  };

  const handleViewAllActivities = () => {
    // TODO: Navigate to activities page
    console.log("View all activities clicked");
  };

  const handleActivityClick = (activity: any) => {
    // TODO: Handle activity click
    console.log("Activity clicked:", activity);
  };

  const handleGoToJobDescriptions = () => {
    window.location.href = "/jobdescription";
  };

  return (
    <div className="h-screen bg-gray-50">
      <AppHeader />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <DashboardHeader 
          onViewAllJobs={handleViewAllJobs}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities - Takes 2/3 width */}
          <div className="lg:col-span-2">
            <RecentActivitiesCard 
              activities={mockRecentActivities}
              onViewAll={handleViewAllActivities}
              onActivityClick={handleActivityClick}
            />
          </div>

          {/* Quick Action - Takes 1/3 width */}
          <div className="space-y-6">
            <QuickActionCard onGoToJobDescriptions={handleGoToJobDescriptions} />
            <SystemOverviewCard systemOverview={mockSystemOverview} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
