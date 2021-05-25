import { AccountModel } from '../../../../domain/models/account'

export const map = (account: any): AccountModel => {
  const { _id, ...accountWithId } = account
  return Object.assign({}, accountWithId, { id: _id })
}
