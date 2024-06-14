interface NavLinkData {
  id: number;
  name: string;
  link: string;
  children?: NavLinkData[];
}

interface DeliveryFormType {
  zone_code: string;
  address: string;
  detail_address?: string;
  phone_prefix: SelectOptionType;
  phone_start: string;
  phone_end: string;
}

interface SignupYupSchemaType extends DeliveryFormType {
  user_id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
}

interface DeliveryFormYupSchemaType extends DeliveryFormType {
  name?: string;
  direct_message?: string;
  is_default?: boolean;
  recipient: string;
}

interface OrderYupSchemaType extends DeliveryFormType {
  name?: string;
  direct_message?: string;
  recipient: string;
  delivery_option: SelectOptionType;
}
