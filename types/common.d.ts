interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface PriceDataType {
  price: number;
  delivery: number;
}

interface SearchParmarsProps {
  [key: string]: string | undefined;
}

interface SelectOption {
  value: string;
  label: string;
}

type SelectOptionType = SingleValue<SelectOption>;

interface ProductType {
  id: number;
  name: string;
  description: string;
  defaultPrice: number;
  price: number;
  discount: number;
  image_path: string;
  category: string;
  popularity: number;
  time_sale?: string;
  release_date: string;
  is_issue: Boolean;
  is_event: Boolean;
}

interface ProductDetailType {
  id: number;
  image_path: string;
  sub_image_path: string[];
  product_detail_image_path: string[];
  domestic: string;
  delivery_type: string;
  delivery_price: string;
}

interface ProductOptionType {
  option_id: number;
  item_id: number;
  name: string;
  option_price: number;
}

interface ProductDetailData extends ProductType {
  product_detail: ProductDetailType;
  product_option: ProductOptionType[];
}

interface CartInfoType {
  user_id: number;
  item_id: number;
  option_id: number;
  count: number;
}

interface CartItemType extends ProductType {
  product_detail: ProductDetailType;
  product_option: ProductOptionType;
  cart_info: CartInfoType;
  isChecked?: boolean;
}

interface OrderItemType extends CartItemType {
  cart_info: { count: number };
}

interface UserType {
  id: number;
  user_id: string;
  name: string;
  email: string;
  phone_prefix: string;
  phone_start: string;
  phone_end: string;
  zone_code: string;
  address: string;
  detail_address: string;
}

interface UserDeliveryType {
  id: number;
  user_id: number;
  name?: string;
  is_default: boolean;
  recipient: string;
  phone_prefix: string;
  phone_start: string;
  phone_end: string;
  zone_code: string;
  address: string;
  detail_address?: string;
  direct_message?: string;
}

interface OrderCompleteType {
  id: number;
  user_id: number;
  order_name: string;
  recipient: string;
  phone: string;
  delivery_address: string;
  delivery_message?: string;
  total_payment_price: number;
  total_delivery_price?: number;
  created_at: string;
  updated_at: string;
  payment_key: string;
  payment_method: string;
}

interface OrderCompleteItemType {
  order_id: number;
  item_id: number;
  option_id: number;
  item_name: string;
  item_option: string;
  image_path: string;
  payment_price: number;
  count: number;
}

interface UserOrderData extends OrderCompleteType {
  order_name: string;
  image_path: string;
  remain: number;
}
