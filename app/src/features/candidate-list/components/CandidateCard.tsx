import { 
  Calendar, FileText, Mail, MapPin, GraduationCap 
} from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Separator } from "@/shared/components/ui/separator";
import type { Candidate } from "../types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  onSchedule: (candidateId: string) => void;
  onSummary: (candidateId: string) => void;
}

const CandidateCard = ({ candidate, onSchedule, onSummary }: CandidateCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Candidate Info */}
          <div className="flex items-start gap-4 flex-1">
            <Avatar className="h-12 w-12 border-2 border-gray-100">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0 space-y-3">
              {/* Name and Status */}
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                <Badge 
                  variant="outline" 
                  className={`${getStatusColor(candidate.interviewStatus)} capitalize font-medium`}
                >
                  {candidate.interviewStatus}
                </Badge>
              </div>

              {/* Contact and Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{candidate.experience}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {candidate.summary}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {candidate.skills.slice(0, 4).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                  >
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 4 && (
                  <Badge variant="outline" className="text-gray-500">
                    +{candidate.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Actions - Improved placement */}
          <div className="flex flex-row lg:flex-col gap-3 lg:min-w-[140px]">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSchedule(candidate.id)}
              className="w-full lg:w-auto justify-center lg:justify-start px-4 py-2 h-10"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button 
              size="sm"
              onClick={() => onSummary(candidate.id)}
              className="w-full lg:w-auto justify-center lg:justify-start px-4 py-2 h-10 bg-blue-600 hover:bg-blue-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Summary
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
