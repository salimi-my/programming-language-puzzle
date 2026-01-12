import { Badge } from "@/components/ui/badge";
import { ProblemType } from "@/types/puzzle";
import {
  Sigma,
  Cpu,
  ArrowUpDown,
  ChartNetwork,
  LucideIcon,
} from "lucide-react";

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

  const Icon = iconMap[problemType];

  return (
    <Badge variant={variant} className={`gap-1.5 ${className || ""}`}>
      {Icon && <Icon className="size-6 shrink-0" />}
      {problemType}
    </Badge>
  );
}
