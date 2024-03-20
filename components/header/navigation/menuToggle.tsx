import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";

import menuToggle from "@styles/components/munuToggle.module.scss";

const Path = (props: any) => (
  <path
    fill="transparent"
    strokeWidth="3"
    stroke="#000"
    strokeLinecap="round"
    {...props}
  />
);

export default function MenuToggle({ isNavOpen, toggle }: any) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations: any = isNavOpen
      ? [
          [
            "nav",
            { transform: "translateX(0%)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 },
          ],
          [
            "li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
        ]
      : [
          [
            "li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" },
          ],
          ["nav", { transform: "translateX(-100%)" }, { at: "-0.1" }],
        ];

    animate([
      [
        "path.top",
        { d: isNavOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" },
      ],
      ["path.middle", { opacity: isNavOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isNavOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" },
      ],
      ...menuAnimations,
    ]);
  }, [isNavOpen]);

  return (
    <div ref={scope} className={menuToggle.menu_toggle_container}>
      <button onClick={toggle}>
        <svg width="23" height="18" viewBox="0 0 23 18">
          <Path
            d="M 2 2.5 L 20 2.5"
            className="top"
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
          <Path
            d="M 2 16.346 L 20 16.346"
            className="bottom"
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </button>
    </div>
  );
}
