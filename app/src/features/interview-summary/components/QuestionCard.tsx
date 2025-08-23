import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import type { QuestionAnswer } from "../types/interview";

interface QuestionCardProps {
  questionAnswer: QuestionAnswer;
  index: number;
}

const QuestionCard = ({ questionAnswer, index }: QuestionCardProps) => {
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
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-gray-900">Question {index + 1}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex">{renderStars(questionAnswer.rating)}</div>
            <span className="text-sm text-gray-600">({questionAnswer.rating}/5)</span>
          </div>
        </div>
        <CardDescription className="text-base font-medium text-gray-700 mt-2">
          {questionAnswer.question}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Answer:</h4>
          <p className="text-gray-700 leading-relaxed text-sm">{questionAnswer.answer}</p>
        </div>
        {questionAnswer.notes && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Interviewer Notes:</h4>
            <p className="text-sm text-gray-600 italic">{questionAnswer.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
