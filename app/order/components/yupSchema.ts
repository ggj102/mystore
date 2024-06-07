import * as yup from "yup";

export const orderYupSchema = yup.object().shape({
  delivery_option: yup.object(),
  name: yup.string(),
  recipient: yup.string().required(),
  address: yup.string().required(),
  zone_code: yup.string().required(),
  detail_address: yup.string(),
  phone_prefix: yup.object(),
  phone_start: yup.string().required().min(3),
  phone_end: yup.string().required().min(4),
  direct_message: yup.string(),
});
