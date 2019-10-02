const { diskStorage } = require('multer')
const path = require('path')
const destination = path.resolve(__dirname, '..', '..', 'uploads')

module.exports = {
  storage: diskStorage({
    destination,
    filename: (req, { originalname }, cb) => {
      const ext = path.extname(originalname)
      const name = path.basename(originalname, ext)

      cb(null, `${name}-${Date.now()}${ext}`)
    }
  })
}