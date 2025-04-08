import React, { useRef } from "react";
import Slider from "react-slick";
import "../style/Banner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../assets/img/img9.gif";
import img2 from "../assets/img/img10.gif";
import img3 from "../assets/img/img11.gif";
import img4 from "../assets/img/img8.gif";

const images = [img1, img2, img3, img4];

function Banner() {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
    };

    const goToSlide = (index) => {
        sliderRef.current?.slickGoTo(index);
    };

    return (
        <div className="banner-wrapper">
            <Slider {...settings} ref={sliderRef}>
                {images.map((img, idx) => (
                    <div className="banner-item" key={idx}>
                        <img src={img} alt={`배너 ${idx + 1}`} />
                    </div>
                ))}
            </Slider>

            {/* ✅ 슬라이드 안쪽 하단 썸네일 네비게이션 */}
            <div className="thumbnail-nav">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`썸네일 ${idx + 1}`}
                        onMouseEnter={() => goToSlide(idx)}
                        className="thumbnail"
                    />
                ))}
            </div>
        </div>
    );
}

export default Banner;
