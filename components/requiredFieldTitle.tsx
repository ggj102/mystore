import requiredFieldTitleStyle from "@styles/components/requiredFieldTitle.module.scss";

export default function RequiredFieldTitle({ title }: { title: string }) {
  return (
    <div className={requiredFieldTitleStyle.required_field_title_container}>
      <p>{title}</p>
      <div />
    </div>
  );
}
