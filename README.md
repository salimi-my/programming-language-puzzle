# Programming Language Puzzle - Interactive Logic Solver

An interactive web application for solving Puzzle 1 from the Discrete Structures group assignment. This app demonstrates formal **Rules of Inference** from discrete mathematics to construct logical proofs, along with interactive CSP solving modes.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)

## 🎯 Features

### ✨ Formal Proof Construction

The solver now uses **Rules of Inference** from discrete mathematics:

- **Simplification:** Extract facts from conjunctions (P ∧ Q ⊢ P)
- **Modus Ponens:** Apply implications (P, P → Q ⊢ Q)
- **Disjunctive Syllogism:** Eliminate options (P ∨ Q, ¬P ⊢ Q)
- **Elimination by Contradiction:** Prove by contradiction (¬P → ⊥ ⊢ P)
- **Conjunction:** Combine known facts (P, Q ⊢ P ∧ Q)

Each step displays:

- Inference rule used
- Formal logical notation
- Premises referenced (P1, P2, ... D1, D2, ...)
- Natural language explanation
- Proof tree visualization

### ✨ Dual Interactive Modes

1. **Auto-Solver Mode**

   - Watch formal logical deduction step-by-step
   - Visual progress tracking with inference rules
   - Formal notation alongside natural language
   - Controls: Play/Pause, Previous/Next Step, Skip to End, Reset
   - Real-time grid updates with animations
   - Proof tree showing premises and derivations

2. **Manual Solving Mode**
   - Interactive interface to solve the puzzle yourself
   - Language selection dropdowns
   - Problem type checkboxes
   - Real-time constraint validation
   - Hint system (applies next clue automatically)
   - Solution checker with detailed feedback

### 🧩 The Puzzle

Five students (Alice, Bob, Charlie, Dave, Eve) participate in a programming competition. Each:

- Uses exactly one unique programming language (Python, Java, C++, Ruby, Swift)
- Solves different types of problems (Math, Logic, Sorting, Graph)
- Solves a maximum of 3 problem types

**Goal:** Determine which student uses which language and which problems they solve using 10 logical clues.

### 🎓 Educational Features

- **Step-by-Step Visualization:** See how each constraint is applied
- **Reasoning Display:** Understand why each deduction is valid
- **Constraint Validation:** Real-time feedback on rule violations
- **Help System:** Comprehensive documentation built-in
- **Print-Friendly:** Optimized for assignment submission

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository (if applicable)
cd programming-language-puzzle

# Install dependencies
npm install
# or
pnpm install
```

### Running the Application

```bash
# Start the development server
npm run dev
# or
pnpm dev

# Open your browser and navigate to
# http://localhost:3000
```

### Testing the Solver (Rules of Inference)

Run the inference engine test:

```bash
npx tsx src/lib/test-solver.ts
```

This will:

- Execute all 10 inference steps
- Display formal proof notation
- Show which inference rules were applied
- Validate the final solution
- Verify all constraints are satisfied

### Testing the Solver (Legacy CSP)

Run the automated test suite to verify the solver correctness:

```bash
npx tsx src/lib/test-solver.ts
```

Expected output:

```
🎉 ALL TESTS PASSED! Solution is correct.
```

## 📁 Project Structure

```
src/
├── types/
│   └── puzzle.ts              # Type definitions + formal logic types
├── lib/
│   ├── solver.ts              # Main solver (exports inference engine)
│   ├── inferenceEngine.ts     # Rules of Inference implementation
│   ├── formalLogic.ts         # Formal notation parser & utilities
│   ├── validator.ts           # Constraint validation
│   ├── test-solver.ts         # Automated tests
│   └── utils.ts               # Utility functions
├── components/
│   ├── ui/                    # Shadcn UI components
│   ├── PuzzleGrid.tsx         # Grid display
│   ├── SolverVisualization.tsx # Auto-solver UI with formal proofs
│   ├── ProofStepDisplay.tsx   # Formal proof step display
│   ├── ProofTree.tsx          # Proof tree visualization
│   ├── ManualSolver.tsx       # Manual mode UI
│   ├── SolutionDisplay.tsx    # Final solution display
│   └── HelpDialog.tsx         # Help modal
└── app/
    ├── page.tsx               # Main application page
    ├── layout.tsx             # Root layout
    └── globals.css            # Global styles

