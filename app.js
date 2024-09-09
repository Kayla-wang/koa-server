//引入对应的包
const Koa = require('koa2')
const Router = require('koa-router')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const koaJson = require('koa-json')

const app = new Koa()
const router = new Router()

//prefix 访问路径都变为 ～/apiaa/ 为
router.prefix('/apiaa')

//访问 host/apiaa 返回文字 Hello World
router.get('/', ctx => {
    console.log(ctx)
    ctx.body = 'Hello World'
})

//访问 host/apiaa/api 就将get的参数的name和age返回回去
router.get('/api', ctx => {
    //获取get的参数
    const params = ctx.request.query
    console.log(params.name)
    ctx.body = {
        name: params.name,
        age: params.age
    }
})

//访问 host/apiaa/async 服务器处理2秒后，返回Hello 2s later
router.get('/async', async (ctx) => {
    let result = await new Promise((resolve) => {
        setTimeout(function () {
            resolve('Hello 2s later')
        }, 2000)
    })
    ctx.body = result
})

// post接口，将post的参数再返回给请求
router.post('/post', async (ctx) => {
    let { body } = ctx.request
    console.log(body)
    console.log(ctx.request)
    ctx.body = {
        ...body
    }
})

app.use(koaBody())
app.use(cors())
//get接口，加上&pretty则返回格式化的接口
app.use(koaJson({ pretty: false, param: 'pretty' }))
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
