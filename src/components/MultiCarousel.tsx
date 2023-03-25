import React from "react";
import { Carousel, Button, Image } from "antd";

interface Props {
  data: any;
}

const MultiCarousel = ({ data }: Props) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  return (
    <div className="slider-container">
      <h2>Featured Items</h2>
      <Carousel {...settings}>
        {data.map((item: any, index: number) => (
          <div key={index}>
            <Image preview={false} src={item.imageUrl} />
            <h3>{item.title}</h3>
            <Button type="primary" onClick={()=>{}}>
              Book now
            </Button>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const SampleNextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

export default MultiCarousel;


// const data = [
//   {
//     imageUrl:
//       "https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg",
//     title: "Bangkok",
//   },
//   {
//     imageUrl:
//       "https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg",
//     title: "Paris",
//   },
//   {
//     imageUrl:
//       "https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg",
//     title: "Tokyo",
//   },
//   {
//     imageUrl:
//       "https://www.tripsavvy.com/thmb/4IhtAQ1Bh5Zte05C0iLqwGp3u_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-642551278-5e19f089331d42dbb6b24e938fce1ab5.jpg",
//     title: "New York",
//   },
// ];