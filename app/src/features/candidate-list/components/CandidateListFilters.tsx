import { Search, Filter } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

interface CandidateListFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFiltersClick: () => void;
}

const CandidateListFilters = ({ searchTerm, onSearchChange, onFiltersClick }: CandidateListFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search candidates by name or skills..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-11 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <Button 
        variant="outline"
        onClick={onFiltersClick}
        className="h-11 px-6 border-gray-200 hover:bg-gray-50 text-gray-700"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
    </div>
  );
};

export default CandidateListFilters;
