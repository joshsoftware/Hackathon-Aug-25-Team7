import { useState, type FC } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { jobDescription } from "@/services/jobDescription";
import type { Job } from "@/types/jobDescription";
import { JobDescriptionComponent } from "../component/JobDescriptionComponent";

export interface JobWithStats extends Job {
  candidates: number;
  scheduled: number;
  status: "active" | "pending" | "closed";
  department: string;
  salary_range?: string;
}

export const JobDescriptionContainer: FC = () => {
  const navigate = useNavigate();
  // Search & filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Enhance job with extra UI info
  const enhanceJobData = (job: Job): JobWithStats => {
    const departments: Record<string, string> = {
      "Backend Developer": "Engineering",
      "Frontend Developer": "Engineering",
      "Data Engineer": "Analytics",
      "DevOps Engineer": "Engineering",
      "ML Engineer": "Analytics",
    };

    const salaryRanges: Record<string, string> = {
      "Backend Developer": "$80,000 - $120,000",
      "Frontend Developer": "$70,000 - $110,000",
      "Data Engineer": "$90,000 - $140,000",
      "DevOps Engineer": "$85,000 - $130,000",
      "ML Engineer": "$100,000 - $150,000",
    };

    const candidates = Math.floor(Math.random() * 30) + job.opening * 5;
    const scheduled = Math.floor(candidates * 0.2);

    let status: "active" | "pending" | "closed" = "active";
    if (job.opening === 0) status = "closed";
    else if (Math.random() > 0.8) status = "pending";

    return {
      ...job,
      candidates,
      scheduled,
      status,
      department: departments[job.title] || "General",
      salary_range: salaryRanges[job.title],
    };
  };

  // React Query hook
  const { data, isLoading, isError, refetch } = useQuery<JobWithStats[]>({
    queryKey: ["jobDescriptions"],
    queryFn: async () => {
      const response = await jobDescription();
      return response.data.data.map(enhanceJobData);
    },
  });

  // Filtered jobs
  const filteredJobs =
    data?.filter((job: JobWithStats) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" ? true : job.status === selectedFilter;

      return matchesSearch && matchesFilter;
    }) ?? [];

  // Handlers
  const handleSearch = (query: string) => setSearchQuery(query);
  const handleFilter = (filter: string) => setSelectedFilter(filter);
  const handleViewCandidates = (jobId: number) => {
    navigate(`/candidates/${jobId}`);
  };
  const handleNewJobPosting = () => toast.info("Opening new job posting form");

  return (
    <JobDescriptionComponent
      jobs={filteredJobs}
      searchQuery={searchQuery}
      selectedFilter={selectedFilter}
      isLoading={isLoading}
      error={isError ? "Unable to load job descriptions" : null}
      onSearch={handleSearch}
      onFilter={handleFilter}
      onViewCandidates={handleViewCandidates}
      onNewJobPosting={handleNewJobPosting}
      onRetry={refetch}
    />
  );
};
