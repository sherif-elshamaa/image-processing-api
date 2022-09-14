import { query } from 'express-validator'

const imageQueryValidator = () => [
  query('filename').exists().withMessage('filename is required'),
  query('width')
    .exists()
    .withMessage('width is required')
    .isInt()
    .withMessage('width must be number'),
  query('height')
    .exists()
    .withMessage('height is required')
    .isInt()
    .withMessage('height must be number')
]

const imagePreviewValidator = () => [query('filename').exists().withMessage('filename is required')]
export { imageQueryValidator, imagePreviewValidator }
