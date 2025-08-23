import type { Candidate, JobTitle } from "../types/candidate";

export const jobTitles: JobTitle = {
  "jd-001": "Senior Frontend Developer",
  "jd-002": "Product Manager",
  "jd-003": "UX Designer",
  "jd-004": "Data Scientist"
};

export const mockCandidates: Candidate[] = [
  {
    id: "cand-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    experience: "5+ years",
    education: "MS Computer Science, Stanford",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    applicationDate: "2024-01-20",
    interviewStatus: "scheduled",
    summary: "Experienced frontend developer with strong background in React and modern web technologies...",
    avatar: "https://via.placeholder.com/40"
  },
  {
    id: "cand-002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "Remote",
    experience: "7+ years",
    education: "BS Engineering, UC Berkeley",
    skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
    applicationDate: "2024-01-18",
    interviewStatus: "completed",
    summary: "Strategic product manager with proven track record of launching successful products...",
    avatar: "https://via.placeholder.com/40"
  },
  {
    id: "cand-003",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    experience: "4+ years",
    education: "BS Design, Parsons School of Design",
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
    applicationDate: "2024-01-22",
    interviewStatus: "pending",
    summary: "Creative UX designer passionate about creating intuitive user experiences...",
    avatar: "https://via.placeholder.com/40"
  }
];
