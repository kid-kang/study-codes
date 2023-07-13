import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import Banner from "../../components/Banner";
import { useState, useRef } from "react";
import "./index.less";

export default function Works() {
  const [swiperBtn, setSwiperBtn] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
  function changeSwiperBtn(n: number): void {
    if (n === swiperBtn) return;
    setSwiperBtn(n);
    carouselRef.current!.goTo(n);
  }
  return (
    <div className="works__wrap">
      <Banner title="作品介绍" />

      <div className="works">
        <p className="title">更多个人作品展示</p>
        <p className="text">对前端保持好奇心、目的和激情，始终如一</p>
        <div className="swiper__btn">
          <span
            className={swiperBtn === 0 ? "active" : ""}
            onClick={() => changeSwiperBtn(0)}
          >
            博客分享平台
          </span>
          <span
            className={swiperBtn === 1 ? "active" : ""}
            onClick={() => changeSwiperBtn(1)}
          >
            音乐小程序
          </span>
          <span
            className={swiperBtn === 2 ? "active" : ""}
            onClick={() => changeSwiperBtn(2)}
          >
            飞机大战
          </span>
        </div>
        <div className="swiper__wrap">
          <Carousel dots={false} ref={carouselRef}>
            <div className="swiper__item">
              <img style={{width:'75%'}} src="/src/assets/1.png" alt="展示截图" />
              <img style={{width:'75%'}} src="/src/assets/2.png" alt="展示截图" />
              <img style={{width:'75%'}} src="/src/assets/3.png" alt="展示截图" />
              <img style={{width:'75%'}} src="/src/assets/a.png" alt="展示截图" />
              <img style={{width:'75%'}} src="/src/assets/b.png" alt="展示截图" />
              <img style={{width:'75%'}} src="/src/assets/c.png" alt="展示截图" />
              <img style={{width:'75%'}} src="/src/assets/d.png" alt="展示截图" />
            </div>
            <div className="swiper__item music">
              <img style={{width:'25%'}} src="/src/assets/21.png" alt="展示截图" />
              <img style={{width:'25%'}} src="/src/assets/22.png" alt="展示截图" />
              <img style={{width:'25%'}} src="/src/assets/23.png" alt="展示截图" />
              <img style={{width:'25%'}} src="/src/assets/24.png" alt="展示截图" />
              <img style={{width:'25%'}} src="/src/assets/25.png" alt="展示截图" />
              <img style={{width:'25%'}} src="/src/assets/26.png" alt="展示截图" />
            </div>
            <div className="swiper__item">
              <img style={{width:'75%'}} src="/src/assets/7.png" alt="展示截图" />
              <img style={{width:'75%'}} src="/src/assets/8.png" alt="展示截图" />
              <img style={{width:'75%'}} src="/src/assets/9.png" alt="展示截图" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
