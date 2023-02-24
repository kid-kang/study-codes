import demo from "./log"
import imgsrc from './assets/1.jpg'
import "./scss.scss"

console.log(imgsrc)     //完整路径

demo()

const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img)

const btn = document.querySelector("button")  //懒加载
btn.addEventListener('click', () => {
    //webpackChunkName: 'math',告诉webpack打包生成的文件名为 math
    import(/* webpackChunkName: 'math' */ './math.js').then(res => {
        console.log(res.add(1,2))
    })
})
    
