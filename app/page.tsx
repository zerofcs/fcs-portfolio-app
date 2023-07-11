"use client";
import HudNav from "@/components/hud-ui/hudnav";
import Image from "next/image";
import { useState } from "react";
import HudEmail from "@/components/hud-ui/hudemail";
import HudPosts from "@/components/hud-ui/hudposts";

export default function Home() {
  const [openEmail, setOpenEmail] = useState(false);

  const eventHandlers = {
    showEmail: () => {
      console.log(openEmail);
      setOpenEmail((prev) => !prev);
    },
  };

  return (
    <>
      <div className="bg-black hud-border relative h-[calc(100vh-129px)] overflow-x-hidden text-center max-md:h-[calc(100vh-130px-2em)]">
        <HudPosts posts={"projects"} limit={5} />
      </div>
      <div className="hud-border max-md:align-center bottom-0 flex h-[75px] items-center justify-between text-center max-md:h-[calc(calc(75px+2em))] max-md:flex-wrap max-md:justify-center max-md:overflow-hidden max-md:p-4">
        <HudNav eventHandlers={eventHandlers} />
      </div>
      <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
    </>
  );
}
