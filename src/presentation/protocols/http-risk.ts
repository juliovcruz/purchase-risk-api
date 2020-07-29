export interface HttpResponseRisk {
  statusCode: number
  body: {
    id: string
    score: number
  }
}
