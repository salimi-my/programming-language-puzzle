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
          <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30">
            <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-slate-700 dark:text-slate-300">
              This solver uses{" "}
              <strong>Formal Logic and Rules of Inference</strong> to
              demonstrate rigorous mathematical proof construction through
              systematic logical deduction.
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
              <li>
                Use &quot;Previous/Next Step&quot; to navigate through the proof
              </li>
              <li>
                Use &quot;Auto Play&quot; to watch the solver complete the
                puzzle automatically
              </li>
              <li>
                Each step shows the inference rule used, formal logical
                notation, and natural language reasoning
              </li>
              <li>The proof tree visualizes the 17-step derivation process</li>
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
              This solver uses{" "}
              <strong>Formal Logic and Rules of Inference</strong> from discrete
              mathematics to construct a rigorous mathematical proof. Starting
              from 10 premises (P1-P10), it derives 17 logical conclusions
              (D1-D17) to solve the puzzle. The algorithm demonstrates:
            </p>
            <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 mt-2 space-y-1">
              <li>
                <strong>Simplification</strong> - Extracting individual facts
                from conjunctions
              </li>
              <li>
                <strong>Modus Ponens</strong> - If P implies Q and P is true,
                then Q is true
              </li>
              <li>
                <strong>Modus Tollens</strong> - If P implies Q and Q is false,
                then P is false
              </li>
              <li>
                <strong>Elimination</strong> - Deducing facts by ruling out all
                other possibilities
              </li>
              <li>
                <strong>Conjunction</strong> - Combining multiple known true
                statements
              </li>
              <li>
                <strong>Universal Instantiation</strong> - Applying universal
                constraints to specific cases
              </li>
            </ul>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Each derivation is formally notated as{" "}
              <strong>Premises ⊢ Conclusion [Rule]</strong>, ensuring academic
              rigor and mathematical validity.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
