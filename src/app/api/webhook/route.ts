import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Erro na verificação do webhook:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Processar evento de pagamento confirmado
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.userId
    const credits = parseInt(session.metadata?.credits || '0')

    if (userId && credits > 0) {
      try {
        // Buscar créditos atuais do usuário
        const { data: user, error: fetchError } = await supabase
          .from('users')
          .select('credits')
          .eq('id', userId)
          .single()

        if (fetchError) {
          console.error('Erro ao buscar usuário:', fetchError)
          return NextResponse.json(
            { error: 'Erro ao buscar usuário' },
            { status: 500 }
          )
        }

        // Adicionar créditos
        const newCredits = (user?.credits || 0) + credits

        const { error: updateError } = await supabase
          .from('users')
          .update({ credits: newCredits })
          .eq('id', userId)

        if (updateError) {
          console.error('Erro ao atualizar créditos:', updateError)
          return NextResponse.json(
            { error: 'Erro ao atualizar créditos' },
            { status: 500 }
          )
        }

        console.log(`✅ ${credits} créditos adicionados ao usuário ${userId}`)
      } catch (error) {
        console.error('Erro ao processar pagamento:', error)
        return NextResponse.json(
          { error: 'Erro ao processar pagamento' },
          { status: 500 }
        )
      }
    }
  }

  return NextResponse.json({ received: true })
}
