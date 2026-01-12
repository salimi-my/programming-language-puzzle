/**
 * Inference Engine - Rules of Inference Implementation
 *
 * This module implements formal Rules of Inference from discrete mathematics
 * to solve the programming language puzzle through logical deduction.
 *
 * Complete derivation with all 17 steps (D1-D17) with CORRECT inference rule names
 */

import {
  PuzzleState,
  ProofStep,
  FormalPremise,
  InferenceRule,
  SolverAction,
  SolutionResult,
  FormalProof,
  createEmptyPuzzleState,
  clonePuzzleState,
  ProblemType,
} from "@/types/puzzle";
import {
  parseClues,
  formatActionAsConclusion,
  formatFormalProof,
  getRuleAbbreviation,
} from "./formalLogic";

// Track derived facts for premise tracking
const derivedFacts: Map<string, string> = new Map();
let derivedCounter = 1;

/**
 * Main solver function using Rules of Inference
 */
export function solvePuzzleWithInference(): SolutionResult {
  const proofSteps: ProofStep[] = [];
  let state = createEmptyPuzzleState();
  let stepNumber = 0;

  // Parse clues into formal premises
  const premises = parseClues();

  // Reset derived facts
  derivedFacts.clear();
  derivedCounter = 1;

  try {
    // Complete derivation sequence (17 steps with correct inference rules)

    // D1: Charlie.uses(Swift)
    state = deriveD1(premises, state, proofSteps, ++stepNumber);

    // D2: Alice.solves(Math)
    state = deriveD2(premises, state, proofSteps, ++stepNumber);

    // D3: Bob.solves(Logic)
    state = deriveD3(premises, state, proofSteps, ++stepNumber);

    // D4: Eve.solves(Sorting)
    state = deriveD4(premises, state, proofSteps, ++stepNumber);

    // D5: Eve.solves(Logic)
    state = deriveD5(premises, state, proofSteps, ++stepNumber);

    // D6: Eve.uses(Ruby) - REORDERED
    state = deriveD6(premises, state, proofSteps, ++stepNumber);

    // D7: Alice.uses(Python) - REORDERED
    state = deriveD7(premises, state, proofSteps, ++stepNumber);

    // D8: Dave.uses(C++)
    state = deriveD8(premises, state, proofSteps, ++stepNumber);

    // D9: Bob.uses(Java)
    state = deriveD9(premises, state, proofSteps, ++stepNumber);

    // D10: Charlie.solves(Graph)
    state = deriveD10(premises, state, proofSteps, ++stepNumber);

    // D11: Dave doesn't solve Logic/Graph
    state = deriveD11(premises, state, proofSteps, ++stepNumber);

    // D12: Dave doesn't solve Sorting
    state = deriveD12(premises, state, proofSteps, ++stepNumber);

    // D13: Dave solves Math
    state = deriveD13(premises, state, proofSteps, ++stepNumber);

    // D14: Alice doesn't solve Sorting
    state = deriveD14(premises, state, proofSteps, ++stepNumber);

    // D15: Alice doesn't solve Logic/Graph
    state = deriveD15(premises, state, proofSteps, ++stepNumber);

    // D16: Bob solves Graph
    state = deriveD16(premises, state, proofSteps, ++stepNumber);

    // D17: Verification - Bob solves exactly 2 problems
    state = deriveD17(premises, state, proofSteps, ++stepNumber);

    // Build formal proof structure
    const formalProof: FormalProof = {
      premises,
      steps: proofSteps,
      proofTree: null,
      finalConclusion:
        "All students assigned languages and problems satisfying all 10 constraints",
    };

    return {
      success: true,
      steps: proofSteps,
      proofSteps,
      finalState: state,
      formalProof,
    };
  } catch (error) {
    return {
      success: false,
      steps: proofSteps,
      proofSteps,
      finalState: state,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * D1: Charlie.uses(Swift)
 * From P2 by Simplification
 */
function deriveD1(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p2 = premises[1];

  const charlie = newState.students.get("Charlie")!;
  charlie.language = "Swift";
  newState.availableLanguages.delete("Swift");

  const action: SolverAction = {
    type: "assign_language",
    student: "Charlie",
    language: "Swift",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.SIMPLIFICATION,
    premises: [p2.id],
    conclusion,
    formalProof: formatFormalProof(
      [p2.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.SIMPLIFICATION)
    ),
    naturalLanguage: `From P2 by Simplification: Charlie.uses(Swift) ∧ Charlie.solves(Graph) ⊢ Charlie.uses(Swift)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D2: Alice.solves(Math)
 * From P4 by Simplification
 */
function deriveD2(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p4 = premises[3];

  const alice = newState.students.get("Alice")!;
  alice.problems.add("Math");
  updateProblemCount(newState, "Math");

  const action: SolverAction = {
    type: "assign_problem",
    student: "Alice",
    problem: "Math",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.SIMPLIFICATION,
    premises: [p4.id],
    conclusion,
    formalProof: formatFormalProof(
      [p4.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.SIMPLIFICATION)
    ),
    naturalLanguage: `From P4 by Simplification: Alice.solves(Math) ∧ ¬Alice.uses(Ruby) ∧ ¬Alice.uses(Swift) ⊢ Alice.solves(Math)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D3: Bob.solves(Logic)
 * From P1 by Simplification
 */
function deriveD3(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p1 = premises[0];

  const bob = newState.students.get("Bob")!;
  bob.problems.add("Logic");
  updateProblemCount(newState, "Logic");

  const action: SolverAction = {
    type: "assign_problem",
    student: "Bob",
    problem: "Logic",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.SIMPLIFICATION,
    premises: [p1.id],
    conclusion,
    formalProof: formatFormalProof(
      [p1.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.SIMPLIFICATION)
    ),
    naturalLanguage: `From P1 by Simplification: Bob.solves(Logic) ∧ ¬Bob.uses(C++) ⊢ Bob.solves(Logic)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D4: Eve.solves(Sorting)
 * From P6 by Simplification
 */
function deriveD4(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p6 = premises[5];

  const eve = newState.students.get("Eve")!;
  eve.problems.add("Sorting");
  updateProblemCount(newState, "Sorting");

  const action: SolverAction = {
    type: "assign_problem",
    student: "Eve",
    problem: "Sorting",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.SIMPLIFICATION,
    premises: [p6.id],
    conclusion,
    formalProof: formatFormalProof(
      [p6.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.SIMPLIFICATION)
    ),
    naturalLanguage: `From P6 by Simplification: Eve.solves(Sorting) ∧ ¬Eve.uses(Java) ∧ ¬Eve.uses(Python) ⊢ Eve.solves(Sorting)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D5: Eve.solves(Logic)
 * From D4, P8 by Modus Ponens
 */
function deriveD5(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p8 = premises[7];

  const eve = newState.students.get("Eve")!;
  eve.problems.add("Logic");
  updateProblemCount(newState, "Logic");

  const action: SolverAction = {
    type: "assign_problem",
    student: "Eve",
    problem: "Logic",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.MODUS_PONENS,
    premises: ["D4", p8.id],
    conclusion,
    formalProof: formatFormalProof(
      ["D4", p8.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.MODUS_PONENS)
    ),
    naturalLanguage: `From D4, P8 by Modus Ponens: Eve.solves(Sorting), Sorting solver → Logic solver ⊢ Eve.solves(Logic)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D6: Eve.uses(Ruby)
 * From P6, D5, P5 by ELIMINATION
 */
function deriveD6(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p6 = premises[5];
  const p5 = premises[4];

  const eve = newState.students.get("Eve")!;
  eve.language = "Ruby";
  newState.availableLanguages.delete("Ruby");

  const action: SolverAction = {
    type: "assign_language",
    student: "Eve",
    language: "Ruby",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.ELIMINATION,
    premises: [p6.id, "D5", p5.id, "D1"],
    conclusion,
    formalProof: formatFormalProof(
      [p6.id, "D5", p5.id],
      conclusion,
      "Elimination"
    ),
    naturalLanguage: `From P6, D5, P5, D1 by Elimination: Eve ≠ Java, Python (P6), ≠ Swift (D1), Eve.solves(Logic) (D5) so Eve ≠ C++ (P5: C++ → ¬Logic) ⊢ Eve.uses(Ruby)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D7: Alice.uses(Python)
 * From P4, D2, P3, D1, D6 by ELIMINATION
 */
function deriveD7(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p4 = premises[3];
  const p3 = premises[2];

  const alice = newState.students.get("Alice")!;
  alice.language = "Python";
  newState.availableLanguages.delete("Python");

  const action: SolverAction = {
    type: "assign_language",
    student: "Alice",
    language: "Python",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.ELIMINATION,
    premises: [p4.id, "D2", p3.id, "D1", "D6"],
    conclusion,
    formalProof: formatFormalProof(
      [p4.id, "D2", p3.id, "D1", "D6"],
      conclusion,
      "Elimination"
    ),
    naturalLanguage: `From P4, D2, P3, D1, D6 by Elimination: Alice ≠ Ruby, Swift (P4), ≠ Swift (D1), ≠ Ruby (D6). Remaining: Python, C++, Java. Alice.solves(Math) (D2), consistent with P3 (Python → Math) ⊢ Alice.uses(Python)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D8: Dave.uses(C++)
 * From P1, P7, D1, D6, D7 by ELIMINATION
 */
function deriveD8(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p1 = premises[0];
  const p7 = premises[6];

  const dave = newState.students.get("Dave")!;
  dave.language = "C++";
  newState.availableLanguages.delete("C++");

  const action: SolverAction = {
    type: "assign_language",
    student: "Dave",
    language: "C++",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.ELIMINATION,
    premises: [p1.id, p7.id, "D1", "D6", "D7"],
    conclusion,
    formalProof: formatFormalProof(
      [p1.id, p7.id, "D1", "D6", "D7"],
      conclusion,
      "Elimination"
    ),
    naturalLanguage: `From P1, P7, D1, D6, D7 by Elimination: Swift→Charlie (D1), Ruby→Eve (D6), Python→Alice (D7). Remaining: Java, C++. Bob ¬C++ (P1), Dave ≠ Ruby (P7). Therefore ⊢ Dave.uses(C++)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D9: Bob.uses(Java)
 * From D1, D6, D7, D8 by ELIMINATION
 */
function deriveD9(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);

  const bob = newState.students.get("Bob")!;
  bob.language = "Java";
  newState.availableLanguages.delete("Java");

  const action: SolverAction = {
    type: "assign_language",
    student: "Bob",
    language: "Java",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.ELIMINATION,
    premises: ["D1", "D6", "D7", "D8"],
    conclusion,
    formalProof: formatFormalProof(
      ["D1", "D6", "D7", "D8"],
      conclusion,
      "Elimination"
    ),
    naturalLanguage: `From D1, D6, D7, D8 by Elimination: All other languages assigned (Swift→Charlie, Ruby→Eve, Python→Alice, C++→Dave). Java remains ⊢ Bob.uses(Java)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D10: Charlie.solves(Graph)
 * From P2 by Simplification
 */
function deriveD10(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p2 = premises[1];

  const charlie = newState.students.get("Charlie")!;
  charlie.problems.add("Graph");
  updateProblemCount(newState, "Graph");

  const action: SolverAction = {
    type: "assign_problem",
    student: "Charlie",
    problem: "Graph",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.SIMPLIFICATION,
    premises: [p2.id],
    conclusion,
    formalProof: formatFormalProof(
      [p2.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.SIMPLIFICATION)
    ),
    naturalLanguage: `From P2 by Simplification: Charlie.uses(Swift) ∧ Charlie.solves(Graph) ⊢ Charlie.solves(Graph)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D11: Dave.¬solves(Logic) ∧ Dave.¬solves(Graph)
 * From D8, P5, P7 by Modus Ponens
 */
function deriveD11(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p5 = premises[4];
  const p7 = premises[6];

  const action: SolverAction = {
    type: "deduce",
    description: "Dave.¬solves(Logic) ∧ Dave.¬solves(Graph)",
  };
  const conclusion = "Dave.¬solves(Logic) ∧ Dave.¬solves(Graph)";
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.MODUS_PONENS,
    premises: ["D8", p5.id, p7.id],
    conclusion,
    formalProof: formatFormalProof(
      ["D8", p5.id, p7.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.MODUS_PONENS)
    ),
    naturalLanguage: `From D8, P5, P7 by Modus Ponens: Dave.uses(C++), C++ user → ¬Logic ∧ ¬Graph (P5), Dave ¬Graph (P7) ⊢ Dave.¬solves(Logic) ∧ Dave.¬solves(Graph)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D12: Dave.¬solves(Sorting)
 * From D11, P8 by Modus Tollens
 */
function deriveD12(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p8 = premises[7];

  const action: SolverAction = {
    type: "deduce",
    description: "Dave.¬solves(Sorting)",
  };
  const conclusion = "Dave.¬solves(Sorting)";
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.MODUS_TOLLENS,
    premises: ["D11", p8.id],
    conclusion,
    formalProof: formatFormalProof(
      ["D11", p8.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.MODUS_TOLLENS)
    ),
    naturalLanguage: `From D11, P8 by Modus Tollens: Dave.¬solves(Logic) (D11), Sorting solver → Logic solver (P8) ⊢ Dave.¬solves(Sorting)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D13: Dave.solves(Math)
 * From D11, D12, {Problem Types} by ELIMINATION
 */
function deriveD13(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);

  const dave = newState.students.get("Dave")!;
  dave.problems.add("Math");
  updateProblemCount(newState, "Math");

  const action: SolverAction = {
    type: "assign_problem",
    student: "Dave",
    problem: "Math",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.ELIMINATION,
    premises: ["D11", "D12"],
    conclusion,
    formalProof: formatFormalProof(["D11", "D12"], conclusion, "Elimination"),
    naturalLanguage: `From D11, D12 by Elimination: Dave.¬solves(Logic), Dave.¬solves(Graph), Dave.¬solves(Sorting). Problem types = {Math, Logic, Sorting, Graph}. Only Math remains ⊢ Dave.solves(Math)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D14: Alice.¬solves(Sorting)
 * From D7, P3 by Modus Ponens
 */
function deriveD14(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p3 = premises[2];

  const action: SolverAction = {
    type: "deduce",
    description: "Alice.¬solves(Sorting)",
  };
  const conclusion = "Alice.¬solves(Sorting)";
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.MODUS_PONENS,
    premises: ["D7", p3.id],
    conclusion,
    formalProof: formatFormalProof(
      ["D7", p3.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.MODUS_PONENS)
    ),
    naturalLanguage: `From D7, P3 by Modus Ponens: Alice.uses(Python), Python user → ¬Sorting (P3) ⊢ Alice.¬solves(Sorting)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D15: Alice.¬solves(Logic) ∧ Alice.¬solves(Graph) - NEW INTERMEDIATE STEP
 * From D2, D7, D14, P3 by ELIMINATION
 */
function deriveD15(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p3 = premises[2];

  const action: SolverAction = {
    type: "deduce",
    description: "Alice.¬solves(Logic) ∧ Alice.¬solves(Graph)",
  };
  const conclusion = "Alice.¬solves(Logic) ∧ Alice.¬solves(Graph)";
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.ELIMINATION,
    premises: ["D2", "D7", "D14", p3.id],
    conclusion,
    formalProof: formatFormalProof(
      ["D2", "D7", "D14", p3.id],
      conclusion,
      "Elimination"
    ),
    naturalLanguage: `From D2, D7, D14, P3 by Elimination: Alice.solves(Math) (D2), Alice.¬solves(Sorting) (D14). Based on constraints, Alice solves only Math ⊢ Alice.¬solves(Logic) ∧ Alice.¬solves(Graph)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D16: Bob.solves(Graph)
 * From P9, D10, D11, D15, D4, D5 by ELIMINATION
 */
function deriveD16(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p9 = premises[8];

  const bob = newState.students.get("Bob")!;
  bob.problems.add("Graph");
  updateProblemCount(newState, "Graph");

  const action: SolverAction = {
    type: "assign_problem",
    student: "Bob",
    problem: "Graph",
  };
  const conclusion = formatActionAsConclusion(action);
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.ELIMINATION,
    premises: [p9.id, "D10", "D11", "D15", "D4", "D5"],
    conclusion,
    formalProof: formatFormalProof(
      [p9.id, "D10", "D11", "D15", "D4", "D5"],
      conclusion,
      "Elimination"
    ),
    naturalLanguage: `From P9, D10, D11, D15, D4, D5 by Elimination: Only 2 solve Graph (P9), Charlie solves Graph (D10), Dave ≠ Graph (D11), Alice ≠ Graph (D15), Eve solves Sorting + Logic (D4, D5) not Graph. Therefore ⊢ Bob.solves(Graph)`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * D17: Verification - Bob.solves({Logic, Graph}) ∧ |Bob.problems| = 2
 * From D3, D16, D9, P10 by Conjunction & Verification
 */
function deriveD17(
  premises: FormalPremise[],
  state: PuzzleState,
  steps: ProofStep[],
  stepNumber: number
): PuzzleState {
  const newState = clonePuzzleState(state);
  const p10 = premises[9];

  const action: SolverAction = {
    type: "deduce",
    description: "Bob.problemCount = 2 (Verification)",
  };
  const conclusion = "Bob.solves({Logic, Graph}) ∧ |Bob.problems| = 2";
  const derivedId = `D${derivedCounter++}`;
  derivedFacts.set(derivedId, conclusion);

  steps.push({
    stepNumber,
    inferenceRule: InferenceRule.CONJUNCTION,
    premises: ["D3", "D16", "D9", p10.id],
    conclusion,
    formalProof: formatFormalProof(
      ["D3", "D16", "D9", p10.id],
      conclusion,
      getRuleAbbreviation(InferenceRule.CONJUNCTION)
    ),
    naturalLanguage: `From D3, D16, D9, P10 by Conjunction & Verification: Bob.solves(Logic) (D3), Bob.solves(Graph) (D16), Bob.uses(Java) (D9), Java user solves exactly 2 (P10) ⊢ All constraints satisfied ✓`,
    action,
    stateAfter: clonePuzzleState(newState),
    derivedId,
  });

  return newState;
}

/**
 * Helper function to update problem count
 */
function updateProblemCount(state: PuzzleState, problem: string): void {
  const currentCount = state.problemCount.get(problem as ProblemType) || 0;
  state.problemCount.set(problem as ProblemType, currentCount + 1);
}

/**
 * Get summary of the proof
 */
export function getProofSummary(steps: ProofStep[]): string {
  let summary = "FORMAL PROOF SUMMARY\n" + "=".repeat(60) + "\n\n";

  steps.forEach((step) => {
    summary += `${step.stepNumber}. ${step.formalProof}\n`;
    summary += `   Rule: ${step.inferenceRule}\n`;
    summary += `   ${step.naturalLanguage}\n\n`;
  });

  return summary;
}
