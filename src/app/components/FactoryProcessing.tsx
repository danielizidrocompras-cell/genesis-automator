"use client"

import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { BusinessType } from "../page"

interface FactoryProcessingProps {
  businessType: BusinessType
}

interface ProcessStep {
  id: string
  label: string
  duration: number
}

export function FactoryProcessing({ businessType }: FactoryProcessingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const steps: ProcessStep[] = [
    { id: "identity", label: "Gerando identidade visual", duration: 800 },
    { id: "copy", label: "Escrevendo copywriting persuasiva", duration: 1000 },
    { id: "page", label: "Compilando página de vendas", duration: 1200 },
    { id: "mobile", label: "Otimizando para mobile", duration: 600 },
    { id: "assets", label: "Criando ativos de marketing", duration: 400 }
  ]

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const processStep = (index: number) => {
      if (index < steps.length) {
        timeout = setTimeout(() => {
          setCompletedSteps(prev => [...prev, steps[index].id])
          setCurrentStep(index + 1)
          processStep(index + 1)
        }, steps[index].duration)
      }
    }

    processStep(0)

    return () => clearTimeout(timeout)
  }, [])

  const getBusinessTitle = () => {
    switch (businessType) {
      case "affiliate":
        return "Funil de Afiliado"
      case "ebook":
        return "Ebook PLR"
      case "dropshipping":
        return "Loja de Drop"
      default:
        return "Negócio Digital"
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-6 animate-pulse">
            <Loader2 className="h-10 w-10 text-white animate-spin" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Fabricando seu {getBusinessTitle()}
          </h2>
          <p className="text-slate-400 text-lg">
            A IA está trabalhando para você. Isso leva apenas alguns segundos...
          </p>
        </div>

        {/* Terminal-like Processing Steps */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id)
              const isCurrent = currentStep === index && !isCompleted

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 transition-all duration-300 ${
                    isCompleted ? "opacity-100" : isCurrent ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    ) : isCurrent ? (
                      <Loader2 className="h-6 w-6 text-purple-500 animate-spin" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-700" />
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-mono text-sm">&gt;</span>
                      <span className={`font-mono text-sm ${
                        isCompleted ? "text-slate-300" : isCurrent ? "text-white" : "text-slate-600"
                      }`}>
                        {step.label}
                      </span>
                      {isCompleted && (
                        <span className="text-green-400 font-mono text-sm ml-auto">OK</span>
                      )}
                      {isCurrent && (
                        <span className="text-purple-400 font-mono text-sm ml-auto animate-pulse">...</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-500 ease-out"
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              />
            </div>
            <p className="text-center text-slate-500 text-sm mt-2">
              {Math.round((completedSteps.length / steps.length) * 100)}% completo
            </p>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            💡 Enquanto isso, saiba que você está economizando semanas de trabalho manual
          </p>
        </div>
      </div>
    </div>
  )
}
