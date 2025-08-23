import { Calendar, Clock, User, Star } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import type { InterviewData } from "../types/interview";

interface CandidateOverviewProps {
  interviewData: InterviewData;
}

const CandidateOverview = ({ interviewData }: CandidateOverviewProps) => {
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

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "hire": return "bg-green-50 text-green-700 border-green-200";
      case "no-hire": return "bg-red-50 text-red-700 border-red-200";
      case "maybe": return "bg-orange-50 text-orange-700 border-orange-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Candidate Info */}
          <div className="flex items-start gap-4 flex-1">
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b372?w=64&h=64&fit=crop&crop=face" />
              <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                {interviewData.candidateName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0 space-y-3">
              {/* Name and Status */}
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900">{interviewData.candidateName}</h3>
                <Badge 
                  variant="outline" 
                  className={`${getRecommendationColor(interviewData.recommendation)} capitalize font-medium`}
                >
                  {interviewData.recommendation.replace('-', ' ')}
                </Badge>
              </div>

              {/* Contact and Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{new Date(interviewData.interviewDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{interviewData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{interviewData.interviewer}</span>
                </div>
              </div>

              {/* Position */}
              <p className="text-sm text-blue-600 font-medium">{interviewData.position}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-end gap-2 lg:min-w-[140px]">
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Rating:</span>
                <div className="flex">{renderStars(interviewData.overallRating)}</div>
              </div>
              <span className="text-sm text-gray-600">({interviewData.overallRating}/5)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateOverview;
