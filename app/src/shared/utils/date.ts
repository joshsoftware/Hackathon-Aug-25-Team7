import { format } from "date-fns";

export const formatDate = (date?: Date | null) => {
  if (!date) return "N/A";

  return format(date, "MMMM d, yyyy 'at' h:mm a");
};
