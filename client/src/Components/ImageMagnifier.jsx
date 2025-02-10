import React from "react";
import ReactImageMagnify from "react-image-magnify";

const ImageMagnifier = ({ imageUrl }) => {
  return (
    <div className="image-magnifier">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Product Image",
            isFluidWidth: true,
            src: imageUrl,
          },
          largeImage: {
            src: imageUrl,
            width: 1200, // Adjust large image width
            height: 800, // Adjust large image height
          },
          enlargedImageContainerDimensions: {
            width: "150%",
            height: "150%",
          },
        }}
      />
    </div>
  );
};

export default ImageMagnifier;
