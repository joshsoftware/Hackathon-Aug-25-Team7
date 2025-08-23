import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface CandidateListHeaderProps {
  jobTitle: string;
  onBack: () => void;
}

const CandidateListHeader = ({ jobTitle, onBack }: CandidateListHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onBack}
        className="h-10 w-10 border-gray-200 hover:bg-gray-50"
      >
        <ArrowLeft className="h-4 w-4 text-gray-600" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Candidates – {jobTitle}
        </h1>
        <p className="text-gray-500 mt-1 text-base">
          Manage and review candidates for this position
        </p>
      </div>
    </div>
  );
};

export default CandidateListHeader;
