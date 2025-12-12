"use client"

import { Sparkles, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  credits: number
  onBuyCredits: () => void
}

export function Header({ credits, onBuyCredits }: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Genesis Automator</h1>
              <p className="text-xs text-slate-400">Fabrique seu império digital</p>
            </div>
          </div>

          {/* Credits Badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 px-4 py-2">
              <Gem className="h-5 w-5 text-amber-400" />
              <span className="font-bold text-amber-400">{credits}</span>
              <span className="text-sm text-amber-300">créditos</span>
            </div>
            
            <Button 
              onClick={onBuyCredits}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
            >
              Comprar Créditos
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
