import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAcount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../erros'
import { badRequest, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAcount: AddAcount

  constructor (emailValidator: EmailValidator, addAcount: AddAcount) {
    this.emailValidator = emailValidator
    this.addAcount = addAcount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = this.addAcount.add({
        name,
        email,
        password
      })
      return {
        statusCode: 200,
        body: account
      }
    } catch (error) {
      return serverError()
    }
  }
}
