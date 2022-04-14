import { supabase } from "./supabase"

export const isNipRegistered = async (nip: number) => {
  const { data, error } = await supabase.from('users').select('*').eq('nip', nip).single()
  if (data && !error) return true
  else return false
}