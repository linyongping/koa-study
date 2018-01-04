const Koa = require("koa");
const koaBodyParser = require("koa-body-parser");
const fs = require("fs");
const Router = require("koa-router");
const open = require("open");

const app = new Koa();

let home = new Router();
home
  .get("/ai", async ctx => {
    ctx.body = "home page";
  })
  .get("/todo", async ctx => {
    ctx.body = "home todo";
  });

let page = new Router();
page
  .get("/ic", async ctx => {
    ctx.cookies.set("name", "sean", {
      domain: "localhost", // 写cookie所在的域名
      path: "/index", // 写cookie所在的路径
      maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
      expires: new Date("2018-12-31"), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    });
    ctx.body = "ic home";
  })
  .get("/card", async ctx => {
    console.log('ctx', ctx)
    ctx.body = "ic card" + ctx.headers['user-agent'];
  });

const router = new Router();
router.use("/home", home.routes(), home.allowedMethods());
router.use("/page", page.routes(), page.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(2999, () => {
  console.log("koa is runinng on port 2999");
  open("http://localhost:2999");
});

const render = page => {
  let pageUrl = `./page/${page}`;
  return new Promise((resolve, reject) => {
    fs.readFile(pageUrl, "binary", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
