import request from 'supertest'
import app from '../config/app'

describe('TransactionRisk Routes', () => {
  test('Should return HttpResponseRisk on success', async () => {
    await request(app)
      .post('/risk')
      .send([{
        id: 'any_id',
        value: 10,
        paid_at: 'any_date',
        ip_location: 'RJ/BR',
        card_hold_name: 'any_card_hold_name',
        customer: {
          id: 'any_id',
          name: 'any_name',
          birth_date: 'any_birth_date',
          state: 'RJ/BR',
          phone: '24 99999-9999'
        }
      }])
      .expect(200)
  })
})
