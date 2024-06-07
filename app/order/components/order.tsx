"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { priceFormatter } from "@/utils/priceFormatter";
import { paymentAction } from "./orderActions";
import { orderYupSchema } from "./yupSchema";

import DeliveryAddressInfo from "./deliveryAddressForm";
import OrderPrdList from "./orderPrdList";
import PaymentInfo from "./paymentInfo";
import Payment from "./payment";

import orderStyle from "@styles/pages/order/order.module.scss";

// import { itemRemoveAction } from "./orderActions";

export default function Order({ deliveryData, orderItem, priceData }: any) {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_API_KEY;
  const customerKey = process.env.NEXT_PUBLIC_TOSS_SECRET_API_KEY;

  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance>();

  const [isAgreement, setIsAgreement] = useState(true);

  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const widgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  const setForm = (data: any) => {
    const phone_prefix = {
      value: `${data.phone_prefix}`,
      label: `${data.phone_prefix}`,
    };

    return {
      name: data.name || "",
      recipient: data.recipient,
      address: data.address,
      zone_code: data.zone_code,
      detail_address: data.detail_address || "",
      phone_prefix,
      phone_start: data.phone_start,
      phone_end: data.phone_end,
      direct_message: data.direct_message || "",
    };
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(orderYupSchema),
    mode: "onChange",
    defaultValues: {
      ...setForm(deliveryData[0]),
      delivery_option: {
        value: "0",
        label: `${deliveryData[0].recipient} (${
          deliveryData[0].name || deliveryData[0].recipient
        })`,
      },
    },
  });

  const onChangeOption = (option: any) => {
    const index = Number(option.value);
    const data = setForm(deliveryData[index]);

    reset(data);

    setValue("delivery_option", option);
  };

  const onSubmit = async (formData: any) => {
    if (!isAgreement || !isValid) return;

    let isConfirm = true;

    if (!formData.detail_address) {
      isConfirm = confirm("상세주소를 입력하지 않았습니다.\n진행하시겠습니까?");
    }

    if (!isConfirm) return;

    const length = orderItem.length > 1 ? ` 외 ${orderItem.length - 1}건` : "";
    const order_name = `${orderItem[0].name}${length}`;
    const paymentMethod = widgetRef.current?.getSelectedPaymentMethod();
    const payment_method = paymentMethod?.easyPay
      ? paymentMethod?.easyPay?.provider
      : paymentMethod?.method;

    const name = formData.name || formData.recipient;
    const recipient = `${formData.recipient}(${name})`;
    const delivery_address = `${formData.address} ${formData.detail_address} (${formData.zone_code}) `;
    const prefix = formData.phone_prefix.value;
    const phone = `${prefix}-${formData.phone_start}-${formData.phone_end}`;

    const bodyData = {
      order_name,
      payment_method,
      recipient,
      delivery_address,
      phone,
      delivery_message: formData.direct_message,
    };

    try {
      await paymentAction(orderId, bodyData);
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: order_name,
        successUrl: `http://localhost:3005/order/success?order_id=${orderId}`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (err) {
      tokenExpiredErrorMessage(err);
    }
  };

  useEffect(() => {
    loadPaymentWidget(clientKey, customerKey).then((widget) => {
      setPaymentWidget(widget);
    });
  }, []);

  return (
    <div className={orderStyle.order_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={orderStyle.title_bar}>
          <div>MY STORE</div>
          <h3>주문/결제</h3>
        </div>
        <DeliveryAddressInfo
          control={control}
          deliveryData={deliveryData}
          setValue={setValue}
          onChangeOption={onChangeOption}
        />
        <OrderPrdList
          orderItem={orderItem}
          deliveryPrice={priceData.delivery}
          // onClickItemRemove={onClickItemRemove}
        />
        <PaymentInfo priceData={priceData} />
        <Payment
          widgetRef={widgetRef}
          paymentWidget={paymentWidget}
          priceData={priceData}
          setIsAgreement={setIsAgreement}
        />
        <div className={orderStyle.payment_button}>
          <div>주문 내용을 확인하였으며 약관에 동의합니다.</div>
          <button type="submit" disabled={!isValid || !isAgreement}>
            {priceFormatter(priceData.price + priceData.delivery)}원 결제하기
          </button>
        </div>
      </form>
    </div>
  );
}

// const onClickItemRemove = async (index: number) => {
//   const isConfirm = confirm("주문에서 제외 하시겠습니까?");

//   if (isConfirm) {
//     const { id, order_id, product_option } = orderItem[index];

//     const item = {
//       order_id,
//       item_id: id,
//       option_id: product_option.option_id,
//     };

//     try {
//       await itemRemoveAction(item);

//       const list = orderItem.filter((val: any, idx: number) => idx !== index);
//       setOrderList(list);
//     } catch (err) {
//       tokenExpiredErrorMessage(err);
//     }
//   }
// };
