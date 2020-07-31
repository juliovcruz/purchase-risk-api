export class InvalidParamError extends Error {
  constructor (param: string, id: string) {
    super(`Invalid param: ${param} in ID ${id}`)
    this.name = 'InvalidParamError'
  }
}

export class MissingParamError extends Error {
  constructor (param: string, id: string) {
    super(`Missing param: ${param} in ID: ${id}`)
    this.name = 'MissingParamError'
  }
}

export class ServerError extends Error {
  constructor () {
    super('Internal Server Error')
    this.name = 'ServerError'
  }
}
