import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import AppHeader from "@/shared/components/layout/AppHeader";

import PageHeader from "../components/PageHeader";
import CandidateCard from "../components/CandidateCard";
import CandidateListEmptyState from "../components/CandidateListEmptyState";

import { jobTitles } from "../data/mockData";
import { getCandidates } from "@/services/candidateList";

const CandidateListPage = () => {
  const navigate = useNavigate();
const { jd_id } = useParams<{ jd_id: string }>();
console.log(jd_id)
const parsedJdId = Number(jd_id);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: candidates, isLoading } = useQuery({
    queryKey: ["candidates", parsedJdId],
    queryFn: () => getCandidates(parsedJdId),
    enabled: !!parsedJdId,
  });

  const candidatesData=candidates?.data

  const handleBack = () => navigate("/job-descriptions");

  const handleSearchChange = (value: string) => setSearchTerm(value);

  const handleSchedule = (candidateId: number) => {
    console.log("Schedule clicked for candidate:", candidateId);
  };

  const handleSummary = (candidateId: number) => {
    navigate(`/interview-review/${candidateId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <PageHeader
          jobTitle={jobTitles[String(jd_id)] || "Job Position"}
          onBack={handleBack}
        />

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search candidates by name..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-11 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Candidate List */}
        <div className="space-y-0">
          {candidatesData?.map((candidate, index) => (
            <div key={candidate.id}>
              <CandidateCard
                candidate={candidate}
                onSchedule={handleSchedule}
                onSummary={handleSummary}
              />
              {index < candidatesData.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && candidatesData?.length === 0 && <CandidateListEmptyState />}
      </div>
    </div>
  );
};

export default CandidateListPage;
