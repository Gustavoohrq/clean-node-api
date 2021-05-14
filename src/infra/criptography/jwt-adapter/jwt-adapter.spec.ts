import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}))

describe('', () => {
  test('Should call sign with correct', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should return on sign success', async () => {
    const sut = new JwtAdapter('secret')
    const accesToken = await sut.encrypt('any_id')
    expect(accesToken).toBe('any_token')
  })
})
