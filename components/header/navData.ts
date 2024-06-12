export const navData = [
  { id: 1, name: "홈", link: "/" },
  {
    id: 2,
    name: "전체상품",
    link: "/allProduct?page=1",
    children: [
      {
        id: 21,
        name: "클렌징",
        link: "/allProduct?category=cleansing&page=1",
      },
      {
        id: 22,
        name: "부스터/토너",
        link: "/allProduct?category=booster_toner&page=1",
      },
      {
        id: 23,
        name: "앰플/에센스",
        link: "/allProduct?category=ampoule_essence&page=1",
      },
      { id: 24, name: "크림", link: "/allProduct?category=cream&page=1" },
      {
        id: 25,
        name: "팩/마스크",
        link: "/allProduct?category=pack_mask&page=1",
      },
      { id: 26, name: "미스트", link: "/allProduct?category=mist&page=1" },
      {
        id: 27,
        name: "선케어",
        link: "/allProduct?category=sun_care&page=1",
      },
      {
        id: 28,
        name: "쿠션/베이스",
        link: "/allProduct?category=cushion_base&page=1",
      },
    ],
  },
  { id: 3, name: "타임특가", link: "/timeSaleProduct?page=1" },
];
