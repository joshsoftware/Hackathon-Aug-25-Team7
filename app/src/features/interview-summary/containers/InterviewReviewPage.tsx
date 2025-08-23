import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Separator } from "@/shared/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import AppHeader from "@/shared/components/layout/AppHeader";
import PageHeader from "@/features/candidate-list/components/PageHeader";
import {
  CandidateOverview,
  QuestionCard,
  StrengthsCard,
  ConcernsCard,
  NotesCard,
  EvaluationCard,
  QuestionRatingCard,
} from "../components";
import { mockInterviewData } from "../data/mockData";
import type { InterviewData } from "../types/interview";

const InterviewReviewPage = () => {
  const navigate = useNavigate();
  const { candidateId } = useParams<{ candidateId: string }>();
  const [interviewData] = useState<InterviewData>(mockInterviewData);

  const handleBack = () => navigate("/jobdescription");

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header
        <PageHeader 
          jobTitle={`Interview Review - ${interviewData.candidateName}`}
          onBack={handleBack}
        /> */}

        {/* Candidate Overview */}
        <CandidateOverview interviewData={interviewData} />

        {/* Interview Details */}
        <Tabs defaultValue="transcript" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 shadow-sm rounded-lg p-1 h-12">
            <TabsTrigger
              value="transcript"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:shadow-sm rounded-md transition-all duration-200 font-medium"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Interview Transcript
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:shadow-sm rounded-md transition-all duration-200 font-medium"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Summary & Notes
            </TabsTrigger>
            <TabsTrigger
              value="evaluation"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:shadow-sm rounded-md transition-all duration-200 font-medium"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Evaluation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transcript" className="space-y-4">
            {interviewData.questions.map((qa, index) => (
              <QuestionCard key={qa.id} questionAnswer={qa} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StrengthsCard strengths={interviewData.strengths} />
              <ConcernsCard concerns={interviewData.concerns} />
            </div>
            <NotesCard notes={interviewData.notes} />
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {interviewData.questions.map((qa, index) => (
                <QuestionRatingCard key={qa.id} questionAnswer={qa} index={index} />
              ))}
            </div>
            <EvaluationCard questions={interviewData.questions} overallRating={interviewData.overallRating} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InterviewReviewPage;
