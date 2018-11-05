const router = require('koa-router')()
const ApiRouter = require('../apis/index.js')

router.use('/api', ApiRouter.routes(), ApiRouter.allowedMethods())

module.exports = router
