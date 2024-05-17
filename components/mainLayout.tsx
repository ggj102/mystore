"use client";

import { useAppDispatch } from "@/src/adaptter/redux/hooks";
import { initUserAction } from "@/src/adaptter/redux/reducer/userReducer";
import axios from "axios";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get("http://localhost:3005/testUserInfo").then((res: any) => {
      dispatch(initUserAction(res.data));
    });
  }, []);

  return <div>{children}</div>;
}
