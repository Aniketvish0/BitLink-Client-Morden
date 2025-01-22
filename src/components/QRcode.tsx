import React, { useEffect, useRef} from "react";
import QRCodeStyling from "qr-code-styling";
import { Download } from "lucide-react";

interface QRCodeProps {
  data: string;
  size?: number; 
  dotsType?: "rounded" | "dots" | "classy" | "classy-rounded" | "square" | "extra-rounded"; 
  cornersSquareType?: "dot" | "square" | "extra-rounded" | "rounded" | "dots" | "classy" | "classy-rounded"; 
  cornersDotType?: "dot" | "square" | "rounded" | "dots" | "classy" | "classy-rounded" | "extra-rounded"; 
  bgColor?: string;
  dotsColor?: string; 
  cornersColor?: string;
  image?: string; 
  imageSize?: number; 
  fileExt?: "png" | "jpeg" | "webp"; 
  className?: string; 
}

const QRCode = ({
  data,
  size = 90,
  dotsType = "square",
  cornersSquareType = "square",
  cornersDotType = "square",
  bgColor = "#ffffff",
  dotsColor = "#000000",
  cornersColor = "#000000",
  image,
  imageSize = 0.4,
  fileExt = "png",
  className,
}:QRCodeProps) => {
  const qrCode = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: size,
      height: size,
      data,
      dotsOptions: {
        color: dotsColor,
        type: dotsType,
      },
      cornersSquareOptions: {
        color: cornersColor,
        type: cornersSquareType,
      },
      cornersDotOptions: {
        color: cornersColor,
        type: cornersDotType,
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        hideBackgroundDots: true,
        imageSize,
      },
      image,
    });

    if (containerRef.current) {
      qrCode.current.append(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    qrCode.current?.update({
      data,
      dotsOptions: {
        color: dotsColor,
        type: dotsType,
      },
      cornersSquareOptions: {
        color: cornersColor,
        type: cornersSquareType,
      },
      cornersDotOptions: {
        color: cornersColor,
        type: cornersDotType,
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize,
      },
      image,
    });
  }, [data, dotsColor, dotsType, cornersColor, cornersSquareType, cornersDotType, bgColor, image, imageSize]);

  const handleDownload = () => {
    qrCode.current?.download({
      extension: fileExt,
    });
  };

  return (
    <div className={`items-center ${className}`}>
      <div ref={containerRef} />
      <button
        onClick={handleDownload}
        className="mt-2 text-white rounded hover:text-blue-500"
      >
        <Download/>
      </button>
    </div>
  );
};

export default QRCode;
