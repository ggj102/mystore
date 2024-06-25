export const tokenExpiredErrorMessage = (message: string) => {
  if (message === "token expired") {
    alert("로그인이 필요한 서비스 입니다.");

    window.location.pathname = "/signin";
  } else alert(message);
};
