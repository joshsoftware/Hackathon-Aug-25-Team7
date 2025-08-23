import React, { useState, useMemo } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  type Candidate,
  CandidateHeader,
  SearchBar,
  CandidateCard,
  PageHeader,
  LoadingState,
  ErrorState,
  EmptyState,
} from "../component/CandidateCard"; // Updated import path to match your structure
import { getCandidates } from "@/services/candidateList";

// Main Container Component
const CandidateContainer: React.FC = () => {
  const { jd_id } = useParams<{ jd_id: string }>();
  const jdId = Number(jd_id);
  const [searchQuery, setSearchQuery] = useState("");

  // TanStack Query for fetching candidates
  const {
    data: candidates = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["candidates", jdId],
    queryFn: () => getCandidates(jdId),
    enabled: !!jdId && !isNaN(jdId), // Only fetch if jdId is valid
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Filter candidates based on search query
  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) {
      return candidates;
    }

    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [candidates, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch candidates";
    return <ErrorState error={errorMessage} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PageHeader />
        <SearchBar onSearch={handleSearch} />

        {/* Candidates List */}
        <div className="space-y-4">
          {filteredCandidates.length === 0 ? (
            <EmptyState hasSearchQuery={!!searchQuery.trim()} />
          ) : (
            filteredCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateContainer;
