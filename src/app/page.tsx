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
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Play } from "lucide-react";
import { CLUES } from "@/types/puzzle";
import { SolverVisualization } from "@/components/SolverVisualization";
import { ManualSolver } from "@/components/ManualSolver";
import { HelpDialog } from "@/components/HelpDialog";

export default function Home() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Programming Language Puzzle
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Discrete Structures - Logic Puzzle Solver
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowHelp(true)}>
              <BookOpen className="mr-2 h-4 w-4" />
              Help
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Puzzle 1: The Programming Language Challenge
            </CardTitle>
            <CardDescription>
              Five students participate in a programming competition. Each uses
              a unique programming language and solves different types of
              problems. Can you figure out who uses which language and what
              problems they solve?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Students</h4>
                <div className="space-y-1">
                  {["Alice", "Bob", "Charlie", "Dave", "Eve"].map((s) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Languages</h4>
                <div className="space-y-1">
                  {["Python", "Java", "C++", "Ruby", "Swift"].map((l) => (
                    <Badge key={l} variant="secondary">
                      {l}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="col-span-2 md:col-span-3">
                <h4 className="font-semibold mb-2">Problem Types</h4>
                <div className="flex flex-wrap gap-2">
                  {["Math", "Logic", "Sorting", "Graph"].map((p) => (
                    <Badge key={p} variant="default">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clues Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Clues</CardTitle>
            <CardDescription>
              Use these 10 clues to deduce the solution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {CLUES.map((clue) => (
                <div
                  key={clue.id}
                  className="flex gap-3 p-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {clue.id}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    {clue.text}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Solver */}
        <Card>
          <CardHeader>
            <CardTitle>Solve the Puzzle</CardTitle>
            <CardDescription>
              Choose your approach: watch the AI solver work step-by-step, or
              try solving it yourself manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="auto" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="auto" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Auto Solver
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex items-center gap-2">
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
      <footer className="border-t mt-16 py-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          Discrete Structures Group Assignment - Logic Puzzle Implementation
        </p>
      </footer>

      {/* Help Dialog */}
      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </div>
  );
}
