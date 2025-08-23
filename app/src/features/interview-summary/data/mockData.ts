import type { InterviewData } from "../types/interview";

export const mockInterviewData: InterviewData = {
  candidateName: "Sarah Johnson",
  position: "Senior Frontend Developer",
  interviewDate: "2024-01-22",
  duration: "45 minutes",
  interviewer: "John Smith",
  overallRating: 4,
  status: "completed",
  recommendation: "hire",
  strengths: [
    "Strong technical knowledge in React and TypeScript",
    "Excellent problem-solving approach",
    "Great communication skills",
    "Good understanding of modern development practices"
  ],
  concerns: [
    "Limited experience with backend technologies",
    "Could improve knowledge of testing frameworks"
  ],
  notes: "Sarah demonstrated excellent technical skills and cultural fit. Her approach to problem-solving was methodical and she asked thoughtful questions about the role and company.",
  questions: [
    {
      id: "q1",
      question: "Can you explain the difference between controlled and uncontrolled components in React?",
      answer: "Controlled components have their state controlled by React through props and state, while uncontrolled components manage their own state internally. In controlled components, the parent component controls the input's value through state and onChange handlers...",
      rating: 5,
      notes: "Excellent answer with clear examples"
    },
    {
      id: "q2",
      question: "How would you optimize the performance of a React application?",
      answer: "There are several approaches: using React.memo for component memoization, implementing useMemo and useCallback hooks, code splitting with lazy loading, optimizing bundle size, and using virtual scrolling for large lists...",
      rating: 4,
      notes: "Good knowledge, covered most important points"
    },
    {
      id: "q3",
      question: "Describe your experience with testing in React applications.",
      answer: "I've primarily used Jest and React Testing Library. I focus on testing user interactions rather than implementation details, writing integration tests for critical user flows...",
      rating: 3,
      notes: "Basic understanding, could be stronger in testing strategies"
    },
    {
      id: "q4",
      question: "How do you stay updated with the latest developments in frontend technologies?",
      answer: "I follow several tech blogs, participate in developer communities, attend conferences when possible, and regularly work on side projects to experiment with new technologies...",
      rating: 4,
      notes: "Shows commitment to continuous learning"
    }
  ]
};
