import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface ConcernsCardProps {
  concerns: string[];
}

const ConcernsCard = ({ concerns }: ConcernsCardProps) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="flex items-center text-yellow-700 text-lg">
          <MessageSquare className="h-5 w-5 mr-2" />
          Areas for Improvement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {concerns.map((concern, index) => (
            <li key={index} className="flex items-start">
              <div className="h-4 w-4 mr-3 mt-0.5 bg-yellow-400 rounded-full flex-shrink-0" />
              <span className="text-sm text-gray-700 leading-relaxed">{concern}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ConcernsCard;
