import React from "react";
import Slider from "react-slick";

function Slick () {
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };
    return (
        <div className="slider-container">
          <Slider {...setting}>
            
          </Slider>
        </div>
      );
    }
    
    export default Slick;
