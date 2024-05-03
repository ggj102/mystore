"use client";

import Select from "react-select";

export default function CustomSelect({ options, ...props }: any) {
  return <Select isSearchable={false} options={options} {...props} />;
}
