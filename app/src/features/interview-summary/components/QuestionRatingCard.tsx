import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { QuestionAnswer } from "../types/interview";

interface QuestionRatingCardProps {
  questionAnswer: QuestionAnswer;
  index: number;
}

const QuestionRatingCard = ({ questionAnswer, index }: QuestionRatingCardProps) => {
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
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-gray-900">Question {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex">{renderStars(questionAnswer.rating)}</div>
          <span className="text-sm font-medium text-gray-700">{questionAnswer.rating}/5</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionRatingCard;
