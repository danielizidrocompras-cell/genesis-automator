import { NextRequest, NextResponse } from 'next/server';
import { generateBusinessContent } from '@/lib/gemini';
import { deductCredits } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { businessType, customPrompt, userId } = await request.json();

    if (!businessType) {
      return NextResponse.json(
        { error: 'Tipo de negócio não especificado' },
        { status: 400 }
      );
    }

    // Deduzir créditos do usuário (5 créditos por geração)
    if (userId) {
      try {
        await deductCredits(userId, 5);
      } catch (error) {
        return NextResponse.json(
          { error: 'Créditos insuficientes ou erro ao deduzir créditos' },
          { status: 402 }
        );
      }
    }

    // Gerar conteúdo com Gemini
    const content = await generateBusinessContent(businessType, customPrompt);

    return NextResponse.json({
      success: true,
      content,
      creditsDeducted: 5
    });

  } catch (error) {
    console.error('Erro na API de geração:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar conteúdo' },
      { status: 500 }
    );
  }
}
