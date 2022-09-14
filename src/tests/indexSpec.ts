import supertest from 'supertest'
import app from '../index'

const req = supertest(app)

describe('Testing endpoints', () => {
  it('get / should response status code 200', async () => {
    const res = await req.get('/')
    expect(res.status).toBe(200)
  })

  it('get /api/convert should response status code 400 and error message', async () => {
    const res = await req.get('/api/convert')
    expect(res.body).toEqual({
      errors: [
        { msg: 'filename is required', param: 'filename', location: 'query' },
        { msg: 'width is required', param: 'width', location: 'query' },
        { msg: 'width must be number', param: 'width', location: 'query' },
        { msg: 'height is required', param: 'height', location: 'query' },
        { msg: 'height must be number', param: 'height', location: 'query' }
      ]
    })
    expect(res.status).toBe(400)
  })

  it('get /api/convert should response status code 400 and error message file not found', async () => {
    const res = await req.get('/api/convert?filename=ssss&width=500&height=500')
    expect(res.body).toEqual({ error: 'ssss: image not found' })
    expect(res.status).toBe(400)
  })

  it('get /api/convert should response status code 400 and error message width must be number', async () => {
    const res = await req.get('/api/convert?filename=fjord&width=hello&height=500')
    expect(res.body).toEqual({
      errors: [{ value: 'hello', msg: 'width must be number', param: 'width', location: 'query' }]
    })
    expect(res.status).toBe(400)
  })

  it('get /api/convert should response status code 400 and error message height must be number', async () => {
    const res = await req.get('/api/convert?filename=fjord&width=500&height=hello')
    expect(res.body).toEqual({
      errors: [{ value: 'hello', msg: 'height must be number', param: 'height', location: 'query' }]
    })
    expect(res.status).toBe(400)
  })

  it('get /api/convert should response status code 200, convert image and show it', async () => {
    const res = await req.get('/api/convert?filename=fjord&width=500&height=500')
    expect(res.status).toBe(200)
  })
})
