import path from 'node:path/win32'
import resizer from '../../controllers/resizer'
const data = {
  filePath: path.join(process.cwd(), './src/public/images/encenadaport.jpg'),
  width: '500',
  height: '500',
  convertPath: path.join(process.cwd(), './src/public/converted/encenadaport_500_500.jpg')
}

describe('Testing sharp function', () => {
  it('it should work with correct parameters', async () => {
    expect(await resizer(data.filePath, data.width, data.height, data.convertPath)).toBe(true)
  })

  it('it should give error with wrong width parameters', async () => {
    expect(await resizer(data.filePath, 'hello', data.height, data.convertPath)).toBe(
      'Expected positive integer for width but received NaN of type number'
    )
  })

  it('it should give error with wrong height parameters', async () => {
    expect(await resizer(data.filePath, data.width, 'hello', data.convertPath)).toBe(
      'Expected positive integer for height but received NaN of type number'
    )
  })
})
