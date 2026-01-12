import { PuzzleState, STUDENTS } from "@/types/puzzle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LanguageBadge } from "./LanguageBadge";
import { ProblemTypeBadge } from "./ProblemTypeBadge";

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
                    <LanguageBadge
                      language={solution.language}
                      variant="secondary"
                      className="text-xs"
                    />
                  ) : (
                    <span className="text-zinc-400 text-sm">Not assigned</span>
                  )}
                </TableCell>
                <TableCell>
                  {solution.problems.size > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {Array.from(solution.problems).map((problem) => (
                        <ProblemTypeBadge
                          key={problem}
                          problemType={problem}
                          variant="default"
                          className="text-xs"
                        />
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
