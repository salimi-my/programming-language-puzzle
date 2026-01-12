import { Badge } from "@/components/ui/badge";
import { ProblemType } from "@/types/puzzle";
import {
  Sigma,
  Cpu,
  ArrowUpDown,
  ChartNetwork,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProblemTypeBadgeProps {
  problemType: ProblemType;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

/**
 * Problem type badge with icon
 */
export function ProblemTypeBadge({
  problemType,
  variant = "default",
  className,
}: ProblemTypeBadgeProps) {
  // Map problem types to icons
  const iconMap: Record<ProblemType, LucideIcon> = {
    Math: Sigma,
    Logic: Cpu,
    Sorting: ArrowUpDown,
    Graph: ChartNetwork,
  };

  // Map problem types to gradient colors
  const colorMap: Record<ProblemType, string> = {
    Math: "bg-linear-to-r from-purple-500 to-pink-500 text-white border-0 shadow-md hover:shadow-lg",
    Logic:
      "bg-linear-to-r from-indigo-500 to-blue-500 text-white border-0 shadow-md hover:shadow-lg",
    Sorting:
      "bg-linear-to-r from-green-500 to-teal-500 text-white border-0 shadow-md hover:shadow-lg",
    Graph:
      "bg-linear-to-r from-cyan-500 to-blue-500 text-white border-0 shadow-md hover:shadow-lg",
  };

  const Icon = iconMap[problemType];
  const colorClass = colorMap[problemType];

  return (
    <Badge
      variant={variant}
      className={cn("gap-1.5 py-[3px] ps-1", colorClass, className)}
    >
      {Icon && (
        <div className="flex items-center justify-center w-4.5 h-4.5 bg-white rounded-full p-0.5 shadow-inner">
          <Icon className="h-3.5 w-3.5 shrink-0 text-slate-700" />
        </div>
      )}
      {problemType}
    </Badge>
  );
}
