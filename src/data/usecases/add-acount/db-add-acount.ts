import { AddAcount, AddAcountModel, AccountModel, Encrypter } from './db-add-acount-protocols'

export class DbAddAccount implements AddAcount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAcountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
