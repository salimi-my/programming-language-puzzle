/**
 * Formal Logic Parser and Utilities
 *
 * Converts natural language clues to formal logical notation
 * for use with Rules of Inference
 */

import {
  Clue,
  CLUES,
  FormalPremise,
  LogicalOperator,
  SolverAction,
  Student,
  Language,
  ProblemType,
} from "@/types/puzzle";

const { AND, OR, NOT, IMPLIES } = LogicalOperator;

/**
 * Parse all clues into formal premises
 */
export function parseClues(): FormalPremise[] {
  return CLUES.map((clue, index) =>
    parseClueToFormalPremise(clue, `P${index + 1}`)
  );
}

/**
 * Convert a clue to a formal premise with logical notation
 */
export function parseClueToFormalPremise(
  clue: Clue,
  id: string
): FormalPremise {
  let formalNotation = "";
  let components: string[] = [];

  switch (clue.id) {
    case 1: // Bob solves Logic but does not use C++
      formalNotation = `Bob.solves(Logic) ${AND} ${NOT}Bob.uses(C++)`;
      components = ["Bob.solves(Logic)", `${NOT}Bob.uses(C++)`];
      break;

    case 2: // Charlie uses Swift and solves Graph
      formalNotation = `Charlie.uses(Swift) ${AND} Charlie.solves(Graph)`;
      components = ["Charlie.uses(Swift)", "Charlie.solves(Graph)"];
      break;

    case 3: // Python user solves Math but not Sorting
      formalNotation = `${String.fromCharCode(
        8704
      )}x (x.uses(Python) ${IMPLIES} x.solves(Math) ${AND} ${NOT}x.solves(Sorting))`;
      components = [
        `${String.fromCharCode(
          8704
        )}x (x.uses(Python) ${IMPLIES} x.solves(Math))`,
        `${String.fromCharCode(
          8704
        )}x (x.uses(Python) ${IMPLIES} ${NOT}x.solves(Sorting))`,
      ];
      break;

    case 4: // Alice solves Math but not Ruby or Swift
      formalNotation = `Alice.solves(Math) ${AND} ${NOT}Alice.uses(Ruby) ${AND} ${NOT}Alice.uses(Swift)`;
      components = [
        "Alice.solves(Math)",
        `${NOT}Alice.uses(Ruby)`,
        `${NOT}Alice.uses(Swift)`,
      ];
      break;

    case 5: // C++ user doesn't solve Logic or Graph
      formalNotation = `${String.fromCharCode(
        8704
      )}x (x.uses(C++) ${IMPLIES} ${NOT}x.solves(Logic) ${AND} ${NOT}x.solves(Graph))`;
      components = [
        `${String.fromCharCode(
          8704
        )}x (x.uses(C++) ${IMPLIES} ${NOT}x.solves(Logic))`,
        `${String.fromCharCode(
          8704
        )}x (x.uses(C++) ${IMPLIES} ${NOT}x.solves(Graph))`,
      ];
      break;

    case 6: // Eve solves Sorting but not Java or Python
      formalNotation = `Eve.solves(Sorting) ${AND} ${NOT}Eve.uses(Java) ${AND} ${NOT}Eve.uses(Python)`;
      components = [
        "Eve.solves(Sorting)",
        `${NOT}Eve.uses(Java)`,
        `${NOT}Eve.uses(Python)`,
      ];
      break;

    case 7: // Dave doesn't solve Graph and doesn't use Ruby
      formalNotation = `${NOT}Dave.solves(Graph) ${AND} ${NOT}Dave.uses(Ruby)`;
      components = [`${NOT}Dave.solves(Graph)`, `${NOT}Dave.uses(Ruby)`];
      break;

    case 8: // Sorting solver also solves Logic
      formalNotation = `${String.fromCharCode(
        8704
      )}x (x.solves(Sorting) ${IMPLIES} x.solves(Logic))`;
      components = [
        `${String.fromCharCode(
          8704
        )}x (x.solves(Sorting) ${IMPLIES} x.solves(Logic))`,
      ];
      break;

    case 9: // Only two students solve Graph
      formalNotation = `|{x : x.solves(Graph)}| = 2`;
      components = [`|{x : x.solves(Graph)}| = 2`];
      break;

    case 10: // Java user solves exactly 2 problems
      formalNotation = `${String.fromCharCode(
        8704
      )}x (x.uses(Java) ${IMPLIES} |x.problems| = 2)`;
      components = [
        `${String.fromCharCode(
          8704
        )}x (x.uses(Java) ${IMPLIES} |x.problems| = 2)`,
      ];
      break;

    default:
      formalNotation = clue.text;
      components = [clue.text];
  }

  return {
    id,
    clue,
    formalNotation,
    naturalLanguage: clue.text,
    components,
  };
}

/**
 * Format a solver action as a formal conclusion
 */
export function formatActionAsConclusion(action: SolverAction): string {
  switch (action.type) {
    case "assign_language":
      return `${action.student}.uses(${action.language})`;

    case "assign_problem":
      return `${action.student}.solves(${action.problem})`;

    case "exclude_language":
      return `${NOT}${action.student}.uses(${action.language})`;

    case "exclude_problem":
      return `${NOT}${action.student}.solves(${action.problem})`;

    case "deduce":
      return action.description;

    default:
      return "";
  }
}

/**
 * Format a formal proof step
 */
export function formatFormalProof(
  premises: string[],
  conclusion: string,
  ruleAbbrev: string
): string {
  return `${premises.join(", ")} ${
    LogicalOperator.TURNSTILE
  } ${conclusion} [${ruleAbbrev}]`;
}

/**
 * Get abbreviation for inference rule
 */
export function getRuleAbbreviation(rule: string): string {
  const abbrevMap: Record<string, string> = {
    "Modus Ponens": "MP",
    "Modus Tollens": "MT",
    Elimination: "Elimination",
    Conjunction: "Conj",
    Simplification: "Simp",
    "Disjunctive Syllogism": "DS",
    Resolution: "Res",
    "Universal Instantiation": "UI",
    "Hypothetical Syllogism": "HS",
  };
  return abbrevMap[rule] || rule;
}

/**
 * Create a conjunction of multiple statements
 */
export function createConjunction(statements: string[]): string {
  return statements.join(` ${AND} `);
}

/**
 * Create a disjunction of multiple statements
 */
export function createDisjunction(statements: string[]): string {
  return statements.join(` ${OR} `);
}

/**
 * Negate a statement
 */
export function negateStatement(statement: string): string {
  if (statement.startsWith(NOT)) {
    return statement.substring(1); // Remove negation
  }
  return `${NOT}${statement}`;
}

/**
 * Check if a statement is a negation
 */
export function isNegation(statement: string): boolean {
  return statement.startsWith(NOT);
}

/**
 * Extract student name from formal notation
 */
export function extractStudent(notation: string): Student | null {
  const students: Student[] = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
  for (const student of students) {
    if (notation.includes(student)) {
      return student;
    }
  }
  return null;
}

/**
 * Extract language from formal notation
 */
export function extractLanguage(notation: string): Language | null {
  const languages: Language[] = ["Python", "Java", "C++", "Ruby", "Swift"];
  for (const lang of languages) {
    if (notation.includes(lang)) {
      return lang;
    }
  }
  return null;
}

/**
 * Extract problem type from formal notation
 */
export function extractProblemType(notation: string): ProblemType | null {
  const problems: ProblemType[] = ["Math", "Logic", "Sorting", "Graph"];
  for (const prob of problems) {
    if (notation.includes(prob)) {
      return prob;
    }
  }
  return null;
}
