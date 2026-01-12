import { PuzzleState, STUDENTS } from "@/types/puzzle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageBadge } from "./LanguageBadge";
import { ProblemTypeBadge } from "./ProblemTypeBadge";

interface SolutionDisplayProps {
  state: PuzzleState;
  onPrint?: () => void;
}

export function SolutionDisplay({ state, onPrint }: SolutionDisplayProps) {
  return (
    <Card className="border-2 border-emerald-200/50 dark:border-emerald-800/50 shadow-xl bg-linear-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
            Solution Found!
          </span>
        </CardTitle>
        <CardDescription className="text-slate-700 dark:text-slate-300">
          Here&apos;s the complete solution to the puzzle
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {STUDENTS.map((student) => {
          const solution = state.students.get(student)!;

          return (
            <div
              key={student}
              className="p-4 rounded-lg border-2 border-emerald-100 dark:border-emerald-900/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm space-y-2 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="font-semibold text-lg bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                {student}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Language:
                </span>
                <LanguageBadge
                  language={solution.language!}
                  variant="secondary"
                />
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Problems:
                </span>
                <div className="flex flex-wrap gap-1">
                  {Array.from(solution.problems).map((problem) => (
                    <ProblemTypeBadge
                      key={problem}
                      problemType={problem}
                      variant="default"
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {onPrint && (
          <Button
            onClick={onPrint}
            className="w-full mt-4 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg font-semibold"
          >
            Print Solution for Submission
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
