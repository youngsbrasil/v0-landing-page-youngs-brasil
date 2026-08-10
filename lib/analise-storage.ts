export interface AnaliseData {
  nomeCliente: string
  descricao: string
  analise: any
  dadosOriginais: any[]
  dataGeracao: string
}

const STORAGE_DURATION = 96 * 60 * 60 * 1000

// Armazenamento em memória compartilhado (servidor)
const analysisStore = new Map<string, { data: AnaliseData; createdAt: number }>()

export function salvarAnalise(id: string, data: AnaliseData) {
  console.log("[v0] Salvando análise:", id)

  const storageData = {
    data,
    createdAt: Date.now(),
  }

  // Salvar no Map do servidor
  analysisStore.set(id, storageData)

  console.log("[v0] Análise salva no servidor. Total no cache:", analysisStore.size)

  return storageData
}

export function recuperarAnalise(id: string): AnaliseData | null {
  console.log("[v0] Recuperando análise:", id)
  console.log("[v0] Total de análises no cache:", analysisStore.size)

  // Tentar recuperar do Map primeiro
  const cached = analysisStore.get(id)
  if (cached) {
    console.log("[v0] Análise encontrada no cache do servidor")
    const age = Date.now() - cached.createdAt
    const ageHours = age / (60 * 60 * 1000)

    console.log("[v0] Idade da análise:", ageHours.toFixed(2), "horas")

    if (age < STORAGE_DURATION) {
      console.log("[v0] Análise ainda válida, retornando dados")
      return cached.data
    }

    console.log("[v0] Análise expirada, removendo do cache")
    analysisStore.delete(id)
  } else {
    console.log("[v0] Análise não encontrada no cache do servidor")
  }

  return null
}

export function limparAnalisesExpiradas() {
  const now = Date.now()
  let removidos = 0

  for (const [key, value] of analysisStore.entries()) {
    if (now - value.createdAt > STORAGE_DURATION) {
      analysisStore.delete(key)
      removidos++
    }
  }

  if (removidos > 0) {
    console.log("[v0] Limpeza: removidas", removidos, "análises expiradas")
  }
}

export { STORAGE_DURATION }
