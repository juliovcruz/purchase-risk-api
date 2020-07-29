interface RiskBody {
  id: string
  score: number
}

export interface HttpResponseRisk {
  statusCode: number
  body: RiskBody[]
}
