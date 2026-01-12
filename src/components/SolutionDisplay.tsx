import { PuzzleState, STUDENTS } from "@/types/puzzle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SolutionDisplayProps {
  state: PuzzleState;
  onPrint?: () => void;
}

export function SolutionDisplay({ state, onPrint }: SolutionDisplayProps) {
  return (
    <Card className="border-green-200 dark:border-green-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-5 w-5" />
          Solution Found!
        </CardTitle>
        <CardDescription>
          Here&apos;s the complete solution to the puzzle
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {STUDENTS.map((student) => {
          const solution = state.students.get(student)!;

          return (
            <div
              key={student}
              className="p-4 rounded-lg border bg-zinc-50 dark:bg-zinc-900 space-y-2"
            >
              <div className="font-semibold text-lg">{student}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Language:
                </span>
                <Badge variant="secondary">{solution.language}</Badge>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Problems:
                </span>
                <div className="flex flex-wrap gap-1">
                  {Array.from(solution.problems).map((problem) => (
                    <Badge key={problem} variant="default">
                      {problem}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {onPrint && (
          <Button onClick={onPrint} className="w-full mt-4" variant="outline">
            Print Solution for Submission
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
