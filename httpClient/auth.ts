const fetchData = async (path: string, options: any) => {
  const url = `http://localhost:3005${path}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Network response was not ok");
    }

    const data = await response.json();

    if (data.signin) {
      const cookie = response.headers.get("set-cookie");
      return { cookie };
    }

    console.log(data);

    return data;
  } catch (error: any) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message
    );
    throw error;
  }
};

const api = {
  get: async (path: string, options: any = {}) => {
    const requestOptions = {
      ...options,
      method: "GET",
      headers: { ...options.headers },
    };

    return fetchData(path, requestOptions);
  },

  post: async (path: string, data: any, options: any = {}) => {
    const requestOptions = {
      ...options,
      method: "POST",
      headers: { ...options.headers },
      body: JSON.stringify(data),
    };
    return fetchData(path, requestOptions);
  },

  put: async (path: string, data: any, options: any = {}) => {
    const requestOptions = {
      ...options,
      method: "PUT",
      headers: { ...options.headers },
      body: JSON.stringify(data),
    };
    return fetchData(path, requestOptions);
  },

  delete: async (path: string, data: any, options: any = {}) => {
    const requestOptions = {
      ...options,
      method: "DELETE",
      headers: { ...options.headers },
      body: JSON.stringify(data),
    };
    return fetchData(path, requestOptions);
  },
};

export default api;

//===================================================

// import axios from "axios";

// // Axios 인스턴스 생성
// const api = axios.create({
//   baseURL: "http://localhost:3005", // 기본 URL 설정
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     // 로컬 스토리지에서 토큰을 가져와서 요청 헤더에 추가
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.data.message === "refresh") {
//       return api.post("/refreshToken").then((res) => {
//         localStorage.setItem("accessToken", res.data.accessToken);
//         originalRequest.headers[
//           "Authorization"
//         ] = `Bearer ${res.data.accessToken}`;

//         return api.request(originalRequest);
//       });
//     }
//     else if (
//       error.response &&
//       error.response.status === 401 &&
//       window.location.pathname !== "/signin"
//     ) {
//       alert("로그인이 필요한 서비스 입니다.");
//       window.location.pathname = "/signin";
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
