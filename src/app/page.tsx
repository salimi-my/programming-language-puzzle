"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Play } from "lucide-react";
import { CLUES, Language, ProblemType, Student } from "@/types/puzzle";
import { SolverVisualization } from "@/components/SolverVisualization";
import { ManualSolver } from "@/components/ManualSolver";
import { HelpDialog } from "@/components/HelpDialog";
import { LanguageBadge } from "@/components/LanguageBadge";
import { ProblemTypeBadge } from "@/components/ProblemTypeBadge";
import { StudentBadge } from "@/components/StudentBadge";

export default function Home() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-900">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 dark:border-slate-700/50 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                Programming Language Puzzle
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Discrete Structures - Logic Puzzle Solver
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowHelp(true)}
              className="border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/30"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Help
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="mb-8 border-2 border-purple-200/50 dark:border-purple-800/50 shadow-xl card-gradient">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                <Brain className="h-6 w-6" />
              </div>
              <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                Puzzle 1: The Programming Language Challenge
              </span>
            </CardTitle>
            <CardDescription className="text-base text-slate-700 dark:text-slate-300">
              Five students participate in a programming competition. Each uses
              a unique programming language and solves different types of
              problems. Can you figure out who uses which language and what
              problems they solve?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-lg border-2 border-purple-200/50 dark:border-purple-800/50 bg-purple-50/30 dark:bg-purple-950/20">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">
                  Students
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(
                    ["Alice", "Bob", "Charlie", "Dave", "Eve"] as Student[]
                  ).map((s) => (
                    <StudentBadge key={s} student={s} />
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg border-2 border-blue-200/50 dark:border-blue-800/50 bg-blue-50/30 dark:bg-blue-950/20">
                <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                  Languages
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(
                    ["Python", "Java", "C++", "Ruby", "Swift"] as Language[]
                  ).map((l) => (
                    <LanguageBadge key={l} language={l} variant="secondary" />
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg border-2 border-indigo-200/50 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
                <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
                  Problem Types
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(["Math", "Logic", "Sorting", "Graph"] as ProblemType[]).map(
                    (p) => (
                      <ProblemTypeBadge
                        key={p}
                        problemType={p}
                        variant="default"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clues Section */}
        <Card className="mb-8 border-2 border-blue-200/50 dark:border-blue-800/50 shadow-xl card-gradient">
          <CardHeader>
            <CardTitle className="text-xl bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
              Clues
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-300">
              Use these 10 clues to deduce the solution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {CLUES.map((clue) => (
                <div
                  key={clue.id}
                  className="flex gap-3 p-3 rounded-lg border-2 border-blue-100 dark:border-blue-900/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-500 text-white text-xs font-bold shadow-md">
                      {clue.id}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {clue.text}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Solver */}
        <Card className="border-2 border-indigo-200/50 dark:border-indigo-800/50 shadow-xl card-gradient">
          <CardHeader>
            <CardTitle className="text-xl bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Solve the Puzzle
            </CardTitle>
            <CardDescription className="text-slate-700 dark:text-slate-300">
              Choose your approach: watch the AI solver work step-by-step, or
              try solving it yourself manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="auto" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-linear-to-r from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 p-1">
                <TabsTrigger
                  value="auto"
                  className="flex items-center gap-2 data-[state=active]:bg-linear-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Play className="h-4 w-4" />
                  Auto Solver
                </TabsTrigger>
                <TabsTrigger
                  value="manual"
                  className="flex items-center gap-2 data-[state=active]:bg-linear-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Brain className="h-4 w-4" />
                  Manual Mode
                </TabsTrigger>
              </TabsList>

              <TabsContent value="auto" className="space-y-4">
                <SolverVisualization />
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <ManualSolver />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="glass-effect border-t border-white/20 dark:border-slate-700/50 mt-16 py-6 text-center text-sm text-slate-600 dark:text-slate-400 shadow-lg">
        <p className="font-medium">
          Discrete Structures Group Assignment - Logic Puzzle Implementation
        </p>
        <p className="text-xs mt-1 text-slate-500 dark:text-slate-500">
          Built with Next.js 16, React 19, TypeScript & Formal Logic
        </p>
      </footer>

      {/* Help Dialog */}
      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </div>
  );
}
