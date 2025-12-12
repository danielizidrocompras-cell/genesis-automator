import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis do Supabase não configuradas');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
  credits: number;
  created_at: string;
  updated_at: string;
}

export async function getUserCredits(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('users')
    .select('credits')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data?.credits || 0;
}

export async function deductCredits(userId: string, amount: number): Promise<number> {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      credits: supabase.raw(`credits - ${amount}`),
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select('credits')
    .single();

  if (error) throw error;
  return data?.credits || 0;
}

export async function addCredits(userId: string, amount: number): Promise<number> {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      credits: supabase.raw(`credits + ${amount}`),
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select('credits')
    .single();

  if (error) throw error;
  return data?.credits || 0;
}
