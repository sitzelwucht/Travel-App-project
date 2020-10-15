
import 'regenerator-runtime/runtime'

const app = require('./server.js')
const supertest = require('supertest')
const request = supertest(app)


app.get('/test', async (req, res) => {
  res.json({message: 'pass!'})
})
beforeAll(done => {
  done()
})
it('gets the test endpoint', async done => {
  const response = await request.get('/test')
  expect(response.status).toBe(200)
  expect(response.body.message).toBe('pass!')
  done()
})
