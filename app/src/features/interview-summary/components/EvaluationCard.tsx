import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { QuestionAnswer } from "../types/interview";

interface EvaluationCardProps {
  questions: QuestionAnswer[];
  overallRating: number;
}

const EvaluationCard = ({ questions, overallRating }: EvaluationCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Overall Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Technical Skills:</span>
          <div className="flex">{renderStars(4)}</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Communication:</span>
          <div className="flex">{renderStars(5)}</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Problem Solving:</span>
          <div className="flex">{renderStars(4)}</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Cultural Fit:</span>
          <div className="flex">{renderStars(5)}</div>
        </div>
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900">Overall Rating:</span>
            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars(overallRating)}</div>
              <span className="font-bold text-gray-900">{overallRating}/5</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationCard;
