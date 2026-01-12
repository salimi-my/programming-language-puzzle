/**
 * Type definitions for the Programming Language Puzzle (Puzzle 1)
 *
 * Puzzle: 5 students, 5 programming languages, 4 problem types
 * Each student uses exactly one language
 * Each student solves maximum 3 problem types
 */

// Core entity types
export type Student = "Alice" | "Bob" | "Charlie" | "Dave" | "Eve";
export type Language = "Python" | "Java" | "C++" | "Ruby" | "Swift";
export type ProblemType = "Math" | "Logic" | "Sorting" | "Graph";

export const STUDENTS: Student[] = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
export const LANGUAGES: Language[] = ["Python", "Java", "C++", "Ruby", "Swift"];
export const PROBLEM_TYPES: ProblemType[] = [
  "Math",
  "Logic",
  "Sorting",
  "Graph",
];

/**
 * Solution for a single student
 */
export interface StudentSolution {
  student: Student;
  language: Language | null;
  problems: Set<ProblemType>;
}

/**
 * Complete puzzle state
 */
export interface PuzzleState {
  // Map of student to their solution
  students: Map<Student, StudentSolution>;

  // Track which languages are still available
  availableLanguages: Set<Language>;

  // Track how many students solve each problem type
  problemCount: Map<ProblemType, number>;
}

/**
 * Represents a constraint/clue from the puzzle
 */
export interface Clue {
  id: number;
  text: string;
  category: "assignment" | "exclusion" | "implication" | "counting";
}

/**
 * A step in the solving process
 */
export interface SolverStep {
  stepNumber: number;
  clueApplied: Clue;
  reasoning: string;
  action: SolverAction;
  stateAfter: PuzzleState;
}

/**
 * Actions that can be taken during solving
 */
export type SolverAction =
  | { type: "assign_language"; student: Student; language: Language }
  | { type: "assign_problem"; student: Student; problem: ProblemType }
  | { type: "exclude_language"; student: Student; language: Language }
  | { type: "exclude_problem"; student: Student; problem: ProblemType }
  | { type: "deduce"; description: string };

/**
 * Result of the solving algorithm
 */
export interface SolutionResult {
  success: boolean;
  steps: SolverStep[];
  finalState: PuzzleState;
  error?: string;
}

/**
 * Validation result for checking constraints
 */
export interface ValidationResult {
  valid: boolean;
  violatedClues: Clue[];
  message?: string;
}

/**
 * The 10 clues from the puzzle
 */
export const CLUES: Clue[] = [
  {
    id: 1,
    text: "Bob solves Logic problems but does not use C++.",
    category: "assignment",
  },
  {
    id: 2,
    text: "Charlie uses Swift and solves Graph problems.",
    category: "assignment",
  },
  {
    id: 3,
    text: "The student using Python solves Math problems but does not solve Sorting problems.",
    category: "implication",
  },
  {
    id: 4,
    text: "Alice solves Math problems but does not use Ruby or Swift.",
    category: "assignment",
  },
  {
    id: 5,
    text: "The student using C++ does not solve Logic or Graph problems.",
    category: "implication",
  },
  {
    id: 6,
    text: "Eve solves Sorting problems but does not use Java or Python.",
    category: "assignment",
  },
  {
    id: 7,
    text: "Dave does not solve Graph problems and does not use Ruby.",
    category: "exclusion",
  },
  {
    id: 8,
    text: "The student solving Sorting problems also solves Logic problems.",
    category: "implication",
  },
  {
    id: 9,
    text: "Only two students solve Graph problems.",
    category: "counting",
  },
  {
    id: 10,
    text: "The student using Java solves exactly two types of problems.",
    category: "counting",
  },
];

/**
 * Helper function to create an empty puzzle state
 */
export function createEmptyPuzzleState(): PuzzleState {
  const students = new Map<Student, StudentSolution>();

  STUDENTS.forEach((student) => {
    students.set(student, {
      student,
      language: null,
      problems: new Set<ProblemType>(),
    });
  });

  return {
    students,
    availableLanguages: new Set(LANGUAGES),
    problemCount: new Map(PROBLEM_TYPES.map((p) => [p, 0])),
  };
}

/**
 * Helper function to deep clone puzzle state
 */
export function clonePuzzleState(state: PuzzleState): PuzzleState {
  const students = new Map<Student, StudentSolution>();

  state.students.forEach((solution, student) => {
    students.set(student, {
      student: solution.student,
      language: solution.language,
      problems: new Set(solution.problems),
    });
  });

  return {
    students,
    availableLanguages: new Set(state.availableLanguages),
    problemCount: new Map(state.problemCount),
  };
}

/**
 * Check if puzzle is completely solved
 */
export function isPuzzleSolved(state: PuzzleState): boolean {
  // All students must have a language assigned
  for (const solution of state.students.values()) {
    if (!solution.language) return false;
    if (solution.problems.size === 0) return false;
  }

  // All languages must be used
  if (state.availableLanguages.size !== 0) return false;

  return true;
}
