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

describe('LoadSurveys', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
  })

  afterAll(async () => {
    MockDate.reset()
  })

  test('Should call LoadSuveys', async () => {
    class LoadSurveysStub implements LoadSurveys {
      async load (): Promise<SurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }
    const loadSurveyStub = new LoadSurveysStub()
    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    const sut = new LoadSurveysController(loadSurveyStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
