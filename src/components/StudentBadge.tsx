import { Badge } from "@/components/ui/badge";
import { Student } from "@/types/puzzle";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentBadgeProps {
  student: Student;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

/**
 * Student badge with gradient color
 */
export function StudentBadge({
  student,
  variant = "outline",
  className,
}: StudentBadgeProps) {
  // Map student names to gradient colors
  const colorMap: Record<Student, string> = {
    Alice:
      "bg-linear-to-r from-pink-500 to-rose-500 text-white border-0 shadow-md hover:shadow-lg",
    Bob: "bg-linear-to-r from-blue-500 to-indigo-500 text-white border-0 shadow-md hover:shadow-lg",
    Charlie:
      "bg-linear-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md hover:shadow-lg",
    Dave: "bg-linear-to-r from-emerald-500 to-green-500 text-white border-0 shadow-md hover:shadow-lg",
    Eve: "bg-linear-to-r from-purple-500 to-violet-500 text-white border-0 shadow-md hover:shadow-lg",
  };

  const colorClass = colorMap[student];

  return (
    <Badge
      variant={variant}
      className={cn("gap-1.5 py-[3px] ps-1", colorClass, className)}
    >
      <div className="flex items-center justify-center w-4.5 h-4.5 bg-white rounded-full p-0.5 shadow-inner">
        <User className="h-3 w-3 shrink-0 text-slate-700" />
      </div>
      {student}
    </Badge>
  );
}
