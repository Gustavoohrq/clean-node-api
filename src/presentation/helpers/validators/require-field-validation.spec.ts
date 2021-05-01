import { MissingParamError } from '../../erros'
import { RequireFieldValidation } from './required-field-validation'

describe('RequireField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequireFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should not return if validation succeds', () => {
    const sut = new RequireFieldValidation('field')
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
