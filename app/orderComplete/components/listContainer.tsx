import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";

export default function ListContainer({
  title,
  data,
  children,
}: {
  title: string;
  data?: any;
  children?: React.ReactNode;
}) {
  return (
    <div className={orderCompleteStyle.list_container}>
      <h3>{title}</h3>
      {children ? (
        children
      ) : (
        <ul className={orderCompleteStyle.default_list}>
          {data.map((val: any, idx: number) => {
            return (
              <li key={idx}>
                <span>{val.listName}</span>
                <div>
                  {val.value.map((val2: string, idx: number) => {
                    return <p key={idx}>{val2}</p>;
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
