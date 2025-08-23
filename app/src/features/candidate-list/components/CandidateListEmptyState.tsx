import { Search } from "lucide-react";

const CandidateListEmptyState = () => {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
      <p className="text-gray-500 max-w-sm mx-auto">
        No candidates match your search criteria. Try adjusting your search terms or filters.
      </p>
    </div>
  );
};

export default CandidateListEmptyState;
