import request from 'supertest'
import app from '../app'

describe('Content Type Middleware', () => {
  test('Should set default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
