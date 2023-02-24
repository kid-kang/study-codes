const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

router.get("/", async ctx => {
  ctx.body = `
    <h1>XSS攻击</h1>
    <p>${ctx.request.query.xss}</p>
  `
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(9999, () => console.log('9999端口开启'))

/** 
 * 测试这两个具有xss攻击的url
 * http://127.0.0.1:9999/?xss=<script>alert('收到xss攻击')</script>
 * http://127.0.0.1:9999/?xss=<script>console.log(document.cookie)</script>
**/

