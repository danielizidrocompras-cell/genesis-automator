import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY não configurada");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateBusinessContent(businessType: string, customPrompt?: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompts: Record<string, string> = {
    affiliate: `Crie um funil de afiliado completo para um produto digital. Inclua:
    1. Nome do produto (criativo e chamativo)
    2. Headline principal (persuasiva)
    3. 3 benefícios principais
    4. Call-to-action
    5. 3 textos para anúncios no Facebook/Instagram
    6. Sequência de 3 emails de follow-up
    
    Retorne em formato JSON com as chaves: productName, headline, benefits (array), cta, adTexts (array), emailSequence (array com subject e body)`,
    
    ebook: `Crie um ebook PLR completo sobre desenvolvimento pessoal. Inclua:
    1. Título do ebook (impactante)
    2. Subtítulo
    3. Estrutura de capítulos (5 capítulos com títulos)
    4. Headline para página de vendas
    5. Descrição persuasiva (3 parágrafos)
    6. 3 benefícios principais
    7. Preço sugerido
    8. 3 textos para anúncios
    
    Retorne em formato JSON com as chaves: title, subtitle, chapters (array), salesHeadline, description, benefits (array), price, adTexts (array)`,
    
    dropshipping: `Crie uma loja de dropshipping para um produto de nicho. Inclua:
    1. Nome do produto
    2. Categoria/nicho
    3. Descrição do produto (persuasiva, 3 parágrafos)
    4. 5 características principais
    5. Preço sugerido
    6. Headline da landing page
    7. 3 textos para anúncios
    8. 3 objeções comuns e respostas
    
    Retorne em formato JSON com as chaves: productName, category, description, features (array), price, headline, adTexts (array), objections (array com objection e response)`
  };

  const prompt = customPrompt || prompts[businessType] || prompts.ebook;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Tentar extrair JSON do texto
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Se não encontrar JSON, retornar texto bruto
    return { content: text };
  } catch (error) {
    console.error("Erro ao gerar conteúdo com Gemini:", error);
    throw new Error("Falha ao gerar conteúdo");
  }
}
