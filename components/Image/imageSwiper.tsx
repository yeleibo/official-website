import React, { useState } from 'react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import type {Swiper as SwiperClass} from "swiper/types";

interface ImageProps{
    images:string[];
}



const ProductGallery: React.FC<ImageProps> = (props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
    const {images} = props;

    return (
        <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
            {/* 主轮播图 */}
            <div className="px-10 sm:px-40">
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs]}
                    className="mb-4"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-96 bg-transparent flex items-center justify-center rounded">
                                {/* 使用 object-contain 确保图片适配容器 */}
                                <img src={image} alt={`Product ${index + 1}`} className="max-h-full max-w-full object-contain" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* 缩略图 */}
            <div className="px-10">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={15}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[Thumbs]}
                    className="cursor-pointer"
                    style={{ height: '6rem' }} // 固定滑块高度
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="size-30 flex items-center justify-center rounded">
                                <img src={image} alt={`Thumbnail ${index + 1}`} className="size-24 object-contain" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductGallery;
