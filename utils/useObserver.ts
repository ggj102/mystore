"use client";

import { useEffect, useState } from "react";

export default function useObserver(targetRef: any) {
  const [observeWidth, setObserveWidth] = useState<number>(0);
  const [observeHeight, setObserveHeight] = useState<number>(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // 요소의 크기 변화가 감지되면 콘솔에 출력

        setObserveWidth(entry.contentRect.width);
        setObserveHeight(entry.contentRect.height);
      }
    });

    // div 요소를 관찰 대상으로 추가
    if (targetRef) {
      resizeObserver.observe(targetRef.current);
    }

    // 컴포넌트 언마운트 시 ResizeObserver 해제
    return () => {
      resizeObserver.disconnect();
    };
  }, [targetRef]);

  return { observeWidth, observeHeight };
}
