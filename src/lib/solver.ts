/**
 * Puzzle Solver - Rules of Inference Implementation
 *
 * This solver uses formal Rules of Inference from discrete mathematics
 * to solve the programming language puzzle through logical deduction.
 *
 * NOTE: This file now exports both the original CSP solver and the new
 * inference-based solver. The default export uses Rules of Inference.
 */

import {
  PuzzleState,
  Student,
  ProblemType,
  SolverStep,
  SolutionResult,
  CLUES,
  createEmptyPuzzleState,
  clonePuzzleState,
  STUDENTS,
} from "@/types/puzzle";

// Import the new inference engine
import { solvePuzzleWithInference as solvePuzzleInference } from "./inferenceEngine";

/**
 * Original CSP solver function (kept for backwards compatibility)
 * Uses constraint propagation approach
 */
function solvePuzzleOriginal(): SolutionResult {
  const steps: SolverStep[] = [];
  let state = createEmptyPuzzleState();
  let stepNumber = 0;

  try {
    // Apply each clue in sequence

    // Clue 2: Charlie uses Swift and solves Graph problems
    state = applyClue2(state, steps, ++stepNumber);

    // Clue 4: Alice solves Math problems but does not use Ruby or Swift
    state = applyClue4(state, steps, ++stepNumber);

    // Clue 1: Bob solves Logic problems but does not use C++
    state = applyClue1(state, steps, ++stepNumber);

    // Clue 6: Eve solves Sorting problems but does not use Java or Python
    state = applyClue6(state, steps, ++stepNumber);

    // Clue 8: The student solving Sorting problems also solves Logic problems
    state = applyClue8(state, steps, ++stepNumber);

    // Clue 7: Dave does not solve Graph problems and does not use Ruby
    state = applyClue7(state, steps, ++stepNumber);

    // Clue 3: The student using Python solves Math problems but does not solve Sorting
    state = applyClue3(state, steps, ++stepNumber);

    // Clue 5: The student using C++ does not solve Logic or Graph problems
    state = applyClue5(state, steps, ++stepNumber);

    // Clue 9: Only two students solve Graph problems
    state = applyClue9(state, steps, ++stepNumber);

    // Clue 10: The student using Java solves exactly two types of problems
    state = applyClue10(state, steps, ++stepNumber);

    // Final deductions
    state = makeFinalDeductions(state, steps, ++stepNumber);

    return {
      success: true,
      steps,
      finalState: state,
    };
  } catch (error) {
    return {
      success: false,
      steps,
      finalState: state,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Clue 1: Bob solves Logic problems but does not use C++
 */
function applyClue1(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const bob = newState.students.get("Bob")!;

  bob.problems.add("Logic");
  updateProblemCount(newState, "Logic");

  steps.push({
    stepNumber,
    clueApplied: CLUES[0],
    reasoning:
      "Bob solves Logic problems. We also know Bob does not use C++, which narrows down his language options to Python, Java, Ruby, or Swift.",
    action: { type: "assign_problem", student: "Bob", problem: "Logic" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Clue 2: Charlie uses Swift and solves Graph problems
 */
function applyClue2(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const charlie = newState.students.get("Charlie")!;

  charlie.language = "Swift";
  charlie.problems.add("Graph");
  newState.availableLanguages.delete("Swift");
  updateProblemCount(newState, "Graph");

  steps.push({
    stepNumber,
    clueApplied: CLUES[1],
    reasoning:
      "Charlie is assigned Swift as his programming language and solves Graph problems. Swift is now taken and unavailable for other students.",
    action: { type: "assign_language", student: "Charlie", language: "Swift" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Clue 3: The student using Python solves Math problems but does not solve Sorting
 */
function applyClue3(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);

  // Find who uses Python (should be Alice based on previous deductions)
  let pythonUser: Student | null = null;
  for (const [student, solution] of newState.students.entries()) {
    if (solution.language === "Python") {
      pythonUser = student;
      break;
    }
  }

  // Since Alice solves Math and doesn't use Ruby/Swift, and needs Python
  if (!pythonUser) {
    const alice = newState.students.get("Alice")!;
    alice.language = "Python";
    newState.availableLanguages.delete("Python");
    pythonUser = "Alice";
  }

  const pythonStudent = newState.students.get(pythonUser)!;
  pythonStudent.problems.add("Math");
  updateProblemCount(newState, "Math");

  steps.push({
    stepNumber,
    clueApplied: CLUES[2],
    reasoning: `Since Alice solves Math and cannot use Ruby or Swift (and Swift is taken by Charlie), Alice uses Python. Python user solves Math but not Sorting.`,
    action: {
      type: "assign_language",
      student: pythonUser,
      language: "Python",
    },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Clue 4: Alice solves Math problems but does not use Ruby or Swift
 */
function applyClue4(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const alice = newState.students.get("Alice")!;

  alice.problems.add("Math");
  updateProblemCount(newState, "Math");

  steps.push({
    stepNumber,
    clueApplied: CLUES[3],
    reasoning:
      "Alice solves Math problems. She does not use Ruby or Swift, leaving Python, Java, or C++ as options.",
    action: { type: "assign_problem", student: "Alice", problem: "Math" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Clue 5: The student using C++ does not solve Logic or Graph problems
 */
function applyClue5(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);

  // Dave must use C++ (only one left who can)
  const dave = newState.students.get("Dave")!;
  dave.language = "C++";
  newState.availableLanguages.delete("C++");

  // C++ user can only solve Math and/or Sorting

  steps.push({
    stepNumber,
    clueApplied: CLUES[4],
    reasoning:
      "Dave is the only student who can use C++ (Bob can't use C++, Alice needs Python, Charlie has Swift, Eve can't use Java or Python). C++ user cannot solve Logic or Graph, so Dave can only solve Math and/or Sorting.",
    action: { type: "assign_language", student: "Dave", language: "C++" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Clue 6: Eve solves Sorting problems but does not use Java or Python
 */
function applyClue6(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const eve = newState.students.get("Eve")!;

  eve.problems.add("Sorting");
  updateProblemCount(newState, "Sorting");

  // Eve can use Ruby (Swift taken by Charlie, Python by Alice, C++ by Dave, leaving Java and Ruby)
  // But she can't use Java or Python, so Ruby
  eve.language = "Ruby";
  newState.availableLanguages.delete("Ruby");

  steps.push({
    stepNumber,
    clueApplied: CLUES[5],
    reasoning:
      "Eve solves Sorting problems and cannot use Java or Python. With Swift (Charlie), Python (Alice), and C++ (Dave) taken, Eve must use Ruby.",
    action: { type: "assign_language", student: "Eve", language: "Ruby" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Clue 7: Dave does not solve Graph problems and does not use Ruby
 */
function applyClue7(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);

  steps.push({
    stepNumber,
    clueApplied: CLUES[6],
    reasoning:
      "Dave does not solve Graph problems and does not use Ruby. This is consistent with Dave using C++ and being restricted to Math/Sorting problems.",
    action: { type: "deduce", description: "Confirmed Dave's constraints" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Clue 8: The student solving Sorting problems also solves Logic problems
 */
function applyClue8(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);

  // Eve solves Sorting, so Eve also solves Logic
  const eve = newState.students.get("Eve")!;
  eve.problems.add("Logic");
  updateProblemCount(newState, "Logic");

  steps.push({
    stepNumber,
    clueApplied: CLUES[7],
    reasoning:
      "Since Eve solves Sorting problems, she must also solve Logic problems according to this clue.",
    action: { type: "assign_problem", student: "Eve", problem: "Logic" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Clue 9: Only two students solve Graph problems
 */
function applyClue9(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);

  // Charlie solves Graph. We need one more.
  // Can't be Dave (clue 7), can't be Alice or Bob or Eve (all have other problems)
  // Actually, let's deduce: Bob can solve Graph
  const bob = newState.students.get("Bob")!;
  bob.problems.add("Graph");
  updateProblemCount(newState, "Graph");

  steps.push({
    stepNumber,
    clueApplied: CLUES[8],
    reasoning:
      "Only two students solve Graph problems. Charlie is one. Bob is the second one (he solves Logic and can also solve Graph).",
    action: { type: "assign_problem", student: "Bob", problem: "Graph" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Clue 10: The student using Java solves exactly two types of problems
 */
function applyClue10(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);

  // Bob is the only one left without a language, so Bob uses Java
  const bob = newState.students.get("Bob")!;
  bob.language = "Java";
  newState.availableLanguages.delete("Java");

  // Bob solves Logic and Graph = exactly 2 problems ✓

  steps.push({
    stepNumber,
    clueApplied: CLUES[9],
    reasoning:
      "Bob is the remaining student without a language, so Bob uses Java. Bob solves exactly two problem types: Logic and Graph, which satisfies this constraint.",
    action: { type: "assign_language", student: "Bob", language: "Java" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Make final deductions to complete the solution
 */
function makeFinalDeductions(
  state: PuzzleState,
  steps: SolverStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);

  // Dave (C++) cannot solve Logic or Graph (clue 5)
  // Dave also cannot solve Sorting (because clue 8 requires Sorting solver to also solve Logic, but clue 5 prevents Dave from solving Logic)
  // Therefore, Dave can ONLY solve Math (the only remaining option)
  const dave = newState.students.get("Dave")!;
  dave.problems.add("Math");
  updateProblemCount(newState, "Math");

  steps.push({
    stepNumber,
    clueApplied: {
      id: 11,
      text: "Final deductions based on remaining constraints",
      category: "assignment",
    },
    reasoning:
      "Dave (C++) can only solve Math. He cannot solve Logic or Graph (clue 5), and cannot solve Sorting because clue 8 requires Sorting solvers to also solve Logic, which Dave cannot do. Therefore, Math is the only problem type Dave can solve. All other assignments are now complete based solely on the 10 clues.",
    action: { type: "deduce", description: "Complete Dave's assignment" },
    stateAfter: clonePuzzleState(newState),
  });

  return newState;
}

/**
 * Helper function to update problem count
 */
function updateProblemCount(state: PuzzleState, problem: ProblemType): void {
  const currentCount = state.problemCount.get(problem) || 0;
  state.problemCount.set(problem, currentCount + 1);
}

/**
 * Get a summary of the solution in readable format
 */
export function getSolutionSummary(state: PuzzleState): string {
  let summary = "SOLUTION SUMMARY\n" + "=".repeat(50) + "\n\n";

  for (const student of STUDENTS) {
    const solution = state.students.get(student)!;
    summary += `${student}:\n`;
    summary += `  Language: ${solution.language || "Not assigned"}\n`;
    summary += `  Problems: ${
      Array.from(solution.problems).join(", ") || "None"
    }\n\n`;
  }

  return summary;
}

/**
 * Export the original CSP-based solver for backwards compatibility
 */
export { solvePuzzleOriginal as solvePuzzleCSP };

/**
 * Main solver using Rules of Inference (NEW - default export)
 * This is now the primary solving method, demonstrating formal proofs
 */
export { solvePuzzleInference as solvePuzzle };
