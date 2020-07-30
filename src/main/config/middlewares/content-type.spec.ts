import request from 'supertest'
import app from '../app'

describe('Content Type Middleware', () => {
  test('Should set default content type as json', () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
