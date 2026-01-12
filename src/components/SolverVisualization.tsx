"use client";

import { useState, useEffect } from "react";
import { solvePuzzle } from "@/lib/solver";
import { SolutionResult, SolverStep } from "@/types/puzzle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PuzzleGrid } from "./PuzzleGrid";
import { SolutionDisplay } from "./SolutionDisplay";
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Play className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Ready to See the Solution?
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            Click the button below to start the automatic solver. It will apply
            each clue step-by-step and show you how the solution is deduced.
          </p>
        </div>
        <Button onClick={handleStart} size="lg">
          <Play className="mr-2 h-5 w-5" />
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

  const currentStepData: SolverStep | undefined = solution.steps[currentStep];
  const progress = ((currentStep + 1) / solution.steps.length) * 100;
  const isComplete = currentStep === solution.steps.length - 1;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            Step {currentStep + 1} of {solution.steps.length}
          </span>
          <span className="text-zinc-600 dark:text-zinc-400">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={isComplete}
          variant={isPlaying ? "secondary" : "default"}
        >
          {isPlaying ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              {currentStep === 0 ? "Auto Play" : "Resume"}
            </>
          )}
        </Button>

        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          variant="outline"
        >
          <SkipBack className="mr-2 h-4 w-4" />
          Previous Step
        </Button>

        <Button onClick={handleNext} disabled={isComplete} variant="outline">
          <SkipForward className="mr-2 h-4 w-4" />
          Next Step
        </Button>

        <Button
          onClick={handleSkipToEnd}
          disabled={isComplete}
          variant="outline"
        >
          <FastForward className="mr-2 h-4 w-4" />
          Skip to End
        </Button>

        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Current Step Info */}
      {currentStepData && (
        <Card className="border-blue-200 dark:border-blue-900">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold">
                  {currentStepData.clueApplied.id}
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">
                    Clue #{currentStepData.clueApplied.id}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    {currentStepData.clueApplied.text}
                  </p>
                </div>
              </div>

              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Reasoning:</strong> {currentStepData.reasoning}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Puzzle Grid */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Current State</h3>
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

      {/* Final Solution Display */}
      {isComplete && (
        <SolutionDisplay state={solution.finalState} onPrint={handlePrint} />
      )}
    </div>
  );
}
