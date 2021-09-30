import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadSurveysController } from '@/presentation/controllers/login/login/survey/load-survey/load-surveys-controller'
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-survey/db-load-surveys'

export const makeLoadSurveyController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
