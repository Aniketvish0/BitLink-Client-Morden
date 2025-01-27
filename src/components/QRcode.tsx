import { useEffect, useRef, useState} from "react";
import QRCodeStyling, { FileExtension } from "qr-code-styling";
import { LucideDownload } from "lucide-react";

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
  className,
}:QRCodeProps) => {
  const qrCode = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fileExt , setFileExt] = useState("png");
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
    if (containerRef.current) {
      qrCode.current?.append(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [data,size, dotsColor, dotsType, cornersColor, cornersSquareType, cornersDotType, bgColor, image, imageSize]);

  const handleDownload = (fileExt : string) => {
    qrCode.current?.download({
      extension: fileExt as FileExtension,
    });
  };

  return (
    <div className={`${className} flex items-center flex-col`}>
      <div ref={containerRef} className=""/>
      <div className="mt-4 flex justify-around sm:w-full gap-2 "> 
        <select
          name="select-file-ext"
          id="select-file-ext"
          onChange={(e) => setFileExt(e.target.value)}
          className="dark:bg-[#1c1f26] rounded-sm px-4 text-sm py-1 dark:text-white outline-none "
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="svg">SVG</option>
          <option value="webp">WEBP</option>
        </select>
        <button
          onClick={() => handleDownload(fileExt)}
          className=""
        >
          <LucideDownload size={18} className="hover:text-blue-500"/>
        </button>
      </div>
    </div>
  );
};

export default QRCode;
