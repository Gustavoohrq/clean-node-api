export class AccesDeniedError extends Error {
  constructor () {
    super('Acces denied')
    this.name = 'AccesDeniedError'
  }
}
