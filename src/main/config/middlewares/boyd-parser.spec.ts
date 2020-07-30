import app from '../app'
import request from 'supertest'

describe('BodyParser Middlewware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Test' })
      .expect({ name: 'Test' })
  })
})
