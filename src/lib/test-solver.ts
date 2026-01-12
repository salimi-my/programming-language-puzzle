/**
 * Test script to verify the solver works correctly
 * Run this with: node --loader tsx src/lib/test-solver.ts
 */

import { solvePuzzle, getSolutionSummary } from "./solver";
import {
  validatePuzzleState,
  checkMaxProblemsConstraint,
  checkUniqueLanguages,
} from "./validator";

console.log("🧩 Testing Programming Language Puzzle Solver...\n");
console.log("=".repeat(60));

// Run the solver
const result = solvePuzzle();

if (!result.success) {
  console.error("❌ Solver failed:", result.error);
  process.exit(1);
}

console.log(
  `✅ Solver completed successfully with ${result.steps.length} steps\n`
);

// Display each step
console.log("📋 SOLVING STEPS:");
console.log("=".repeat(60));
result.steps.forEach((step) => {
  // Check if this is a ProofStep (new format) or SolverStep (old format)
  if ("inferenceRule" in step) {
    // ProofStep format
    console.log(`\nStep ${step.stepNumber}: ${step.inferenceRule}`);
    console.log(`Formal Proof: ${step.formalProof}`);
    console.log(`Reasoning: ${step.naturalLanguage}`);
    console.log(`Action: ${JSON.stringify(step.action)}`);
  } else {
    // SolverStep format (legacy)
    console.log(`\nStep ${step.stepNumber}: Clue #${step.clueApplied.id}`);
    console.log(`Clue: "${step.clueApplied.text}"`);
    console.log(`Reasoning: ${step.reasoning}`);
    console.log(`Action: ${JSON.stringify(step.action)}`);
  }
});

// Display final solution
console.log("\n" + "=".repeat(60));
console.log(getSolutionSummary(result.finalState));

// Validate the solution
console.log("🔍 VALIDATION:");
console.log("=".repeat(60));

const validation = validatePuzzleState(result.finalState);
console.log(`Valid: ${validation.valid ? "✅ YES" : "❌ NO"}`);
console.log(`Message: ${validation.message}`);

if (validation.violatedClues.length > 0) {
  console.log("\n❌ Violated clues:");
  validation.violatedClues.forEach((clue) => {
    console.log(`  - Clue ${clue.id}: ${clue.text}`);
  });
}

// Additional checks
const maxProblems = checkMaxProblemsConstraint(result.finalState);
const uniqueLangs = checkUniqueLanguages(result.finalState);

console.log(
  `\nMax 3 problems per student: ${maxProblems ? "✅ PASS" : "❌ FAIL"}`
);
console.log(`Unique languages: ${uniqueLangs ? "✅ PASS" : "❌ FAIL"}`);

// Summary
console.log("\n" + "=".repeat(60));
if (validation.valid && maxProblems && uniqueLangs) {
  console.log("🎉 ALL TESTS PASSED! Solution is correct.");
} else {
  console.log("⚠️  Some tests failed. Please review the solution.");
  process.exit(1);
}
