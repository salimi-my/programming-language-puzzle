import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-2xl!">
        <DialogHeader>
          <DialogTitle>How to Use This Puzzle Solver</DialogTitle>
          <DialogDescription>
            Learn about the puzzle and how to interact with the solver
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto py-1">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              This is a Constraint Satisfaction Problem (CSP) solver that
              demonstrates logical deduction through step-by-step constraint
              propagation.
            </AlertDescription>
          </Alert>

          <div>
            <h3 className="font-semibold mb-2">The Puzzle</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Five students (Alice, Bob, Charlie, Dave, Eve) each use exactly
              one unique programming language (Python, Java, C++, Ruby, Swift)
              and solve different types of problems (Math, Logic, Sorting,
              Graph). Each student solves a maximum of 3 problem types.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Auto Solver Mode</h3>
            <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              <li>
                Click &quot;Start Solving&quot; to begin the automatic solver
              </li>
              <li>Use &quot;Next Step&quot; to advance one clue at a time</li>
              <li>
                Use &quot;Auto Play&quot; to watch the solver complete the
                puzzle automatically
              </li>
              <li>
                Each step shows which clue is applied and the reasoning behind
                it
              </li>
              <li>The grid updates in real-time to show assignments</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Manual Mode</h3>
            <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              <li>Try solving the puzzle yourself!</li>
              <li>Select a language for each student from the dropdown</li>
              <li>Check the problem types each student solves</li>
              <li>The app validates your solution in real-time</li>
              <li>
                Use &quot;Get Hint&quot; to apply the next clue automatically
              </li>
              <li>
                Click &quot;Check Solution&quot; when you think you&apos;ve
                solved it
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">About the Algorithm</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              This solver uses a{" "}
              <strong>Constraint Satisfaction Problem (CSP)</strong> approach
              with constraint propagation. It applies each clue systematically
              to eliminate impossible assignments and deduce the correct
              solution. The algorithm demonstrates:
            </p>
            <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 mt-2 space-y-1">
              <li>Forward checking - pruning impossible values</li>
              <li>Constraint propagation - inferring new assignments</li>
              <li>Logical deduction - applying rules systematically</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
