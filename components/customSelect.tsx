"use client";

import Select from "react-select";

export default function CustomSelect({ options }: any) {
  return (
    <Select isSearchable={false} defaultValue={options[0]} options={options} />
  );
}