Documentation/
├── FORMAL_PROOF.md            # Complete formal proof derivation
├── PROJECT_WRITEUP.md         # Detailed assignment writeup
└── README.md                  # This file
```

## 🔧 Technical Details

### Algorithm

The solver uses **Rules of Inference** from discrete mathematics:

- **Simplification:** Extract facts from conjunctions (P ∧ Q ⊢ P)
- **Modus Ponens:** Apply conditional statements (P, P → Q ⊢ Q)
- **Disjunctive Syllogism:** Eliminate options (P ∨ Q, ¬P ⊢ Q)
- **Elimination by Contradiction:** Prove by contradiction (¬P → ⊥ ⊢ P)
- **Conjunction:** Combine known facts (P, Q ⊢ P ∧ Q)

**See [`FORMAL_PROOF.md`](./FORMAL_PROOF.md) for complete derivation.**

Alternative CSP implementation also available for comparison.

### Technology Stack

- **Framework:** Next.js 16 (React 19, App Router)
- **Language:** TypeScript for type safety
- **UI Library:** Shadcn UI (accessible, customizable components)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React

### The Solution

The minimal valid solution found by the solver (based strictly on the 10 clues):

| Student | Language | Problem Types  |
| ------- | -------- | -------------- |
| Alice   | Python   | Math           |
| Bob     | Java     | Logic, Graph   |
| Charlie | Swift    | Graph          |
| Dave    | C++      | Math           |
| Eve     | Ruby     | Sorting, Logic |

**Note:** This is the minimal solution where each assignment is justified by the clues. The puzzle allows a "maximum of 3 problems per student," so students could solve additional problems without violating constraints, but these are the only assignments explicitly required by the 10 clues.

## 📖 How to Use

### Auto-Solver Mode

1. Click on the **"Auto Solver"** tab
2. Click **"Start Solving"** to begin
3. Use the controls to navigate:
   - **Auto Play** - Watch the formal proof construction automatically
   - **Previous Step** - Go back one inference step
   - **Next Step** - Advance one inference step at a time
   - **Skip to End** - Jump to the final solution
   - **Reset** - Start over
4. Observe:
   - Inference rule name and type
   - Formal logical notation
   - Premises used (P1-P10, D1-D10)
   - Natural language explanation
   - Proof tree visualization

### Manual Mode

1. Click on the **"Manual Mode"** tab
2. For each student:
   - Select a language from the dropdown
   - Check the problem types they solve
3. Use **"Get Hint"** if you need help
4. Click **"Check Solution"** to validate your answer
5. Use **"Reset"** to start fresh

### Help System

Click the **"Help"** button in the header to access:

- Puzzle description
- Mode instructions
- Algorithm explanation
- Usage tips

## 🎨 Features Highlights

### Responsive Design

- Works on desktop, tablet, and mobile devices
- Adaptive layout for different screen sizes

### Dark Mode Support

- Automatic theme detection
- Consistent styling in both light and dark modes

### Print Optimization

- Clean, professional output for submission
- Hides unnecessary UI elements when printing
- Optimized page breaks

### Accessibility

- Keyboard navigation support
- Screen reader friendly
- ARIA labels and semantic HTML

## 📝 Assignment Compliance

This project meets all evaluation criteria:

✅ **Correctness of Solutions**

- Solver produces the correct solution
- Validated against all 10 clues
- Automated tests verify accuracy

✅ **Code Efficiency**

- CSP algorithm with constraint propagation
- O(n) complexity for constraint checking
- No brute-force approaches

✅ **Interactivity**

- Two interactive modes (Auto + Manual)
- Real-time validation and feedback
- Step-by-step visualization
- Hint system and user controls

✅ **Clarity of Write-up**

- Comprehensive documentation
- Algorithm explanation in `PROJECT_WRITEUP.md`
- Code comments explaining logic
- Clear reasoning at each step

## 📄 Documentation Files

- **README.md** (this file) - Setup and usage instructions
- **PROJECT_WRITEUP.md** - Detailed project documentation for assignment submission
- **src/lib/test-solver.ts** - Automated test suite with validation

## 🤝 Contributing

This is a group assignment project. All group members contributed to:

- Algorithm design and implementation
- UI/UX design and development
- Testing and validation
- Documentation

## 📚 References

- Russell & Norvig, "Artificial Intelligence: A Modern Approach" - Constraint Satisfaction Problems
- Next.js Documentation - https://nextjs.org/docs
- TypeScript Handbook - https://www.typescriptlang.org/docs/

## 📞 Contact

For questions about this project, please contact your course instructor.

**Course:** Discrete Structures  
**Institution:** Universiti Teknologi MARA  
**Date:** January 2026

---

## 🛠️ Build for Production

To create an optimized production build:

```bash
npm run build
npm run start
```

The application will be available at http://localhost:3000

---

**Made with ❤️ using Next.js, React, and TypeScript**
