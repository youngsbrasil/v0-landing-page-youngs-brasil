// Storage system for diagnosis data - can be easily replaced with database

interface DiagnosticoData {
  sessionId: string
  score: number
  metricas: {
    seguidores: number
    engajamento: number
    posts: number
  }
  pontosFortes: string[]
  pontosFracos: string[]
  recomendacoes: string[]
  createdAt: Date
}

const diagnosticoStore = new Map<string, DiagnosticoData>()

export function saveDiagnostico(data: DiagnosticoData): void {
  diagnosticoStore.set(data.sessionId, {
    ...data,
    createdAt: new Date(),
  })
}

export function getDiagnostico(sessionId: string): DiagnosticoData | null {
  return diagnosticoStore.get(sessionId) || null
}

export function generateSessionId(): string {
  return crypto.randomUUID()
}
