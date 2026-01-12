"use client";

import { useState } from "react";
import {
  PuzzleState,
  Student,
  Language,
  ProblemType,
  STUDENTS,
  LANGUAGES,
  PROBLEM_TYPES,
  createEmptyPuzzleState,
  isPuzzleSolved,
} from "@/types/puzzle";
import {
  validatePuzzleState,
  checkMaxProblemsConstraint,
  checkUniqueLanguages,
} from "@/lib/validator";
import { solvePuzzle } from "@/lib/solver";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SolutionDisplay } from "./SolutionDisplay";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

export function ManualSolver() {
  const [state, setState] = useState<PuzzleState>(createEmptyPuzzleState());
  const [nextHintStep, setNextHintStep] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  // Handle language assignment
  const handleLanguageChange = (
    student: Student,
    language: Language | "none"
  ) => {
    setState((prev) => {
      const newState = { ...prev };
      newState.students = new Map(prev.students);

      const studentSolution = { ...newState.students.get(student)! };
      const oldLanguage = studentSolution.language;

      // Remove old language from used languages
      if (oldLanguage) {
        newState.availableLanguages = new Set(prev.availableLanguages);
        newState.availableLanguages.add(oldLanguage);
      }

      // Set new language
      if (language === "none") {
        studentSolution.language = null;
      } else {
        studentSolution.language = language;
        newState.availableLanguages = new Set(prev.availableLanguages);
        newState.availableLanguages.delete(language);
      }

      newState.students.set(student, studentSolution);
      return newState;
    });
    setShowValidation(false);
    setIsSolved(false);
  };

  // Handle problem type toggle
  const handleProblemToggle = (
    student: Student,
    problem: ProblemType,
    checked: boolean
  ) => {
    setState((prev) => {
      const newState = { ...prev };
      newState.students = new Map(prev.students);
      newState.problemCount = new Map(prev.problemCount);

      const studentSolution = { ...newState.students.get(student)! };
      studentSolution.problems = new Set(studentSolution.problems);

      if (checked) {
        studentSolution.problems.add(problem);
        const count = newState.problemCount.get(problem) || 0;
        newState.problemCount.set(problem, count + 1);
      } else {
        studentSolution.problems.delete(problem);
        const count = newState.problemCount.get(problem) || 0;
        newState.problemCount.set(problem, Math.max(0, count - 1));
      }

      newState.students.set(student, studentSolution);
      return newState;
    });
    setShowValidation(false);
    setIsSolved(false);
  };

  // Get hint (apply next clue)
  const handleGetHint = () => {
    const solution = solvePuzzle();
    if (solution.success && nextHintStep < solution.steps.length) {
      const step = solution.steps[nextHintStep];
      setState(step.stateAfter);
      setNextHintStep(nextHintStep + 1);
      setShowValidation(false);
    }
  };

  // Check solution
  const handleCheckSolution = () => {
    setShowValidation(true);
    const validation = validatePuzzleState(state);
    const maxProblems = checkMaxProblemsConstraint(state);
    const uniqueLanguages = checkUniqueLanguages(state);
    const solved = isPuzzleSolved(state);

    if (validation.valid && maxProblems && uniqueLanguages && solved) {
      setIsSolved(true);
    }
  };

  // Reset
  const handleReset = () => {
    setState(createEmptyPuzzleState());
    setNextHintStep(0);
    setShowValidation(false);
    setIsSolved(false);
  };

  const validation = validatePuzzleState(state);
  const maxProblems = checkMaxProblemsConstraint(state);
  const uniqueLanguages = checkUniqueLanguages(state);

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Assign a language to each student and check the problem types they
          solve. Use the hints if you get stuck, or check your solution when you
          think you&apos;ve solved it!
        </AlertDescription>
      </Alert>

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleGetHint} variant="outline">
          <Lightbulb className="mr-2 h-4 w-4" />
          Get Hint
        </Button>
        <Button onClick={handleCheckSolution} variant="default">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Check Solution
        </Button>
        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Validation Messages */}
      {showValidation && (
        <div className="space-y-2">
          {!uniqueLanguages && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                Each language must be used by only one student!
              </AlertDescription>
            </Alert>
          )}
          {!maxProblems && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                Each student can solve at most 3 problem types!
              </AlertDescription>
            </Alert>
          )}
          {validation.violatedClues.length > 0 && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold mb-1">Violated Clues:</div>
                <ul className="list-disc list-inside text-sm">
                  {validation.violatedClues.map((clue) => (
                    <li key={clue.id}>
                      Clue #{clue.id}: {clue.text}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          {validation.valid &&
            maxProblems &&
            uniqueLanguages &&
            isPuzzleSolved(state) && (
              <Alert className="border-green-200 dark:border-green-900">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Correct! You&apos;ve solved the puzzle! 🎉
                </AlertDescription>
              </Alert>
            )}
          {validation.valid &&
            maxProblems &&
            uniqueLanguages &&
            !isPuzzleSolved(state) && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You&apos;re on the right track, but the solution is
                  incomplete. Keep going!
                </AlertDescription>
              </Alert>
            )}
        </div>
      )}

      {/* Interactive Grid */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {STUDENTS.map((student) => {
              const solution = state.students.get(student)!;

              return (
                <div
                  key={student}
                  className="p-4 rounded-lg border bg-zinc-50 dark:bg-zinc-900 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">{student}</h4>
                  </div>

                  {/* Language Selection */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-24">Language:</span>
                    <Select
                      value={solution.language || "none"}
                      onValueChange={(value) =>
                        handleLanguageChange(
                          student,
                          value as Language | "none"
                        )
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {LANGUAGES.map((lang) => (
                          <SelectItem
                            key={lang}
                            value={lang}
                            disabled={
                              !state.availableLanguages.has(lang) &&
                              solution.language !== lang
                            }
                          >
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Problem Types */}
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium w-24 pt-1">
                      Problems:
                    </span>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      {PROBLEM_TYPES.map((problem) => (
                        <div
                          key={problem}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${student}-${problem}`}
                            checked={solution.problems.has(problem)}
                            onCheckedChange={(checked) =>
                              handleProblemToggle(
                                student,
                                problem,
                                checked as boolean
                              )
                            }
                          />
                          <label
                            htmlFor={`${student}-${problem}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {problem}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Solution Display */}
      {isSolved && <SolutionDisplay state={state} />}
    </div>
  );
}
