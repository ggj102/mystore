import SignupStyle from "@styles/pages/signup.module.scss";

export default function FieldContainer({ fieldName, children }: any) {
  return (
    <div className={SignupStyle.field}>
      <div>{fieldName}</div>
      {children}
    </div>
  );
}
