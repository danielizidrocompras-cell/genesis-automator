"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  Copy, 
  Check,
  Eye,
  Edit,
  Globe,
  Image as ImageIcon,
  Mail,
  CreditCard,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BusinessType } from "../page"

interface BusinessDashboardProps {
  businessType: BusinessType
  generatedContent: any
  onBack: () => void
}

export function BusinessDashboard({ businessType, generatedContent, onBack }: BusinessDashboardProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState("")

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(id)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  // Usar conteúdo gerado pelo Gemini ou fallback para mock data
  const data = generatedContent || {
    title: "Mente Serena: O Guia Anti-Ansiedade",
    subtitle: "Ebook PLR Completo",
    pageUrl: "genesis.app/v/mente-serena",
    headline: "Pare de Sofrer com Ansiedade Agora",
    coverImage: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=600&fit=crop",
    adImages: [
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1080&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1080&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1515191107209-c28698631303?w=1080&h=1080&fit=crop"
    ]
  }

  // Adaptar dados do Gemini para o formato esperado
  const displayData = {
    title: data.title || data.productName || "Negócio Digital",
    subtitle: data.subtitle || businessType === "ebook" ? "Ebook PLR Completo" : businessType === "affiliate" ? "Funil de Afiliado" : "Loja Drop",
    pageUrl: `genesis.app/v/${(data.title || 'negocio').toLowerCase().replace(/\s+/g, '-')}`,
    headline: data.headline || data.salesHeadline || "Transforme Seu Negócio Hoje",
    coverImage: data.coverImage || "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=600&fit=crop",
    adImages: data.adImages || [
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1080&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1080&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1515191107209-c28698631303?w=1080&h=1080&fit=crop"
    ]
  }

  const adCopies = data.adTexts?.map((text: string, idx: number) => ({
    id: `ad${idx}`,
    platform: idx === 0 ? "Facebook/Instagram" : idx === 1 ? "TikTok" : "Google Ads",
    text
  })) || [
    {
      id: "fb1",
      platform: "Facebook/Instagram",
      text: `🔥 ${displayData.headline}\n\n✅ Método comprovado\n✅ Resultados em 7 dias\n✅ Garantia de 30 dias\n\n👉 Clique e descubra como milhares estão transformando suas vidas!`
    },
    {
      id: "tiktok1",
      platform: "TikTok",
      text: `Você sabia que 90% das pessoas não conhecem esse método? 😱\n\n${displayData.headline}\n\nLink na bio! 🔗`
    }
  ]

  const emailSequence = data.emailSequence?.map((email: any, idx: number) => ({
    id: `email${idx}`,
    subject: email.subject,
    body: email.body
  })) || [
    {
      id: "email1",
      subject: "Você esqueceu algo importante...",
      body: `Olá!\n\nNotei que você visitou nossa página mas não finalizou sua compra.\n\nEu entendo - às vezes precisamos pensar um pouco mais antes de tomar uma decisão importante.\n\nMas quero te lembrar: ${displayData.headline}\n\nE por tempo limitado, você ainda pode garantir com desconto especial.\n\n[LINK DE CHECKOUT]\n\nAté breve!`
    },
    {
      id: "email2",
      subject: "⏰ Última chance - Oferta expira em 24h",
      body: `Oi novamente!\n\nEsta é sua última chance de garantir acesso com desconto.\n\nEm 24 horas, o preço volta ao normal.\n\nNão perca essa oportunidade!\n\n[LINK DE CHECKOUT]`
    },
    {
      id: "email3",
      subject: "🎁 Bônus exclusivo para você",
      body: `Olá!\n\nDecidi fazer algo especial para você.\n\nAlém do produto principal, vou incluir 3 bônus exclusivos se você finalizar hoje:\n\n✅ Bônus 1: [Descrição]\n✅ Bônus 2: [Descrição]\n✅ Bônus 3: [Descrição]\n\nEssa é realmente sua última chance.\n\n[LINK DE CHECKOUT]`
    }
  ]

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-slate-400 hover:text-white mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao início
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{displayData.title}</h1>
            <p className="text-slate-400 text-lg">{displayData.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-semibold">Negócio Ativo</span>
          </div>
        </div>
      </div>

      {/* 3 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLUNA 1: ATIVOS CRIADOS */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Download className="h-5 w-5 text-purple-400" />
              Ativos Criados
            </h2>

            {/* Landing Page Preview */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Página de Vendas</label>
                <div className="relative group">
                  <img
                    src={displayData.coverImage}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-slate-700"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </div>
              </div>

              {/* URL Gerada */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Link Público</label>
                <div className="flex items-center gap-2">
                  <Input
                    value={displayData.pageUrl}
                    readOnly
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleCopy(displayData.pageUrl, "url")}
                  >
                    {copiedItem === "url" ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <Globe className="h-4 w-4 mr-2" />
                  Publicar Página
                </Button>
                <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF do Ebook
                </Button>
              </div>

              {/* Criativos */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Criativos para Anúncios</label>
                <div className="grid grid-cols-3 gap-2">
                  {displayData.adImages.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Criativo ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-slate-700 hover:border-purple-500 transition-colors cursor-pointer"
                    />
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-2 border-slate-700 text-white hover:bg-slate-800">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Baixar Todas as Imagens
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA 2: MARKETING AUTOMÁTICO */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-400" />
              Marketing Automático
            </h2>

            <Tabs defaultValue="ads" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-950">
                <TabsTrigger value="ads">Anúncios</TabsTrigger>
                <TabsTrigger value="emails">E-mails</TabsTrigger>
              </TabsList>

              <TabsContent value="ads" className="space-y-4 mt-4">
                {adCopies.map((ad) => (
                  <div key={ad.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400 font-semibold">{ad.platform}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(ad.text, ad.id)}
                      >
                        {copiedItem === ad.id ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">{ad.text}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="emails" className="space-y-4 mt-4">
                {emailSequence.map((email, idx) => (
                  <div key={email.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400 font-semibold">E-mail {idx + 1}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(email.body, email.id)}
                      >
                        {copiedItem === email.id ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm font-semibold text-white mb-2">{email.subject}</p>
                    <p className="text-xs text-slate-400 line-clamp-3">{email.body}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* COLUNA 3: INTEGRAÇÕES EXTERNAS */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-400" />
              Integrações Externas
            </h2>

            <div className="space-y-6">
              {/* Card 1 - Pagamento */}
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Gateway de Pagamento</h3>
                    <p className="text-xs text-slate-400">Para receber dinheiro, conecte um gateway</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Link de Checkout</label>
                    <Input
                      placeholder="Cole seu link da Kiwify/Kirvano aqui"
                      value={checkoutUrl}
                      onChange={(e) => setCheckoutUrl(e.target.value)}
                      className="bg-slate-950 border-slate-700 text-white text-sm"
                    />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
                    size="sm"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Criar conta na Kiwify (2 min)
                  </Button>
                </div>
              </div>

              {/* Card 2 - Tráfego */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Tráfego Pago</h3>
                    <p className="text-xs text-slate-400">A página está pronta. Agora mande pessoas!</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                    size="sm"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Abrir Meta Ads Manager
                  </Button>

                  <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800">
                    <p className="text-xs text-slate-400 mb-2">💡 Dica Rápida:</p>
                    <p className="text-xs text-slate-300">
                      No gerenciador, use a <span className="text-purple-400 font-semibold">Imagem 1</span> e o <span className="text-purple-400 font-semibold">Texto de Anúncio 1</span> que geramos para você.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Status do Negócio</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Página publicada</span>
                    <span className="text-green-400">✓ Ativo</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Gateway conectado</span>
                    <span className="text-amber-400">⚠ Pendente</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Tráfego ativo</span>
                    <span className="text-slate-500">○ Não iniciado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
