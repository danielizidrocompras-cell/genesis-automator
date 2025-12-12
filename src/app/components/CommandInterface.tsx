"use client"

import { useState } from "react"
import { Zap, BookOpen, ShoppingBag, Sparkles, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BusinessType } from "../page"

interface CommandInterfaceProps {
  onStartBuild: (type: BusinessType, customPrompt?: string) => void
}

export function CommandInterface({ onStartBuild }: CommandInterfaceProps) {
  const [customCommand, setCustomCommand] = useState("")

  const quickOptions = [
    {
      id: "affiliate" as BusinessType,
      icon: Zap,
      title: "Criar Funil de Afiliado",
      description: "Página de pré-venda + criativos prontos",
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: "ebook" as BusinessType,
      icon: BookOpen,
      title: "Criar Meu Próprio Ebook/PLR",
      description: "Conteúdo do livro + capa + página de vendas",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: "dropshipping" as BusinessType,
      icon: ShoppingBag,
      title: "Criar Loja de Drop",
      description: "Descrição do produto + página de aterrissagem",
      gradient: "from-green-500 to-emerald-600"
    }
  ]

  const handleCustomBuild = () => {
    if (customCommand.trim()) {
      onStartBuild("ebook", customCommand)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-purple-300">A IA constrói 90% do negócio. Você faz os 10% finais.</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          O que vamos construir hoje?
        </h1>
        <p className="text-xl text-slate-400">
          Dê um comando e a IA fabrica seu negócio digital completo
        </p>
      </div>

      {/* Custom Command Input */}
      <div className="w-full max-w-2xl mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Digite seu comando personalizado... (ex: 'Criar um curso de yoga online')"
            value={customCommand}
            onChange={(e) => setCustomCommand(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomBuild()}
            className="h-14 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 pr-32 text-lg"
          />
          <Button
            onClick={handleCustomBuild}
            disabled={!customCommand.trim()}
            className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Fabricar
          </Button>
        </div>
      </div>

      {/* Quick Options */}
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Opções Rápidas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickOptions.map((option) => {
            const Icon = option.icon
            return (
              <div
                key={option.id}
                className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => onStartBuild(option.id)}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${option.gradient} mb-4`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                <p className="text-slate-400 mb-6">{option.description}</p>

                {/* Action Button */}
                <Button 
                  className={`w-full bg-gradient-to-r ${option.gradient} hover:opacity-90 text-white font-semibold`}
                >
                  <Gem className="h-4 w-4 mr-2" />
                  Fabricar Negócio (5 💎)
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-sm">
          Cada fabricação custa <span className="text-amber-400 font-semibold">5 créditos</span> e gera um negócio completo pronto para vender
        </p>
      </div>
    </div>
  )
}
