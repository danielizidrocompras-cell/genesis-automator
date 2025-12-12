"use client"

import { useState, useEffect } from "react"
import { CommandInterface } from "./components/CommandInterface"
import { FactoryProcessing } from "./components/FactoryProcessing"
import { BusinessDashboard } from "./components/BusinessDashboard"
import { Header } from "./components/Header"
import { CreditModal } from "./components/CreditModal"
import { getUserCredits } from "@/lib/supabase"
import { toast } from "sonner"

export type BusinessType = "affiliate" | "ebook" | "dropshipping" | null

// ID do usuário demo para testes
const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001"

export default function Home() {
  const [credits, setCredits] = useState(15)
  const [stage, setStage] = useState<"command" | "processing" | "dashboard">("command")
  const [businessType, setBusinessType] = useState<BusinessType>(null)
  const [showCreditModal, setShowCreditModal] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Carregar créditos do Supabase ao montar o componente
  useEffect(() => {
    async function loadCredits() {
      try {
        const userCredits = await getUserCredits(DEMO_USER_ID)
        setCredits(userCredits)
      } catch (error) {
        console.error("Erro ao carregar créditos:", error)
      }
    }
    loadCredits()
  }, [])

  // Verificar se houve sucesso no pagamento
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    
    if (success === 'true') {
      toast.success('Pagamento confirmado! Seus créditos foram adicionados. 🎉')
      // Recarregar créditos
      getUserCredits(DEMO_USER_ID).then(setCredits)
      // Limpar URL
      window.history.replaceState({}, '', '/')
    }
  }, [])

  const handleStartBuild = async (type: BusinessType, customPrompt?: string) => {
    if (credits < 5) {
      setShowCreditModal(true)
      return
    }

    setBusinessType(type)
    setStage("processing")
    setIsGenerating(true)

    try {
      // Chamar API para gerar conteúdo com Gemini
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessType: type,
          customPrompt,
          userId: DEMO_USER_ID
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar conteúdo')
      }

      const data = await response.json()
      setGeneratedContent(data.content)
      
      // Atualizar créditos localmente
      setCredits(prev => prev - 5)
      
      // Aguardar um pouco para mostrar o processamento
      setTimeout(() => {
        setStage("dashboard")
        setIsGenerating(false)
      }, 2000)

    } catch (error) {
      console.error("Erro ao fabricar negócio:", error)
      setShowCreditModal(true)
      setStage("command")
      setIsGenerating(false)
    }
  }

  const handleBackToCommand = () => {
    setStage("command")
    setBusinessType(null)
    setGeneratedContent(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header credits={credits} onBuyCredits={() => setShowCreditModal(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {stage === "command" && (
          <CommandInterface onStartBuild={handleStartBuild} />
        )}
        
        {stage === "processing" && (
          <FactoryProcessing businessType={businessType} />
        )}
        
        {stage === "dashboard" && (
          <BusinessDashboard 
            businessType={businessType} 
            generatedContent={generatedContent}
            onBack={handleBackToCommand}
          />
        )}
      </main>

      <CreditModal 
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        userId={DEMO_USER_ID}
      />
    </div>
  )
}
