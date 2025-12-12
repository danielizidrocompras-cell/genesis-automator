import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

// Produtos configurados
const PRODUCTS = {
  starter: {
    name: 'Pack Starter',
    price: 1990, // R$ 19,90 em centavos
    credits: 25,
  },
  pro: {
    name: 'Pro',
    price: 4990, // R$ 49,90 em centavos
    credits: 50,
  },
}

export async function POST(request: NextRequest) {
  try {
    const { packageId, userId } = await request.json()

    if (!packageId || !userId) {
      return NextResponse.json(
        { error: 'Package ID e User ID são obrigatórios' },
        { status: 400 }
      )
    }

    const product = PRODUCTS[packageId as keyof typeof PRODUCTS]

    if (!product) {
      return NextResponse.json(
        { error: 'Pacote inválido' },
        { status: 400 }
      )
    }

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: product.name,
              description: `${product.credits} créditos para Genesis Automator`,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}?canceled=true`,
      metadata: {
        userId,
        packageId,
        credits: product.credits.toString(),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Erro ao criar checkout:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}
