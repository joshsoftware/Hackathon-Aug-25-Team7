import { FileText, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

interface QuickActionCardProps {
  onGoToJobDescriptions: () => void;
}

const QuickActionCard = ({ onGoToJobDescriptions }: QuickActionCardProps) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="p-4 bg-blue-100 rounded-full inline-flex mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Job Descriptions</h3>
          <p className="text-sm text-gray-600 mb-4">Create, edit, and manage your job postings</p>
          <Button className="w-full mb-3" onClick={onGoToJobDescriptions}>
            Go to Job Descriptions
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
