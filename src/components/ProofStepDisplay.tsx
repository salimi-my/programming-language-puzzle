import { ProofStep, InferenceRule } from "@/types/puzzle";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProofStepDisplayProps {
  step: ProofStep;
  highlighted?: boolean;
}

/**
 * Get color for inference rule badge
 */
function getRuleColor(rule: InferenceRule): string {
  switch (rule) {
    case InferenceRule.MODUS_PONENS:
      return "bg-blue-500 text-white hover:bg-blue-600";
    case InferenceRule.MODUS_TOLLENS:
      return "bg-indigo-500 text-white hover:bg-indigo-600";
    case InferenceRule.ELIMINATION:
      return "bg-red-500 text-white hover:bg-red-600";
    case InferenceRule.CONJUNCTION:
      return "bg-green-500 text-white hover:bg-green-600";
    case InferenceRule.DISJUNCTIVE_SYLLOGISM:
      return "bg-purple-500 text-white hover:bg-purple-600";
    case InferenceRule.SIMPLIFICATION:
      return "bg-yellow-500 text-white hover:bg-yellow-600";
    case InferenceRule.UNIVERSAL_INSTANTIATION:
      return "bg-pink-500 text-white hover:bg-pink-600";
    default:
      return "bg-zinc-500 text-white hover:bg-zinc-600";
  }
}

export function ProofStepDisplay({
  step,
  highlighted = false,
}: ProofStepDisplayProps) {
  return (
    <Card
      className={cn(
        "transition-all",
        highlighted && "ring-2 ring-blue-500 shadow-lg"
      )}
    >
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Inference Rule Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              className={cn(
                "text-xs font-semibold",
                getRuleColor(step.inferenceRule)
              )}
            >
              {step.inferenceRule}
            </Badge>
            {step.derivedId && (
              <Badge variant="outline" className="text-xs">
                {step.derivedId}
              </Badge>
            )}
          </div>

          {/* Premises Used */}
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 min-w-[80px]">
              Premises:
            </span>
            <div className="flex flex-wrap gap-1">
              {step.premises.map((premise) => (
                <Badge
                  key={premise}
                  variant="secondary"
                  className="text-xs font-mono"
                >
                  {premise}
                </Badge>
              ))}
            </div>
          </div>

          {/* Formal Proof Notation */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-md border">
            <code className="text-sm font-mono text-zinc-800 dark:text-zinc-200">
              {step.formalProof}
            </code>
          </div>

          {/* Conclusion */}
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 min-w-[80px]">
              Conclusion:
            </span>
            <code className="text-sm font-mono text-green-700 dark:text-green-400">
              {step.conclusion}
            </code>
          </div>

          {/* Natural Language Explanation */}
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {step.naturalLanguage}
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
