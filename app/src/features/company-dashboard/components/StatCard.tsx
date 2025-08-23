import { Card, CardContent } from "@/shared/components/ui/card";
import type { Stat } from "../types/dashboard";

interface StatCardProps {
  stat: Stat;
}

const StatCard = ({ stat }: StatCardProps) => {
  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'green': return 'text-green-600 bg-green-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      case 'emerald': return 'text-emerald-600 bg-emerald-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const IconComponent = stat.icon;

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </div>
          <div className={`p-3 rounded-full ${getIconColor(stat.color)}`}>
            <IconComponent className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
