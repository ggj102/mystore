import { cookies } from "next/headers";

export const getCookies = () => {
  const getCookie = cookies().get("accessToken");

  if (!getCookie) return false;
  else return `${getCookie?.name}=${getCookie?.value}`;
};
