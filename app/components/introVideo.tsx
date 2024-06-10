import Link from "next/link";

import { priceFormatter } from "@/utils/priceFormatter";

import ViewInUp from "@/components/animation/viewInUp";

import introVideoStyle from "@styles/pages/home/introVideo.module.scss";

export default function IntroVideo({ list }: any) {
  return (
    <div className={introVideoStyle.intro_video_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>
            <div>함께 나누고 싶은 특별함</div>
            <p>영상 속 화제의 제품을 소개합니다</p>
          </h3>
        </ViewInUp>
        <div className={introVideoStyle.video_container}>
          <div className={introVideoStyle.iframe}>
            <div>
              <iframe
                src="https://www.youtube.com/embed/CRjgjBs1MeY?autoplay=1&loop=1&playlist=CRjgjBs1MeY&controls=0&mute=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
          <ul>
            {list.map((val: any, idx: number) => {
              return (
                <li key={idx}>
                  <Link
                    href={`/productDetail/${val.id}`}
                    className={introVideoStyle.item_img}
                  >
                    <img src={val.image_path} alt="item" />
                  </Link>
                  <div className={introVideoStyle.item_info}>
                    <Link
                      href={`/productDetail/${val.id}`}
                      className={introVideoStyle.item_name}
                    >
                      {val.name}
                    </Link>
                    <span className={introVideoStyle.item_discription}>
                      {val.description}
                    </span>
                    <span
                      className={introVideoStyle.item_price}
                    >{`${priceFormatter(val.defaultPrice)}원`}</span>
                    <div>
                      <span
                        className={introVideoStyle.item_sale}
                      >{`${val.discount}%`}</span>
                      <span className={introVideoStyle.item_saleprice}>
                        {`${priceFormatter(val.price)}원`}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
