/**
 * Validator for checking puzzle solutions against constraints
 */

import {
  PuzzleState,
  Student,
  Language,
  ValidationResult,
  Clue,
  CLUES,
} from "@/types/puzzle";

/**
 * Validate the current puzzle state against all clues
 */
export function validatePuzzleState(state: PuzzleState): ValidationResult {
  const violatedClues: Clue[] = [];

  // Check each clue
  if (!checkClue1(state)) violatedClues.push(CLUES[0]);
  if (!checkClue2(state)) violatedClues.push(CLUES[1]);
  if (!checkClue3(state)) violatedClues.push(CLUES[2]);
  if (!checkClue4(state)) violatedClues.push(CLUES[3]);
  if (!checkClue5(state)) violatedClues.push(CLUES[4]);
  if (!checkClue6(state)) violatedClues.push(CLUES[5]);
  if (!checkClue7(state)) violatedClues.push(CLUES[6]);
  if (!checkClue8(state)) violatedClues.push(CLUES[7]);
  if (!checkClue9(state)) violatedClues.push(CLUES[8]);
  if (!checkClue10(state)) violatedClues.push(CLUES[9]);

  const valid = violatedClues.length === 0;
  const message = valid
    ? "All constraints satisfied!"
    : `Violated ${violatedClues.length} constraint(s): ${violatedClues
        .map((c) => `#${c.id}`)
        .join(", ")}`;

  return {
    valid,
    violatedClues,
    message,
  };
}

/**
 * Clue 1: Bob solves Logic problems but does not use C++
 */
function checkClue1(state: PuzzleState): boolean {
  const bob = state.students.get("Bob")!;

  // If Bob has a language assigned, it shouldn't be C++
  if (bob.language && bob.language === "C++") return false;

  // If checking complete solution, Bob must solve Logic
  if (bob.language && !bob.problems.has("Logic")) return false;

  return true;
}

/**
 * Clue 2: Charlie uses Swift and solves Graph problems
 */
function checkClue2(state: PuzzleState): boolean {
  const charlie = state.students.get("Charlie")!;

  // If Charlie has a language, it must be Swift
  if (charlie.language && charlie.language !== "Swift") return false;

  // If checking complete solution, Charlie must solve Graph
  if (charlie.language && !charlie.problems.has("Graph")) return false;

  return true;
}

/**
 * Clue 3: The student using Python solves Math problems but does not solve Sorting
 */
function checkClue3(state: PuzzleState): boolean {
  const pythonUser = findStudentWithLanguage(state, "Python");

  if (pythonUser) {
    const solution = state.students.get(pythonUser)!;

    // Python user must solve Math
    if (!solution.problems.has("Math")) return false;

    // Python user must not solve Sorting
    if (solution.problems.has("Sorting")) return false;
  }

  return true;
}

/**
 * Clue 4: Alice solves Math problems but does not use Ruby or Swift
 */
function checkClue4(state: PuzzleState): boolean {
  const alice = state.students.get("Alice")!;

  // Alice must not use Ruby or Swift
  if (
    alice.language &&
    (alice.language === "Ruby" || alice.language === "Swift")
  ) {
    return false;
  }

  // If Alice has problems assigned, Math must be included
  if (alice.problems.size > 0 && !alice.problems.has("Math")) {
    return false;
  }

  return true;
}

/**
 * Clue 5: The student using C++ does not solve Logic or Graph problems
 */
function checkClue5(state: PuzzleState): boolean {
  const cppUser = findStudentWithLanguage(state, "C++");

  if (cppUser) {
    const solution = state.students.get(cppUser)!;

    // C++ user must not solve Logic or Graph
    if (solution.problems.has("Logic") || solution.problems.has("Graph")) {
      return false;
    }
  }

  return true;
}

/**
 * Clue 6: Eve solves Sorting problems but does not use Java or Python
 */
function checkClue6(state: PuzzleState): boolean {
  const eve = state.students.get("Eve")!;

  // Eve must not use Java or Python
  if (eve.language && (eve.language === "Java" || eve.language === "Python")) {
    return false;
  }

  // If Eve has problems, Sorting must be included
  if (eve.problems.size > 0 && !eve.problems.has("Sorting")) {
    return false;
  }

  return true;
}

/**
 * Clue 7: Dave does not solve Graph problems and does not use Ruby
 */
function checkClue7(state: PuzzleState): boolean {
  const dave = state.students.get("Dave")!;

  // Dave must not use Ruby
  if (dave.language && dave.language === "Ruby") return false;

  // Dave must not solve Graph
  if (dave.problems.has("Graph")) return false;

  return true;
}

/**
 * Clue 8: The student solving Sorting problems also solves Logic problems
 */
function checkClue8(state: PuzzleState): boolean {
  for (const solution of state.students.values()) {
    // If a student solves Sorting, they must also solve Logic
    if (solution.problems.has("Sorting") && !solution.problems.has("Logic")) {
      return false;
    }
  }

  return true;
}

/**
 * Clue 9: Only two students solve Graph problems
 */
function checkClue9(state: PuzzleState): boolean {
  let graphCount = 0;

  for (const solution of state.students.values()) {
    if (solution.problems.has("Graph")) {
      graphCount++;
    }
  }

  // If any students have Graph assigned, there must be exactly 2 (or fewer if partial)
  if (graphCount > 2) return false;

  return true;
}

/**
 * Clue 10: The student using Java solves exactly two types of problems
 */
function checkClue10(state: PuzzleState): boolean {
  const javaUser = findStudentWithLanguage(state, "Java");

  if (javaUser) {
    const solution = state.students.get(javaUser)!;

    // If Java user has problems assigned, must be exactly 2
    if (solution.problems.size > 0 && solution.problems.size !== 2) {
      return false;
    }
  }

  return true;
}

/**
 * Helper: Find which student uses a specific language
 */
function findStudentWithLanguage(
  state: PuzzleState,
  language: Language
): Student | null {
  for (const [student, solution] of state.students.entries()) {
    if (solution.language === language) {
      return student;
    }
  }
  return null;
}

/**
 * Check if each student has at most 3 problems
 */
export function checkMaxProblemsConstraint(state: PuzzleState): boolean {
  for (const solution of state.students.values()) {
    if (solution.problems.size > 3) return false;
  }
  return true;
}

/**
 * Check if each language is used by at most one student
 */
export function checkUniqueLanguages(state: PuzzleState): boolean {
  const usedLanguages = new Set<Language>();

  for (const solution of state.students.values()) {
    if (solution.language) {
      if (usedLanguages.has(solution.language)) {
        return false; // Duplicate language
      }
      usedLanguages.add(solution.language);
    }
  }

  return true;
}
