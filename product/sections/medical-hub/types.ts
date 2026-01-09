export type RecoveryStage = 'Stage 1' | 'Stage 2' | 'Stage 3'
export type CompressionLevel = 'Media' | 'Alta' | 'Ultra-Alta'
export type ClosureType = 'Cierre Lateral' | 'Broches' | 'Cierre Perineal'

export interface MedicalProduct {
  id: string
  title: string
  price: number
  image: string
  stage: RecoveryStage
  compression: CompressionLevel
  bestFor?: string[] // e.g., ["BBL", "Lipo 360"]
  features: string[]
  isBestSeller?: boolean
}

export interface MedicalHubData {
  products: MedicalProduct[]
  recoveryTimeline: {
    stage: string
    weeks: string
    description: string
  }[]
}
