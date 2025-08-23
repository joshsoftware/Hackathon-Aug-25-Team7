import { 
  Building2,
  Users,
  Calendar,
  CheckCircle
} from "lucide-react";
import type { Stat, Activity, SystemOverview } from "../types/dashboard";

export const mockStats: Stat[] = [
  {
    title: "Active Job Postings",
    value: "12",
    change: "Currently active",
    trend: "neutral",
    icon: Building2,
    color: "blue"
  },
  {
    title: "Total Candidates",
    value: "156",
    change: "In pipeline",
    trend: "neutral",
    icon: Users,
    color: "green"
  },
  {
    title: "Scheduled Interviews",
    value: "24",
    change: "This week",
    trend: "neutral",
    icon: Calendar,
    color: "purple"
  },
  {
    title: "Completed Interviews",
    value: "89",
    change: "This month",
    trend: "neutral",
    icon: CheckCircle,
    color: "emerald"
  }
];

export const mockRecentActivities: Activity[] = [
  {
    type: "Interview completed",
    candidate: "Sarah Johnson",
    position: "Senior Frontend Developer",
    time: "2 hours ago",
    status: "completed"
  },
  {
    type: "Interview scheduled",
    candidate: "Michael Chen",
    position: "Product Manager",
    time: "4 hours ago",
    status: "scheduled"
  },
  {
    type: "New application",
    candidate: "Emily Davis",
    position: "UX Designer",
    time: "6 hours ago",
    status: "pending"
  },
  {
    type: "Interview completed",
    candidate: "James Wilson",
    position: "Backend Developer",
    time: "1 day ago",
    status: "completed"
  },
  {
    type: "New application",
    candidate: "Lisa Anderson",
    position: "Data Scientist",
    time: "2 days ago",
    status: "pending"
  }
];

export const mockSystemOverview: SystemOverview = {
  activeUsers: 23,
  pendingReviews: 8,
  monthlyHires: 12,
  successRate: 78
};
