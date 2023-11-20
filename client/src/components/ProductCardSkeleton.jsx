import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProductCardSkeleton = () => {
  return (
    <div className="bg-gradient-to-r from-slate-100 via-sky-100 to-blue-100">
      <div className="product-card p-4 h-max shadow-lg rounded-2xl border-[2px] border-slate-400">
        <div className="relative mx-5">
          <div className="w-full h-[50%] object-contain">
            <Skeleton height={80} width="100%" count={1} baseColor="#1e3a8a" highlightColor=" #e0f2fe" />
          </div>
        </div>
        <div className="product-details mx-2 mt-2">
          <Skeleton
            height={15}
            width={150}
            style={{ marginBottom: "8px" }}
            count={1}
            baseColor="#1e3a8a" highlightColor=" #e0f2fe"
          />
          <Skeleton height={15} width={120} count={1} baseColor="#1e3a8a" highlightColor=" #e0f2fe" />
          <Skeleton height={15} width={80} count={1} baseColor="#1e3a8a" highlightColor=" #e0f2fe" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
