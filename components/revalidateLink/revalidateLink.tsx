"use client";

import Link from "next/link";
import { revalidateAction } from "./revalidateAction";

export default function RevalidateLink({
  className,
  title,
  href,
  children,
}: {
  className?: string;
  title?: string;
  href: string;
  children: React.ReactNode;
}) {
  const onClickRevalidatePath = async () => revalidateAction(href);

  return (
    <Link
      className={className}
      title={title}
      href={href}
      onClick={onClickRevalidatePath}
    >
      {children}
    </Link>
  );
}
