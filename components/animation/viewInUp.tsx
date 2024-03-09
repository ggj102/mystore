import { motion } from "framer-motion";

import viewInUpStyles from "@styles/components/animation/viewInUp.module.scss";

export default function ViewInUp({
  children,
  delay,
  amount,
  once,
  ...props
}: {
  children: React.ReactNode;
  delay?: string;
  amount?: number | "all" | "some";
  once?: boolean;
}) {
  const boxVariants = {
    offscreen: {
      animationName: "",
      animationDelay: delay,
      opcity: 0,
    },
    onscreen: {
      animationName: "fadeInUp",
      animationDelay: delay,
      opcity: 1,
    },
  };

  return (
    <motion.div
      className={`${viewInUpStyles.view_in_up} animate__animated`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount, once }}
      variants={boxVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}
