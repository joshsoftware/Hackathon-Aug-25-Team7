import { type FC } from "react";
import {
  Search,
  Filter,
  Plus,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  FileText,
  Badge,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Card, CardContent } from "@/shared/components/ui/card";
import { AppHeader } from "@/shared/components/layout";
import { useNavigate } from "react-router";

interface Job {
  id: number;
  title: string;
  location: string;
  opening: number;
  required_skills: string;
  preferred_skills: string;
  min_experience: number;
  responsibilities: string;
  candidates: number;
  scheduled: number;
  status: "active" | "pending" | "closed";
  department: string;
  salary_range?: string;
}

interface Props {
  jobs: Job[];
  searchQuery: string;
  selectedFilter: string;
  isLoading: boolean;
  error: string | null;
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
  onViewCandidates: (jobId: number) => void;
  onNewJobPosting: () => void;
  onRetry: () => void;
}

export const JobDescriptionComponent: FC<Props> = ({
  jobs,
  searchQuery,
  selectedFilter,
  isLoading,
  error,
  onSearch,
  onFilter,
  onViewCandidates,
  onNewJobPosting,
  onRetry,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const navigate = useNavigate();

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Engineering":
        return "text-blue-600";
      case "Analytics":
        return "text-purple-600";
      case "Product":
        return "text-green-600";
      case "Design":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <AppHeader />
        {/* Error Content */}
        <div className="max-w-7xl mx-auto p-6">
          <Alert variant="destructive" className="max-w-md mx-auto mt-20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="mb-4">{error}</AlertDescription>
            <Button onClick={onRetry} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Job Descriptions</h2>
            <p className="text-gray-600 mt-1">Manage your active job postings and recruitment pipeline</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex justify-between pt-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-8 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first job posting"}
            </p>
            {!searchQuery && selectedFilter === "all" && (
              <Button onClick={onNewJobPosting} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Job Posting
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Header: Title, Department, Exp & Openings */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                      <p className={`text-sm font-medium ${getDepartmentColor(job.department)}`}>{job.department}</p>
                    </div>
                    <div className="flex flex-col items-end text-sm text-gray-700">
                      <span>
                        Min. Exp: <span className="font-semibold">{job.min_experience} yrs</span>
                      </span>
                      <span>
                        Openings: <span className="font-semibold">{job.opening}</span>
                      </span>
                    </div>
                  </div>

                  {/* Location and Salary */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    {job.salary_range && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary_range}
                      </div>
                    )}
                  </div>

                  {/* Responsibilities */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {job.responsibilities.length > 100
                      ? `${job.responsibilities.substring(0, 100)}...`
                      : job.responsibilities}
                  </p>

                  {/* Required Skills */}
                  <div className="mb-2">
                    <p className="text-xs font-medium text-gray-500 mb-1">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.required_skills
                        .split(",")
                        .slice(0, 5)
                        .map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {skill.trim()}
                          </span>
                        ))}
                      {job.required_skills.split(",").length > 5 && (
                        <Badge className="text-xs">+{job.required_skills.split(",").length - 5} more</Badge>
                      )}
                    </div>
                  </div>

                  {/* Preferred Skills */}
                  {job.preferred_skills && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-1">Preferred Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.preferred_skills
                          .split(",")
                          .slice(0, 5)
                          .map((skill, index) => (
                            <span key={index} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              {skill.trim()}
                            </span>
                          ))}
                        {job.preferred_skills.split(",").length > 5 && (
                          <Badge className="text-xs">+{job.preferred_skills.split(",").length - 5} more</Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.candidates} candidates
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {job.scheduled} scheduled
                      </div>
                    </div>
                    <Button
                      onClick={() => onViewCandidates(job.id)}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View Candidates
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
