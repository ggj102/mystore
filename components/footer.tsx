import Link from "next/link";

import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import footerStyles from "../styles/components/footer.module.scss";

export default function Footer() {
  return (
    <div className={footerStyles.footer_container}>
      <div className="site_wrap">
        <div className={footerStyles.footer_contents}>
          <Link href="" target="_blank">
            MY STORE 명세서
          </Link>
          <Link
            href="https://daisy-cadet-146.notion.site/Web-FE-Developer-0af80019535e4031b411799cdb49fe09"
            target="_blank"
          >
            이력서
          </Link>
          <div>
            <Link href="https://github.com/ggj102" target="_blank">
              <FaGithub size={18} />
            </Link>
            <Link href="https://github.com/ggj102/mystore" target="_blank">
              Client
            </Link>
            /
            <Link
              href="https://github.com/ggj102/mystore-server"
              target="_blank"
            >
              Server
            </Link>
          </div>
          <div>
            <IoMdMail size={18} />
            <Link href="">mail</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
