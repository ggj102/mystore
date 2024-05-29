export const tokenExpiredErrorMessage = (err: any) => {
  if (err.message === "token expired") {
    alert("로그인이 필요한 서비스 입니다.");

    window.location.pathname = "/signin";
  } else alert(`Error: ${err.message}`);
};
