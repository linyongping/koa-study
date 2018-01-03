const Koa = require('koa');
const koaBodyParser = require('koa-body-parser');
const fs = require('fs')
const router = require('koa-router')

const app = new Koa()
const koaRouter = new router() 

koaRouter.get('/', async (ctx, next) => {
    ctx.body = render('index.html')
})

app.use( async ctx => {
    const url = ctx.request.url;
    let html = await route(url)
    ctx.body = html
})

app.listen(3000, () => {
    console.log('koa is runinng')
})

const render = page => {
    let pageUrl = `./page/${page}`
    return new Promise((resolve, reject) => {
        fs.readFile(pageUrl, 'binary', (err, data) => {
            if(err) {
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
}

const route = async url => {
    let page = '404.html'
    switch(url) {
        case '/': page = 'index.html'; break;
        case '/index': page = 'index.html'; break;
        case '/todo': page = 'todo.html'; break;
        case '/404': page = '404.html'; break; 
    }
    let html = await render(page)
    return html
}