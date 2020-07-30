import app from '../app'
import request from 'supertest'

describe('BodyParser Middlewware', () => {
  test('Should parse body as json', () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
  })
  request(app)
    .post('/test_body_parser')
    .send({ name: 'Test' })
    .expect({ name: 'Test' })
})
