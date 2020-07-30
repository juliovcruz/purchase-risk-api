import request from 'supertest'
import app from '../app'

describe('Cors Middleware', () => {
  test('Should enable cors', () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    request(app)
      .get('/test_cors')
      .expect('acess-control-allow-origin', '*')
      .expect('acess-control-allow-methods', '*')
      .expect('acess-control-allow-headers', '*')
  })
})
