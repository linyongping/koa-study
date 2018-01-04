const Koa = require('koa');
const koaBodyParser = require('koa-body-parser');
const fs = require('fs')
const Router = require('koa-router')
const open = require('open')

const app = new Koa()
const router = new Router({ prefix: '/api' })

router.get('/', async(ctx, next) => {
    ctx.body = await render('index.html')
}).get('/todo', async(ctx, next) => {
    ctx.body = await render('todo.html')
})

app.use(router.routes())
    .use(router.allowedMethods())

app.listen(2999, () => {
    console.log('koa is runinng on port 2999')
    open('http://localhost:2999')
})

const render = page => {
    let pageUrl = `./page/${page}`
    return new Promise((resolve, reject) => {
        fs.readFile(pageUrl, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
