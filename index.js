const Koa = require('koa');

const app = new Koa()

const index = `
    <h1> this is KOA </h1>
`
app.use( async (ctx) => {
    const url = ctx.url;
    const req_query = ctx.query
    const method = ctx.method
    console.log('koa ctx', ctx)
    ctx.body = index
})

app.listen(3000, () => {
    console.log('koa is runinng')
})