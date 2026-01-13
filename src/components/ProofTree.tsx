import { FormalPremise, ProofStep } from "@/types/puzzle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProofTreeProps {
  premises: FormalPremise[];
  steps: ProofStep[];
  currentStepIndex?: number;
}

/**
 * Animated proof tree visualization showing premises and derivations
 * Progressively reveals derived facts as the solver executes
 */
export function ProofTree({
  premises,
  steps,
  currentStepIndex,
}: ProofTreeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Proof Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Premises Section */}
          <div>
            <h4 className="font-semibold mb-3 text-sm text-zinc-600 dark:text-zinc-400">
              Premises (Given Clues)
            </h4>
            <div className="space-y-2">
              {premises.map((premise) => (
                <div
                  key={premise.id}
                  className="flex items-start gap-2 p-2 rounded bg-zinc-50 dark:bg-zinc-900 border"
                >
                  <Badge
                    variant="outline"
                    className="text-xs font-mono shrink-0"
                  >
                    {premise.id}
                  </Badge>
                  <code className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
                    {premise.formalNotation}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Derivations Section */}
          <div className="print:break-before-page">
            <div className="hidden print:block py-4" />
            <h4 className="font-semibold mb-3 text-sm text-zinc-600 dark:text-zinc-400">
              Derived Facts {steps.length > 0 && `(${steps.length}/17)`}
            </h4>
            <div className="space-y-2">
              {steps.length === 0 ? (
                <p className="text-xs text-zinc-500 dark:text-zinc-600 italic p-2">
                  No derivations yet. Start solving to see derived facts...
                </p>
              ) : (
                steps
                  .filter((step) => step.derivedId)
                  .map((step, index) => {
                    const isCurrent = index === currentStepIndex;
                    const isCompleted =
                      currentStepIndex !== undefined &&
                      index < currentStepIndex;

                    return (
                      <div
                        key={step.derivedId}
                        className={cn(
                          "flex items-start gap-2 p-2 rounded border transition-all duration-500 animate-in fade-in slide-in-from-left-2",
                          isCurrent &&
                            "bg-green-100 dark:bg-green-900 border-green-500 ring-1 ring-green-500 shadow-lg scale-[1.01]",
                          isCompleted &&
                            "bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-800 opacity-75",
                          !isCurrent &&
                            !isCompleted &&
                            "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900"
                        )}
                        style={{ animationDuration: "500ms" }}
                      >
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-mono shrink-0 transition-colors",
                            isCurrent
                              ? "border-green-600 bg-green-600 text-white"
                              : "border-green-500"
                          )}
                        >
                          {step.derivedId}
                        </Badge>
                        <div className="flex-1 text-xs space-y-1">
                          <code
                            className={cn(
                              "font-mono transition-colors",
                              isCurrent
                                ? "text-green-800 dark:text-green-200 font-semibold"
                                : "text-green-700 dark:text-green-300"
                            )}
                          >
                            {step.conclusion}
                          </code>
                          <div
                            className={cn(
                              "text-zinc-600 dark:text-zinc-400 transition-colors",
                              isCurrent && "font-medium"
                            )}
                          >
                            from {step.premises.join(", ")} by{" "}
                            <span
                              className={cn(
                                isCurrent &&
                                  "text-green-700 dark:text-green-300 font-semibold"
                              )}
                            >
                              {step.inferenceRule}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
