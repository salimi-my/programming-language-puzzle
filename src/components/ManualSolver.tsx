"use client";

import { useState } from "react";
import Image from "next/image";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

// Map language names to icon paths
const getLanguageIcon = (language: Language): string => {
  const iconMap: Record<Language, string> = {
    Python: "/pl-icons/python.svg",
    Java: "/pl-icons/java.svg",
    "C++": "/pl-icons/cplusplus.svg",
    Ruby: "/pl-icons/ruby.svg",
    Swift: "/pl-icons/swift.svg",
  };
  return iconMap[language];
};

// Helper function to deep copy PuzzleState
function clonePuzzleState(state: PuzzleState): PuzzleState {
  const newState: PuzzleState = {
    students: new Map(),
    availableLanguages: new Set(state.availableLanguages),
    problemCount: new Map(state.problemCount),
  };

  state.students.forEach((solution, student) => {
    newState.students.set(student, {
      student,
      language: solution.language,
      problems: new Set(solution.problems),
    });
  });

  return newState;
}

// Manual solution steps (simplified 9-step approach)
function getManualSolutionSteps() {
  const steps: PuzzleState[] = [];

  // Helper to add a problem and update count
  const addProblem = (
    state: PuzzleState,
    student: Student,
    problem: ProblemType
  ) => {
    state.students.get(student)!.problems.add(problem);
    const currentCount = state.problemCount.get(problem) || 0;
    state.problemCount.set(problem, currentCount + 1);
  };

  // Step 1: Charlie uses Swift and solves Graph (Clue 2)
  const currentState = createEmptyPuzzleState();
  currentState.students.get("Charlie")!.language = "Swift";
  addProblem(currentState, "Charlie", "Graph");
  currentState.availableLanguages.delete("Swift");
  steps.push(clonePuzzleState(currentState));

  // Step 2: Alice solves Math (Clue 4)
  addProblem(currentState, "Alice", "Math");
  steps.push(clonePuzzleState(currentState));

  // Step 3: Bob solves Logic (Clue 1)
  addProblem(currentState, "Bob", "Logic");
  steps.push(clonePuzzleState(currentState));

  // Step 4: Eve solves Sorting + Logic (Clues 6 + 8)
  addProblem(currentState, "Eve", "Sorting");
  addProblem(currentState, "Eve", "Logic");
  steps.push(clonePuzzleState(currentState));

  // Step 5: Eve uses Ruby (deduced from Clues 5, 6 and Eve solves Logic)
  currentState.students.get("Eve")!.language = "Ruby";
  currentState.availableLanguages.delete("Ruby");
  steps.push(clonePuzzleState(currentState));

  // Step 6: Alice uses Python (deduced from Clue 3, process of elimination)
  currentState.students.get("Alice")!.language = "Python";
  currentState.availableLanguages.delete("Python");
  steps.push(clonePuzzleState(currentState));

  // Step 7: Bob uses Java, Dave uses C++ (deduced from Clue 10 and process of elimination)
  currentState.students.get("Bob")!.language = "Java";
  currentState.students.get("Dave")!.language = "C++";
  currentState.availableLanguages.delete("Java");
  currentState.availableLanguages.delete("C++");
  steps.push(clonePuzzleState(currentState));

  // Step 8: Bob solves Graph (deduced from Clue 9, Bob is the second Graph solver)
  addProblem(currentState, "Bob", "Graph");
  steps.push(clonePuzzleState(currentState));

  // Step 9: Dave solves Math (deduced from Clue 5 and Clue 8)
  addProblem(currentState, "Dave", "Math");
  steps.push(clonePuzzleState(currentState));

  return steps;
}

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
    const manualSteps = getManualSolutionSteps();
    if (nextHintStep < manualSteps.length) {
      const stateBefore = state;
      const stateAfter = manualSteps[nextHintStep];

      // Apply the hint
      setState(stateAfter);
      setNextHintStep(nextHintStep + 1);
      setShowValidation(false);

      // Detect changes and show driver.js highlight
      const changes: {
        student: Student;
        languageChange?: string;
        problemsAdded?: string[];
        problemsRemoved?: string[];
      }[] = [];

      // Check each student for changes
      STUDENTS.forEach((student) => {
        const before = stateBefore.students.get(student)!;
        const after = stateAfter.students.get(student)!;

        let hasChanges = false;
        const change: {
          student: Student;
          languageChange?: string;
          problemsAdded?: string[];
          problemsRemoved?: string[];
        } = { student };

        // Check language change
        if (before.language !== after.language) {
          hasChanges = true;
          if (after.language) {
            change.languageChange = `Now uses ${after.language}`;
          } else {
            change.languageChange = "Language removed";
          }
        }

        // Check problem changes
        const problemsBefore = Array.from(before.problems);
        const problemsAfter = Array.from(after.problems);
        const added = problemsAfter.filter((p) => !problemsBefore.includes(p));
        const removed = problemsBefore.filter(
          (p) => !problemsAfter.includes(p)
        );

        if (added.length > 0) {
          hasChanges = true;
          change.problemsAdded = added;
        }
        if (removed.length > 0) {
          hasChanges = true;
          change.problemsRemoved = removed;
        }

        if (hasChanges) {
          changes.push(change);
        }
      });

      // Show driver.js highlight for the first changed student
      if (changes.length > 0) {
        const firstChange = changes[0];

        // Create intuitive hint descriptions based on manual solution approach
        const title = `Hint ${nextHintStep + 1}: ${firstChange.student}`;
        let description = "";

        // Map each step to its intuitive reasoning (9-step manual solution)
        const hintDescriptions: Record<number, string> = {
          1: `📖 From <strong>Clue 2</strong>: Charlie uses Swift and solves Graph problems.\n\n→ Select Swift for Charlie's language AND check Graph problem.`,
          2: `📖 From <strong>Clue 4</strong>: Alice solves Math problems.\n\n→ Check Math for Alice.`,
          3: `📖 From <strong>Clue 1</strong>: Bob solves Logic problems.\n\n→ Check Logic for Bob.`,
          4: `📖 From <strong>Clue 6</strong>: Eve solves Sorting problems.\n\n📖 From <strong>Clue 8</strong>: Student solving Sorting also solves Logic.\n\n→ Check both Sorting AND Logic for Eve.`,
          5: `🧩 <strong>Determine Eve's language:</strong>\n\nEve doesn't use Java or Python (Clue 6), and Charlie uses Swift.\n\nFrom <strong>Clue 5</strong>: C++ user can't solve Logic or Graph. But Eve solves Logic!\n\n→ Eve must use Ruby. Select Ruby for Eve.`,
          6: `🧩 <strong>Determine Alice's language:</strong>\n\nAlice solves Math. From <strong>Clue 3</strong>: Python user solves Math.\n\nAlice doesn't use Ruby or Swift (Clue 4). Charlie uses Swift, Eve uses Ruby.\n\n→ Alice must use Python. Select Python for Alice.`,
          7: `🧩 <strong>Assign remaining languages:</strong>\n\nFrom <strong>Clue 10</strong>: Java user solves exactly 2 problem types.\n\nBob solves Logic. If Bob uses Java and also solves Graph = 2 types ✓\n\nFrom <strong>Clue 1</strong>: Bob doesn't use C++.\n\n→ Select Java for Bob AND C++ for Dave.`,
          8: `🧩 <strong>Identify the second Graph solver:</strong>\n\nFrom <strong>Clue 9</strong>: Only 2 students solve Graph.\n\nCharlie solves Graph (Step 1). From <strong>Clue 7</strong>: Dave doesn't solve Graph.\n\nEve solves Sorting + Logic. Alice, Dave, and Eve don't solve Graph.\n\n→ Bob must solve Graph. Check Graph for Bob.`,
          9: `🧩 <strong>Determine Dave's problems:</strong>\n\nDave uses C++ and can't solve Logic or Graph (Clue 5).\n\nFrom <strong>Clue 8</strong>: Sorting solver must also solve Logic, so Dave can't solve Sorting.\n\n→ Dave can only solve Math. Check Math for Dave.`,
        };

        // Get the description for this hint step
        description =
          hintDescriptions[nextHintStep + 1] ||
          `This step can be deduced from the clues and constraints.`;

        // Trigger driver.js
        setTimeout(() => {
          const driverObj = driver({
            showProgress: false,
            showButtons: ["next"],
            steps: [
              {
                element: `#student-${firstChange.student.toLowerCase()}`,
                popover: {
                  title: title,
                  description: description.trim(),
                  side: "left",
                  align: "start",
                },
              },
            ],
          });
          driverObj.drive();
        }, 100);
      }
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
      <Alert className="border-2 border-blue-200/50 dark:border-blue-800/50 bg-linear-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30 shadow-md">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-slate-700 dark:text-slate-300">
          Assign a language to each student and check the problem types they
          solve. Use the hints if you get stuck, or check your solution when you
          think you&apos;ve solved it!
        </AlertDescription>
      </Alert>

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleGetHint}
          className="bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-md"
        >
          <Lightbulb className="mr-2 h-4 w-4" />
          Get Hint
        </Button>
        <Button
          onClick={handleCheckSolution}
          className="bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-md"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Check Solution
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-red-200 hover:border-red-400 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/30"
        >
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
              <Alert className="border-2 border-emerald-200/50 dark:border-emerald-800/50 bg-linear-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30 shadow-lg">
                <CheckCircle2 className="text-emerald-600! dark:text-emerald-400" />
                <AlertTitle className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Correct! You&apos;ve solved the puzzle! 🎉
                </AlertTitle>
              </Alert>
            )}
          {validation.valid &&
            maxProblems &&
            uniqueLanguages &&
            !isPuzzleSolved(state) && (
              <Alert className="border-2 border-amber-200/50 dark:border-amber-800/50 bg-linear-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/50 dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-orange-950/30 shadow-md">
                <AlertCircle className="text-amber-600 dark:text-amber-400" />
                <AlertTitle className="text-slate-700! dark:text-slate-300">
                  You&apos;re on the right track, but the solution is
                  incomplete. Keep going!
                </AlertTitle>
              </Alert>
            )}
        </div>
      )}

      {/* Interactive Grid */}
      <Card className="border-2 border-purple-200/50 dark:border-purple-800/50 shadow-xl card-gradient">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {STUDENTS.map((student) => {
              const solution = state.students.get(student)!;

              return (
                <div
                  key={student}
                  id={`student-${student.toLowerCase()}`}
                  className="p-4 rounded-lg border-2 border-indigo-100 dark:border-indigo-900/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm space-y-3 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                      {student}
                    </h4>
                  </div>

                  {/* Language Selection */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold w-24 text-slate-700 dark:text-slate-300">
                      Language:
                    </span>
                    <Select
                      value={solution.language || "none"}
                      onValueChange={(value) =>
                        handleLanguageChange(
                          student,
                          value as Language | "none"
                        )
                      }
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select language">
                          {solution.language ? (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-5 h-5 bg-white rounded-full p-0.5 shadow-inner">
                                <Image
                                  src={getLanguageIcon(solution.language)}
                                  alt={`${solution.language} icon`}
                                  width={14}
                                  height={14}
                                  className="shrink-0"
                                />
                              </div>
                              <span>{solution.language}</span>
                            </div>
                          ) : (
                            "None"
                          )}
                        </SelectValue>
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
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-5 h-5 bg-white rounded-full p-0.5 shadow-inner">
                                <Image
                                  src={getLanguageIcon(lang)}
                                  alt={`${lang} icon`}
                                  width={14}
                                  height={14}
                                  className="shrink-0"
                                />
                              </div>
                              <span>{lang}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Problem Types */}
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-semibold w-24 pt-1 text-slate-700 dark:text-slate-300">
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
                            className="border-2 border-purple-300 data-[state=checked]:bg-linear-to-br data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500 data-[state=checked]:border-0"
                          />
                          <label
                            htmlFor={`${student}-${problem}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-700 dark:text-slate-300"
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
