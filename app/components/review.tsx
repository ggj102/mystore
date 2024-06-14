// export default function Review() {
//   return (
//     <div className={homeStyles.review}>
//       <div className="site_wrap">
//         <h3>
//           <div>리뷰</div>
//           <p>고객님들이 직접 작성한 리뷰를 확인해보세요</p>
//         </h3>
//         <ul>
//           {testBestsellerData.map((val) => {
//             return (
//               <li className={homeStyles.list_item} key={val.name}>
//                 <div className={homeStyles.item_img}>
//                   <CustomImage
//                     width="100%"
//                     // height="auto"
//                     src="/images/test/testitem1.jpg"
//                     alt="item"
//                   />
//                 </div>
//                 <div className={homeStyles.item_info}>
//                   <span className={homeStyles.item_name}>{val.name}</span>
//                   <span className={homeStyles.item_discription}>
//                     {val.discription}
//                   </span>
//                   <span
//                     className={homeStyles.item_price}
//                   >{`${val.price}원`}</span>
//                   <div>
//                     <span
//                       className={homeStyles.item_sale}
//                     >{`${val.sale}%`}</span>
//                     <span className={homeStyles.item_saleprice}>
//                       {`${val.saleprice}원`}
//                     </span>
//                   </div>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }
