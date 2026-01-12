import { PuzzleState, STUDENTS } from "@/types/puzzle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PuzzleGridProps {
  state: PuzzleState;
  highlightedStudent?: string;
  className?: string;
}

export function PuzzleGrid({
  state,
  highlightedStudent,
  className,
}: PuzzleGridProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Student</TableHead>
            <TableHead className="font-bold">Language</TableHead>
            <TableHead className="font-bold">Problem Types</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {STUDENTS.map((student) => {
            const solution = state.students.get(student)!;
            const isHighlighted = highlightedStudent === student;

            return (
              <TableRow
                key={student}
                className={cn(
                  "transition-colors",
                  isHighlighted && "bg-yellow-50 dark:bg-yellow-950/20"
                )}
              >
                <TableCell className="font-medium">{student}</TableCell>
                <TableCell>
                  {solution.language ? (
                    <Badge variant="secondary" className="text-xs">
                      {solution.language}
                    </Badge>
                  ) : (
                    <span className="text-zinc-400 text-sm">Not assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  {solution.problems.size > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {Array.from(solution.problems).map((problem) => (
                        <Badge
                          key={problem}
                          variant="default"
                          className="text-xs"
                        >
                          {problem}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-zinc-400 text-sm">None</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
