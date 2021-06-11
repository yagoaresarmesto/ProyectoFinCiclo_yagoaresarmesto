import React from "react";
import ReactPlayer from "react-player/lazy"; //El video
import CarouselScreenshots from "../CarouselScreenshots";
import moment from "moment"; //Para la fecha
import "moment/locale/es";

export default function InfoProduct(props) {
    const {product}= props;
    
  return (
    <div className="info-game">
    <ReactPlayer
        className="info-game__video"
        url={product.video}
        controls={true}
      />
       <CarouselScreenshots title={product.title} screenshots={product.screenshots} />
       <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html:product.summary }} />

        <div className="info-game__content-date">
          <h4>Fecha de producción</h4>
          <p>{moment(product.releaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
}
