# Programming Language Puzzle - Logic Solver

## Group Assignment Documentation
**Course:** Discrete Structures  
**Assignment:** Logic Puzzle Implementation (Puzzle 1)

---

## Table of Contents
1. [Puzzle Description](#puzzle-description)
2. [Solution Approach](#solution-approach)
3. [Algorithm Explanation](#algorithm-explanation)
4. [Implementation Details](#implementation-details)
5. [How to Run](#how-to-run)
6. [Features](#features)
7. [Technologies Used](#technologies-used)

---

## Puzzle Description

**The Challenge:**  
Five students—Alice, Bob, Charlie, Dave, and Eve—participate in a programming competition. Each student:
- Uses exactly one unique programming language from: Python, Java, C++, Ruby, Swift
- Solves different types of problems from: Math, Logic, Sorting, Graph
- Solves a maximum of 3 different problem types

**The Goal:**  
Determine which student uses which programming language and which types of problems each of them solves, based on 10 clues.

### The 10 Clues

1. Bob solves Logic problems but does not use C++.
2. Charlie uses Swift and solves Graph problems.
3. The student using Python solves Math problems but does not solve Sorting problems.
4. Alice solves Math problems but does not use Ruby or Swift.
5. The student using C++ does not solve Logic or Graph problems.
6. Eve solves Sorting problems but does not use Java or Python.
7. Dave does not solve Graph problems and does not use Ruby.
8. The student solving Sorting problems also solves Logic problems.
9. Only two students solve Graph problems.
10. The student using Java solves exactly two types of problems.

---

## Solution Approach

This puzzle is a **Constraint Satisfaction Problem (CSP)**. Our approach:

1. **Define Variables:**
   - Student → Language mapping (5 variables, each with 5 possible values)
   - Student → Problem Types mapping (5 variables, each with subsets of 4 problem types)

2. **Define Constraints:**
   - Each clue represents a constraint that limits possible assignments
   - Some constraints are direct assignments (e.g., "Charlie uses Swift")
   - Others are implications (e.g., "Python user solves Math")
   - Some are exclusions (e.g., "Bob does not use C++")
   - Others are counting constraints (e.g., "Only two students solve Graph")

3. **Apply Constraint Propagation:**
   - Start with an empty solution state
   - Apply each clue systematically
   - Eliminate impossible assignments
   - Deduce new assignments based on constraints
   - Continue until the solution is complete

---

## Algorithm Explanation

### Constraint Satisfaction Problem (CSP) Solver

Our solver implements a **forward-checking** algorithm with **constraint propagation**:

```
ALGORITHM: Solve Puzzle
INPUT: 10 clues as constraints
OUTPUT: Complete solution mapping students to languages and problems

1. Initialize empty puzzle state
   - All students have no language assigned
   - All students have no problems assigned

2. Apply direct assignment clues first (Clues 2, 4, 1, 6)
   - These immediately assign values to variables
   - Update available options

3. Apply implication clues (Clues 8, 3, 5)
   - These deduce assignments based on other assignments
   - Use logical inference

4. Apply exclusion constraints (Clue 7)
   - Eliminate impossible values

5. Apply counting constraints (Clues 9, 10)
   - Ensure cardinality requirements are met

6. Make final deductions
   - Fill in remaining assignments based on accumulated constraints

7. Validate solution against all constraints
```

### Key Techniques Used

1. **Forward Checking:**
   - After each assignment, check which values are still valid
   - Eliminate values that violate constraints

2. **Constraint Propagation:**
   - When one variable is assigned, propagate effects to related variables
   - Example: If Charlie uses Swift, Swift is removed from all other students

3. **Logical Deduction:**
   - Use process of elimination
   - Example: If 4 languages are taken, the 5th student must use the remaining language

4. **Validation:**
   - Each partial solution is validated against all constraints
   - Early detection of violations prevents incorrect solutions

---

## Implementation Details

### Technology Stack

- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **UI Library:** Shadcn UI
- **Styling:** Tailwind CSS

### Project Structure

```
src/
├── types/
│   └── puzzle.ts          # Type definitions for puzzle entities
├── lib/
│   ├── solver.ts          # CSP solver implementation
│   ├── validator.ts       # Constraint validation logic
│   └── test-solver.ts     # Automated tests
├── components/
│   ├── PuzzleGrid.tsx     # Grid display component
│   ├── SolverVisualization.tsx  # Step-by-step solver UI
│   ├── ManualSolver.tsx   # Interactive manual solving mode
│   ├── SolutionDisplay.tsx # Final solution display
│   └── HelpDialog.tsx     # Help and instructions
└── app/
    ├── page.tsx           # Main application page
    └── globals.css        # Global styles + print styles
```

### Core Components

#### 1. Type System (`types/puzzle.ts`)
- Defines all puzzle entities as TypeScript types
- Ensures type safety throughout the application
- Provides helper functions for state management

#### 2. Solver (`lib/solver.ts`)
- Implements the CSP algorithm
- Returns step-by-step solution trace
- Each step includes:
  - Clue being applied
  - Reasoning/explanation
  - State changes
  - Updated puzzle state

#### 3. Validator (`lib/validator.ts`)
- Validates puzzle states against all 10 clues
- Checks additional constraints:
  - Maximum 3 problems per student
  - Each language used by exactly one student
- Provides detailed error messages

### The Solution

Our solver produces the following minimal valid solution based strictly on the 10 clues:

| Student | Language | Problem Types |
|---------|----------|---------------|
| Alice   | Python   | Math |
| Bob     | Java     | Logic, Graph |
| Charlie | Swift    | Graph |
| Dave    | C++      | Math |
| Eve     | Ruby     | Sorting, Logic |

**Verification:** This solution satisfies all 10 clues!

**Note:** The puzzle specifies a "maximum of 3 problems per student," not a minimum. This solution contains only the problem assignments that are strictly required or deduced from the 10 clues. Students could potentially solve additional problems without violating any constraints, but the solver returns the minimal valid solution.

---

## Features

### 1. Auto-Solver Mode
- **Step-by-Step Visualization:** Watch the solver apply each clue
- **Animation:** Smooth transitions showing state changes
- **Progress Tracking:** Visual progress bar
- **Controls:**
  - Start/Pause/Resume
  - Next Step (manual advance)
  - Skip to End
  - Reset

### 2. Manual Solving Mode
- **Interactive Grid:** Users can make assignments themselves
- **Real-Time Validation:** Immediate feedback on constraint violations
- **Hint System:** Get help by applying the next clue
- **Solution Checker:** Verify your solution

### 3. User Interface
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Dark Mode Support:** Automatic theme detection
- **Print Friendly:** Optimized for printing/PDF export
- **Accessible:** Keyboard navigation and screen reader support

### 4. Educational Features
- **Reasoning Display:** Each step explains why it's valid
- **Constraint Highlighting:** See which clue is being applied
- **Help System:** Comprehensive documentation built-in
- **Violation Feedback:** Clear messages about which constraints are broken

---

## How to Run

### Prerequisites
- Node.js 18+ installed
- npm, pnpm, yarn, or bun package manager

### Installation & Running

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Open in browser
# Navigate to http://localhost:3000
```

### Testing the Solver

Run the automated test suite:

```bash
npx tsx src/lib/test-solver.ts
```

This verifies:
- The solver produces a correct solution
- All 10 clues are satisfied
- Additional constraints are met

---

## Code Quality

### Type Safety
- Full TypeScript implementation
- No `any` types
- Strict type checking enabled

### Code Structure
- Modular design with clear separation of concerns
- Well-commented code explaining complex logic
- Helper functions for common operations

### Testing
- Automated validation of solver correctness
- All 10 clues tested independently
- Additional constraint checks

---

## Evaluation Criteria Compliance

### ✅ Correctness of Solutions
- Solver produces the correct solution
- Validated against all 10 clues
- Automated tests verify correctness

### ✅ Code Efficiency
- CSP algorithm with constraint propagation
- O(n) complexity for most operations
- Early pruning of invalid assignments
- No brute-force searching

### ✅ Interactivity
- Two interactive modes (Auto + Manual)
- Real-time validation and feedback
- Step-by-step visualization
- Hint system
- Responsive user interface

### ✅ Clarity of Write-up
- Detailed algorithm explanation
- Clear documentation
- Code comments explaining logic
- Solution reasoning at each step

---

## Learning Outcomes

This project demonstrates:

1. **Formal Logic Application:** Converting natural language clues into formal constraints
2. **Algorithmic Problem Solving:** Implementing CSP with constraint propagation
3. **Proof Construction:** Each step in the solution is a logical deduction
4. **Software Engineering:** Building a complete, interactive application

---

## Team Members

[Add your group members' names, photos, and profiles here]

---

## References

- Constraint Satisfaction Problems (CSP) - Russell & Norvig, "Artificial Intelligence: A Modern Approach"
- Logic Puzzle Solving Techniques
- Next.js Documentation
- TypeScript Handbook

---

## Conclusion

This project successfully implements an interactive logic puzzle solver that demonstrates constraint satisfaction problem-solving techniques. The application provides both automated and manual solving modes, making it educational and engaging while meeting all assignment requirements.

The CSP approach ensures correctness through systematic application of constraints, and the interactive UI makes the solving process transparent and understandable.

---

**Date:** January 2026  
**Course:** Discrete Structures  
**Institution:** Universiti Teknologi MARA
