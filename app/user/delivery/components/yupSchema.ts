import * as yup from "yup";

export const deliveryFormYupSchema = yup.object().shape({
  recipient: yup.string().required("이름을 입력해주세요."),
  address: yup
    .object()
    .shape({
      full_address: yup.string().required("주소를 입력해주세요."),
      zone_code: yup.string().required("주소를 입력해주세요."),
    })
    .test("address-validation", "주소를 입력해주세요.", (values) => {
      const { full_address, zone_code } = values;

      if (full_address && zone_code) return true;
      else return false;
    }),
  detail_address: yup.string().required("상세주소를 입력해주세요."),
  phone: yup
    .object()
    .shape({
      first: yup.string(),
      middle: yup.string(),
      last: yup.string(),
    })
    .test(
      "phone-validation",
      "유효하지 않은 연락처 입니다.",
      function (values) {
        const { first, middle, last } = values;
        if (!first || !middle || !last) {
          return this.createError({ message: "연락처를 입력해주세요." });
        }
        if (middle.length < 3 || last.length < 4) {
          return this.createError({ message: "유효하지 않은 연락처 입니다." });
        }
        return true;
      }
    ),
});
