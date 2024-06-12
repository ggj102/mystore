import footerStyles from "../styles/components/footer.module.scss";

export default function Footer() {
  return (
    <div className={footerStyles.footer_container}>
      <div className="site_wrap">
        <div className={footerStyles.footer_contents}>
          MY STORE 명세서 | 이력서 | git | mail
        </div>
      </div>
    </div>
  );
}
