"use client"

import { X, Gem, Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

interface CreditModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreditModal({ isOpen, onClose }: CreditModalProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const packages = [
    {
      id: "starter",
      name: "Pack Starter",
      credits: 25,
      price: "R$ 19,90",
      popular: false,
      features: [
        "25 créditos",
        "5 negócios completos",
        "Suporte por e-mail",
        "Válido por 30 dias"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      credits: 50,
      price: "R$ 49,90",
      popular: true,
      features: [
        "50 créditos",
        "10 negócios completos",
        "Suporte prioritário",
        "Válido por 60 dias",
        "Bônus: Templates extras"
      ]
    },
    {
      id: "tycoon",
      name: "Tycoon Pack",
      credits: "∞",
      price: "R$ 97,00/mês",
      popular: false,
      features: [
        "Créditos ilimitados",
        "Negócios ilimitados",
        "Suporte VIP 24/7",
        "Acesso a novos recursos",
        "Consultoria mensal",
        "Cancele quando quiser"
      ]
    }
  ]

  const handlePurchase = async (productId: string) => {
    // Tycoon ainda não implementado (assinatura)
    if (productId === 'tycoon') {
      alert('Plano de assinatura em breve!')
      return
    }

    setLoading(productId)

    try {
      // Chamar API de checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          userId: 'demo-user', // Em produção, pegar do contexto de autenticação
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirecionar para checkout do Stripe
        window.location.href = data.url
      } else {
        throw new Error('Erro ao criar sessão de pagamento')
      }
    } catch (error) {
      console.error('Erro ao processar compra:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-slate-950 border-slate-800 text-white p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white flex items-center gap-3">
              <Gem className="h-8 w-8" />
              Escolha seu Pacote de Créditos
            </DialogTitle>
            <DialogDescription className="text-purple-100 text-lg">
              Cada crédito permite fabricar um negócio digital completo
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Packages */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-slate-900/50 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                  pkg.popular
                    ? "border-purple-500 shadow-lg shadow-purple-500/20"
                    : "border-slate-800"
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      MAIS POPULAR
                    </div>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                    <Gem className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{pkg.price.split(" ")[1]}</span>
                    {pkg.id === "tycoon" && (
                      <span className="text-slate-400 text-sm">/mês</span>
                    )}
                  </div>
                  <div className="mt-2 text-amber-400 font-bold text-lg">
                    {pkg.credits} 💎
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={loading === pkg.id}
                  className={`w-full font-semibold ${
                    pkg.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  {loading === pkg.id ? 'Processando...' : 'Comprar Agora'}
                </Button>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm mb-3">Formas de pagamento aceitas:</p>
            <div className="flex items-center justify-center gap-4 text-slate-500">
              <span className="text-xs">💳 Cartão de Crédito</span>
              <span className="text-xs">•</span>
              <span className="text-xs">🔒 Pagamento Seguro via Stripe</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-sm text-blue-300 text-center">
              💡 <span className="font-semibold">Dica:</span> Com o Pro Pack você economiza mais e pode fabricar 10 negócios completos!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
