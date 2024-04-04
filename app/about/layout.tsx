"use client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HudEmail } from "@/components/hud-ui";
import { useScrollDirection } from "@/components/hud-ui/hooks";
import { isMobile } from "react-device-detect";
import { cn } from "@/lib/utils";
import { useHudState } from "@/components/hud-ui/hud-state-context";
import HUDN, { EventHandlers } from "@/components/hud-nav-system";

type Props = {
  quote: React.ReactNode;
  children: React.ReactNode;
};

export default function InitializingLayout({ quote, children }: Props) {
  const {
    showNavigation,
    setShowNavigation,
    openEmail,
    setOpenEmail,
    eventHandlers,
  } = useHudState();
  const [initialized, setInitialized] = useState(false);

  useScrollDirection(showNavigation, setShowNavigation, 100, initialized);

  useLayoutEffect(() => {
    setShowNavigation(false);
  }, [setShowNavigation]);

  return (
    <div
      className={cn(
        "overflow-hidden",
        isMobile
          ? "h-[calc(100svh)] w-[calc(100svw)]"
          : "w-[calc(100vw)] h-[calc(100vh)]"
      )}
    >
      <div
        className={cn(
          "bg-black hud-border ease relative flex justify-center overflow-x-hidden text-center duration-500 ease-cubic",
          showNavigation
            ? isMobile
              ? "h-[calc(100svh-129px)]"
              : "h-[calc(100vh-129px)]"
            : isMobile
            ? "h-[calc(100svh-39px)]"
            : "h-[calc(100vh-39px)]"
        )}
      >
        <div className="w-full h-full">
          <AnimatePresence mode="wait">
            {initialized ? (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
              >
                <Link href="/">
                  <Image
                    id="img001"
                    src="/images/001-Down_Hands.png"
                    alt=""
                    width={250}
                    height={250}
                    className="
            ease absolute top-0 z-20 m-2 w-40 opacity-25 invert duration-500 ease-cubic
            hover:animate-shake-slow hover:opacity-75 max-md:right-0 max-md:w-20
          "
                  />
                </Link>
                {children}
              </motion.div>
            ) : (
              <motion.div
                key="initQuote"
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
                onClick={() => setInitialized(true)}
              >
                {quote}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 100, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
            className="hud-border max-md:align-center bottom-0 flex h-[75px] items-center justify-between text-center max-md:flex-wrap max-md:justify-center max-md:overflow-hidden max-md:p-4"
          >
            <HudNav eventHandlers={eventHandlers} />
          </motion.div>
        )}
      </AnimatePresence>
      <HudEmail
        open={{
          state: openEmail,
          set: setOpenEmail as Dispatch<SetStateAction<boolean>>,
        }}
      />
    </div>
  );
}

const HudNav = ({ eventHandlers }: { eventHandlers: EventHandlers }) => {
  return (
    <>
      <HUDN.container eventHandlers={eventHandlers}>
        <HUDN.btn
          labels={[{ breakpoint: 850, text: "About" }]}
          defaultLabel="About Me"
          route="/about"
          sites={[
            {
              title: "Github",
              route: "https://github.com/Zerosfragile",
            },
            {
              title: "More",
              route: "/about",
            },
          ]}
          className="max-md:hidden"
        />
        <HUDN.btn
          defaultLabel="Projects"
          route="/projects"
          sites={[
            {
              title: "Ascii-Hud",
              route: "https://fragileservices.com",
            },
            {
              title: "Inspiration Vault",
              route: "/vault",
            },
            // {
            //   title: "Playground",
            //   route: "/Projects/playground",
            // },
            {
              title: "More",
              route: "/projects",
            },
          ]}
        />
        <HUDN.btn
          defaultLabel="Resume"
          route="/about/resume"
          sites={[
            {
              title: "PDF View",
              route: "/about/resume/pdf",
            },
            {
              title: "More",
              route: "/about/resume",
            },
          ]}
        />
        <HUDN.btn
          prefix={{
            breakpoint: 1100,
            text: "04 // ",
          }}
          defaultLabel="Contact"
          route="/contact"
          sites={[
            {
              title: "Email",
              event: "showEmail",
            },
            {
              title: "Github",
              route: "https://github.com/zerofcs",
            },
            {
              title: "Linkedin",
              route: "https://www.linkedin.com/in/marcus-lim-b6a721260/",
            },
            {
              title: "More",
              route: "/contact",
            },
          ]}
          className="md:hidden"
        />
      </HUDN.container>
      <HUDN.container eventHandlers={eventHandlers} className="max-md:hidden">
        <HUDN.btn
          prefix={{
            breakpoint: 1100,
            text: "04 // ",
          }}
          defaultLabel="Contact"
          route="/contact"
          sites={[
            {
              title: "Email",
              event: "showEmail",
            },
            {
              title: "Github",
              route: "https://github.com/zerofcs",
            },
            {
              title: "Linkedin",
              route: "https://www.linkedin.com/in/marcus-lim-b6a721260/",
            },
            {
              title: "More",
              route: "/contact",
            },
          ]}
          className="max-md:hidden"
        />
        <HUDN.btn
          prefix={{
            breakpoint: 1100,
            text: "05 // ",
          }}
          defaultLabel="Refresh"
          event="refresh"
          sites={[]}
          className="max-md:hidden"
        />
      </HUDN.container>
    </>
  );
};
