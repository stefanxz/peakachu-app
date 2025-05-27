import React from "react";

type IframeEmbedProps = {
  src: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  className?: string;
};
const IframeEmbed = ({
  src,
  width,
  title,
  height,
  className,
}: IframeEmbedProps) => {
  return (
    <>
      <div className={className}>
        <iframe
          src={src}
          width={width || "100%"}
          height={height || "500px"}
          title={title || "Embedded Content"}
          className="border:0"
          allowFullScreen
        />
      </div>
    </>
  );
};

export default IframeEmbed;
