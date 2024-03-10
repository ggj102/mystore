"use client";

import { useEffect, useState } from "react";
import { RiTimerFlashLine } from "react-icons/ri";

import timerStyles from "@styles/components/timer.module.scss";

export default function Timer({ limitDate }: { limitDate: string }) {
  const [limitTime, setLimitTime] = useState<number>(-1);

  const initTimer = () => {
    const deadline = `${limitDate}T00:00:00+09:00`;
    const currentTime = new Date();
    const endTime = new Date(deadline);
    const timeDifference: number = endTime.getTime() - currentTime.getTime();

    if (timeDifference <= 0) setLimitTime(0);
    else setLimitTime(Math.floor(timeDifference));
  };

  const timerFormatter = () => {
    const days = Math.floor(limitTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (limitTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((limitTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((limitTime % (1000 * 60)) / 1000);

    return `${days}일 ${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} 남음`;
  };

  useEffect(() => initTimer(), []);
  useEffect(() => {
    if (limitTime > 0) {
      setTimeout(() => {
        setLimitTime((prev) => prev - 1000);
      }, 1000);
    }
  }, [limitTime]);

  return (
    <div
      className={timerStyles.timer_container}
      style={{ opacity: limitTime === -1 ? 0 : 1 }}
    >
      <RiTimerFlashLine size={20} />
      <span>{limitTime <= 0 ? "종료" : timerFormatter()}</span>
    </div>
  );
}
