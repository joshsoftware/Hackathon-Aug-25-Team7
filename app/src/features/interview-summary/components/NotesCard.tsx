import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface NotesCardProps {
  notes: string;
}

const NotesCard = ({ notes }: NotesCardProps) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Interviewer Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed text-sm">{notes}</p>
      </CardContent>
    </Card>
  );
};

export default NotesCard;
