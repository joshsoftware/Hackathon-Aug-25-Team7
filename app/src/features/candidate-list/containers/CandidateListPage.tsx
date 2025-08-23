import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Separator } from "@/shared/components/ui/separator";
import AppHeader from "@/shared/components/layout/AppHeader";
import PageHeader from "../components/PageHeader";
import CandidateListFilters from "../components/CandidateListFilters";
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

  const handleFiltersClick = () => {
    // TODO: Implement filters functionality
    console.log("Filters clicked");
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

        {/* Filters */}
        <CandidateListFilters 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onFiltersClick={handleFiltersClick}
        />

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
