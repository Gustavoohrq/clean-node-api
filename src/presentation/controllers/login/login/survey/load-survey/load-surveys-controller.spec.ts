import { LoadSurveysController } from './load-surveys-controller'
import MockDate from 'mockdate'
import { SurveyModel, LoadSurveys } from './load-survey-controller-protocols'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveyStub: LoadSurveys
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveyStub)
  return {
    sut, loadSurveyStub
  }
}

describe('LoadSurveys', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  test('Should call LoadSuveys', async () => {
    const { sut, loadSurveyStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
