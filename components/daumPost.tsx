import { useDaumPostcodePopup } from "react-daum-postcode";

export default function DaumPostcode({
  isDisabled,
  setAddress,
}: {
  isDisabled: boolean;
  setAddress: (address: string, zone_code: string) => void;
}) {
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress, data.zonecode);
  };

  const handleClick = () => {
    const width = 500;
    const height = 500;
    const left =
      ((window.innerWidth || document.documentElement.clientWidth) - width) / 2;
    const top =
      ((window.innerHeight || document.documentElement.clientHeight) - height) /
      2;

    open({
      popupTitle: "주소검색",
      width,
      height,
      top,
      left,
      popupKey: "postcode",
      onComplete: handleComplete,
    });
  };

  return (
    <button type="button" onClick={handleClick} disabled={isDisabled}>
      주소찾기
    </button>
  );
}
