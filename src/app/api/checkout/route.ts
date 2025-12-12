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
    const { productId, userId } = await request.json()

    // Validar produto
    if (!PRODUCTS[productId as keyof typeof PRODUCTS]) {
      return NextResponse.json(
        { error: 'Produto inválido' },
        { status: 400 }
      )
    }

    const product = PRODUCTS[productId as keyof typeof PRODUCTS]

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
      success_url: `${request.headers.get('origin')}/?success=true`,
      cancel_url: `${request.headers.get('origin')}/?canceled=true`,
      metadata: {
        userId,
        productId,
        credits: product.credits.toString(),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Erro ao criar checkout:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}
