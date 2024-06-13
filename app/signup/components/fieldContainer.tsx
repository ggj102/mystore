import SignupStyle from "@styles/pages/signup.module.scss";

export default function FieldContainer({
  fieldName,
  children,
}: {
  fieldName: string;
  children: React.ReactNode;
}) {
  return (
    <div className={SignupStyle.field_container}>
      <div>{fieldName}</div>
      {children}
    </div>
  );
}
