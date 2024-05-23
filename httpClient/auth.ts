import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:3005", // 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰을 가져와서 요청 헤더에 추가
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.message === "refresh") {
      api.post("/refreshToken").then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
      });

      return;
    } else if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== "/signin"
    ) {
      alert("로그인이 필요한 서비스 입니다.");
      window.location.pathname = "/signin";
    }

    return Promise.reject(error);
  }
);

export default api;
