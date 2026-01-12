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
 * Get gradient color for inference rule badge
 */
function getRuleColor(rule: InferenceRule): string {
  switch (rule) {
    case InferenceRule.MODUS_PONENS:
      return "bg-linear-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-md hover:shadow-lg";
    case InferenceRule.MODUS_TOLLENS:
      return "bg-linear-to-r from-indigo-500 to-purple-500 text-white border-0 shadow-md hover:shadow-lg";
    case InferenceRule.ELIMINATION:
      return "bg-linear-to-r from-red-500 to-orange-500 text-white border-0 shadow-md hover:shadow-lg";
    case InferenceRule.CONJUNCTION:
      return "bg-linear-to-r from-green-500 to-emerald-500 text-white border-0 shadow-md hover:shadow-lg";
    case InferenceRule.DISJUNCTIVE_SYLLOGISM:
      return "bg-linear-to-r from-purple-500 to-pink-500 text-white border-0 shadow-md hover:shadow-lg";
    case InferenceRule.SIMPLIFICATION:
      return "bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-md hover:shadow-lg";
    case InferenceRule.UNIVERSAL_INSTANTIATION:
      return "bg-linear-to-r from-pink-500 to-rose-500 text-white border-0 shadow-md hover:shadow-lg";
    default:
      return "bg-linear-to-r from-slate-500 to-zinc-500 text-white border-0 shadow-md hover:shadow-lg";
  }
}

export function ProofStepDisplay({
  step,
  highlighted = false,
}: ProofStepDisplayProps) {
  return (
    <Card
      className={cn(
        "transition-all border-2 card-gradient shadow-lg",
        highlighted
          ? "ring-2 ring-indigo-500 border-indigo-300 dark:border-indigo-700"
          : "border-blue-100 dark:border-blue-900/50"
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
