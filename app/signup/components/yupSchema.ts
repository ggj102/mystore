import * as yup from "yup";

export const signupYupSchema = yup.object().shape({
  user_id: yup
    .string()
    .required("아이디를 입력해주세요.")
    .min(4, "아이디는 최소 4자 이상이어야 합니다.")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "아이디는 알파벳, 숫자, 밑줄(_)만 포함할 수 있습니다."
    ),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).*$/,
      "비밀번호는 하나 이상의 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요."),
  name: yup.string().required("이름을 입력해주세요."),
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("유효한 이메일을 입력해주세요."),
  phone_prefix: yup.object(),
  phone_start: yup
    .string()
    .required("연락처를 입력해주세요.")
    .min(3, "유효하지 않은 번호 입니다."),
  phone_end: yup
    .string()
    .required("연락처를 입력해주세요.")
    .min(4, "유효하지 않은 번호 입니다."),
  zone_code: yup.string().required().required("주소를 입력해주세요."),
  address: yup.string().required("주소를 입력해주세요."),
  detail_address: yup.string(),
});
