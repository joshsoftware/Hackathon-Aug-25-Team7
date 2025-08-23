import { TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface StrengthsCardProps {
  strengths: string[];
}

const StrengthsCard = ({ strengths }: StrengthsCardProps) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="flex items-center text-green-700 text-lg">
          <TrendingUp className="h-5 w-5 mr-2" />
          Strengths
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-3 mt-0.5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 leading-relaxed">{strength}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default StrengthsCard;
