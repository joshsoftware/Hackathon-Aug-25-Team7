import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Separator } from "@/shared/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import AppHeader from "@/shared/components/layout/AppHeader";
import PageHeader from "../components/PageHeader";
import CandidateCard from "../components/CandidateCard";
import CandidateListEmptyState from "../components/CandidateListEmptyState";
import { jobTitles } from "../data/mockData";
import type { Candidate } from "../types/candidate";
import { fetchCandidatesByJob, type CandidateDTO } from "@/services/candidates";

const CandidateListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract jobId from the pathname (/candidates/:jobId)
  const pathSegments = location.pathname.split("/");
  const jobId = pathSegments[2] || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiCandidates, setApiCandidates] = useState<CandidateDTO[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!jobId) return;
      setLoading(true);
      setError(null);
      try {
        const resp = await fetchCandidatesByJob(jobId);
        setApiCandidates(resp.data || []);
      } catch (e: any) {
        setError(e?.message || "Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [jobId]);

  // Map API DTO to UI Candidate model
  const candidates: Candidate[] = useMemo(() => {
    return apiCandidates.map((c) => ({
      id: String(c.id),
      name: c.user?.full_name || c.user?.email || `Candidate ${c.id}`,
      email: c.user?.email || "",
      phone: "",
      location: "",
      experience: "",
      education: "",
      skills: [],
      applicationDate: c.applied_at,
      interviewStatus: (c.interview_status as Candidate["interviewStatus"]) || "pending",
      summary: "",
      avatar: undefined,
    }));
  }, [apiCandidates]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [candidates, searchTerm]);

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
        {/* Header
        <PageHeader 
          jobTitle={jobTitles[jobId] || "Job Position"}
          onBack={handleBack}
        /> */}

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

        {/* Loading / Error */}
        {loading && <div className="text-center text-gray-500">Loading candidates…</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        {/* Candidate List */}
        <div className="space-y-0">
          {filteredCandidates.map((candidate, index) => (
            <div key={candidate.id}>
              <CandidateCard candidate={candidate} onSchedule={handleSchedule} onSummary={handleSummary} />
              {index < filteredCandidates.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredCandidates.length === 0 && <CandidateListEmptyState />}
      </div>
    </div>
  );
};

export default CandidateListPage;
