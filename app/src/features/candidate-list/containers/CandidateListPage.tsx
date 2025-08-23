import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Separator } from "@/shared/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import AppHeader from "@/shared/components/layout/AppHeader";
import PageHeader from "../components/PageHeader";
import CandidateCard from "../components/CandidateCard";
import CandidateListEmptyState from "../components/CandidateListEmptyState";
import { mockCandidates, jobTitles } from "../data/mockData";
import type { Candidate } from "../types/candidate";

const CandidateListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract jobId from the pathname
  const pathSegments = location.pathname.split('/');
  const jobId = pathSegments[2] || "jd-001"; // Default to jd-001 if no jobId in path
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBack = () => {
    navigate("/job-descriptions");
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSchedule = (candidateId: string) => {
    // TODO: Implement schedule functionality
    console.log("Schedule clicked for candidate:", candidateId);
  };

  const handleSummary = (candidateId: string) => {
    navigate(`/interview-review/${candidateId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <PageHeader 
          jobTitle={jobTitles[jobId] || "Job Position"}
          onBack={handleBack}
        />

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search candidates by name or skills..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-11 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Candidate List */}
        <div className="space-y-0">
          {filteredCandidates.map((candidate, index) => (
            <div key={candidate.id}>
              <CandidateCard
                candidate={candidate}
                onSchedule={handleSchedule}
                onSummary={handleSummary}
              />
              {index < filteredCandidates.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && <CandidateListEmptyState />}
      </div>
    </div>
  );
};

export default CandidateListPage;
