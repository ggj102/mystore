"use client";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import skeletonImageStyle from "@styles/components/skeletonImage.module.scss";

export default function SkeletonImage({ src, ...props }: any) {
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [imagePath, setImagePath] = useState<string>("");

  const onLoadImage = () => {
    setIsLoad(false);
  };

  useEffect(() => {
    setImagePath(src);
  }, [src]);

  return (
    <div className={skeletonImageStyle.skeleton_image_container}>
      {isLoad && (
        <div>
          <Skeleton width={"100%"} style={{ aspectRatio: "1/1" }} />
        </div>
      )}
      <img
        className={isLoad ? "invisible" : ""}
        src={imagePath}
        onLoad={onLoadImage}
        {...props}
      />
    </div>
  );
}
