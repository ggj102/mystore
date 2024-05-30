import ViewInUp from "@/components/animation/viewInUp";

import userStyle from "@styles/pages/user.module.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={userStyle.user_layout}>
      <div>
        <ViewInUp once={true}>
          <h3>마이 페이지</h3>
        </ViewInUp>
        {children}
      </div>
    </div>
  );
}
