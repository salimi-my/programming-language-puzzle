"use client";

import { useState, useEffect } from "react";
import { solvePuzzle } from "@/lib/solver";
import { SolutionResult, SolverStep, ProofStep } from "@/types/puzzle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PuzzleGrid } from "./PuzzleGrid";
import { SolutionDisplay } from "./SolutionDisplay";
import { ProofStepDisplay } from "./ProofStepDisplay";
import { ProofTree } from "./ProofTree";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  FastForward,
  InfoIcon,
} from "lucide-react";

export function SolverVisualization() {
  const [solution, setSolution] = useState<SolutionResult | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Start the solver
  const handleStart = () => {
    const result = solvePuzzle();
    setSolution(result);
    setCurrentStep(0);
    setHasStarted(true);
  };

  // Reset the solver
  const handleReset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setHasStarted(false);
    setSolution(null);
  };

  // Go to next step
  const handleNext = () => {
    if (solution && currentStep < solution.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Skip to end
  const handleSkipToEnd = () => {
    if (solution) {
      setCurrentStep(solution.steps.length - 1);
      setIsPlaying(false);
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && solution && currentStep < solution.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1500); // 1.5 seconds per step

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, solution]);

  // Print solution
  const handlePrint = () => {
    window.print();
  };

  if (!hasStarted) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 mb-4 shadow-lg">
            <Play className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            Ready to See the Solution?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Click the button below to start the automatic solver. It will apply
            each clue step-by-step and show you how the solution is deduced.
          </p>
        </div>
        <Button
          onClick={handleStart}
          size="lg"
          className="bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 shadow-lg font-semibold"
        >
          <Play className="size-5" />
          Start Solving
        </Button>
      </div>
    );
  }

  if (!solution) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to solve the puzzle. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  const currentStepData: SolverStep | ProofStep | undefined =
    solution.steps[currentStep];
  const progress = ((currentStep + 1) / solution.steps.length) * 100;
  const isComplete = currentStep === solution.steps.length - 1;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2 p-4 rounded-lg border-2 border-indigo-100 dark:border-indigo-900/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-md">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            Step {currentStep + 1} of {solution.steps.length}
          </span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress
          value={progress}
          className="h-3 bg-indigo-100 dark:bg-indigo-950 [&>div]:bg-linear-to-r [&>div]:from-indigo-500 [&>div]:via-purple-500 [&>div]:to-pink-500 shadow-inner"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={isComplete}
          className={
            isPlaying
              ? "bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-md max-sm:py-2! max-sm:text-xs max-sm:px-2! max-sm:h-8!"
              : "bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 shadow-md max-sm:py-2! max-sm:text-xs max-sm:px-2! max-sm:h-8!"
          }
        >
          {isPlaying ? (
            <>
              <Pause className="size-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="size-4" />
              {currentStep === 0 ? "Auto Play" : "Resume"}
            </>
          )}
        </Button>

        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          variant="outline"
          className="border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-900/30 max-sm:py-2! max-sm:text-xs max-sm:px-2! max-sm:h-8!"
        >
          <SkipBack className="size-4" />
          Previous Step
        </Button>

        <Button
          onClick={handleNext}
          disabled={isComplete}
          variant="outline"
          className="border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/30 max-sm:py-2! max-sm:text-xs max-sm:px-2! max-sm:h-8!"
        >
          <SkipForward className="size-4" />
          Next Step
        </Button>

        <Button
          onClick={handleSkipToEnd}
          disabled={isComplete}
          variant="outline"
          className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/30 max-sm:py-2! max-sm:text-xs max-sm:px-2! max-sm:h-8!"
        >
          <FastForward className="size-4" />
          Skip to End
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          className="border-red-200 hover:border-red-400 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/30 max-sm:py-2! max-sm:text-xs max-sm:px-2! max-sm:h-8!"
        >
          <RotateCcw className="size-4" />
          Reset
        </Button>
      </div>

      {/* Current Step Info - Display formal proof if available */}
      {currentStepData && (
        <>
          {/* Check if this is a ProofStep (has inferenceRule) or SolverStep (has clueApplied) */}
          {"inferenceRule" in currentStepData ? (
            <ProofStepDisplay
              step={currentStepData as unknown as ProofStep}
              highlighted={true}
            />
          ) : (
            <Card className="border-blue-200 dark:border-blue-900">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 flex size-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold">
                      {(currentStepData as SolverStep).clueApplied.id}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">
                        Clue #{(currentStepData as SolverStep).clueApplied.id}
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                        {(currentStepData as SolverStep).clueApplied.text}
                      </p>
                    </div>
                  </div>

                  <Alert>
                    <InfoIcon className="size-4" />
                    <AlertDescription className="text-sm">
                      <strong>Reasoning:</strong>{" "}
                      {(currentStepData as SolverStep).reasoning}
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Puzzle Grid */}
      <Card className="border-2 border-purple-200/50 dark:border-purple-800/50 shadow-xl card-gradient">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4 text-lg bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
            Current State
          </h3>
          <PuzzleGrid
            state={currentStepData?.stateAfter || solution.finalState}
            highlightedStudent={
              currentStepData?.action.type === "assign_language" ||
              currentStepData?.action.type === "assign_problem"
                ? currentStepData.action.student
                : undefined
            }
          />
        </CardContent>
      </Card>

      {/* Proof Tree - Animated to show progression */}
      {solution.formalProof && solution.proofSteps && (
        <ProofTree
          premises={solution.formalProof.premises}
          steps={solution.proofSteps.slice(0, currentStep + 1)}
          currentStepIndex={currentStep}
        />
      )}

      {/* Final Solution Display */}
      {isComplete && (
        <SolutionDisplay state={solution.finalState} onPrint={handlePrint} />
      )}
    </div>
  );
}
