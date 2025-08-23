import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import type { Activity } from "../types/dashboard";

interface RecentActivitiesCardProps {
  activities: Activity[];
  onViewAll: () => void;
  onActivityClick: (activity: Activity) => void;
}

const RecentActivitiesCard = ({ activities, onViewAll, onActivityClick }: RecentActivitiesCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-xl text-gray-900">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates in your recruitment process</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => onActivityClick(activity)}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{activity.type}</h4>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(activity.status)} capitalize`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">{activity.candidate}</span> • {activity.position}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesCard;
