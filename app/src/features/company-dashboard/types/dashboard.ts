export interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "neutral" | "up" | "down";
  icon: any; // Lucide icon component
  color: "blue" | "green" | "purple" | "emerald";
}

export interface Activity {
  type: string;
  candidate: string;
  position: string;
  time: string;
  status: "completed" | "scheduled" | "pending";
}

export interface SystemOverview {
  activeUsers: number;
  pendingReviews: number;
  monthlyHires: number;
  successRate: number;
}
