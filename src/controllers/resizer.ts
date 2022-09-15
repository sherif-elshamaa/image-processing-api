import sharp from 'sharp'

const resizer = async (
  filePath: string,
  width: string,
  height: string,
  convertPath: string
): Promise<boolean | string> => {
  try {
    await sharp(filePath).resize(Number(width), Number(height)).toFile(convertPath)
    return true
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }
    return false
  }
}

export default resizer
