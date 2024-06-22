import type { FooterCategory } from "@/app/components/Footer";
import { AuthorData } from "./app/types";

export const domain = "https://frogcord.xyz";

export const urlBase = new URL(
  process.env.VERCEL_URL
    ? `${domain}`
    : "http://localhost:3000",
);

export const footer: FooterCategory[] = [
  {
    title: "連結",
    items: [
      {
        label: "日記 (部落格)",
        href: "/blog",
      },
      {
        label: "隱私權政策",
        href: "/privacy",
      },
      {
        label: "服務條款",
        href: "/tos",
      },
      {
        label: "版權政策",
        href: "/copyright"
      }
    ],
  },
  {
    title: "支持我們",
    items: [
      {
        label: "GitHub",
        href: "https://github.com/mwdmc",
        newWindow: true,
      },
      {
        label: "Discord",
        href: "https://dc.mwdmc.dev/",
        newWindow: true,
      },
    ],
  },
  {
    title: "其他",
    items: [
      {
        label: "邀請青蛙音樂",
        href: "/invite/frogmusic",
      },
      {
        label: "服務狀態",
        href: "https://status.mwdmc.dev/",
        newWindow: true,
      },
      {
        label: "郵件系統",
        href: "https://mail.mwdmc.dev/",
        newWindow: true,
      }
    ],
  },
];

/**
 * a list of blog file names
 */
export const blogRecommendations = [
  "perks"
];

export const blogAuthors: Record<string, AuthorData> = {
  soldierp: {
    name: "河馬",
    title: "擁有者",
    url: "https://sptw.me",
    image_url: "https://cdn.discordapp.com/avatars/561210753517092884/3b2b4989cfd10f281ce32addf0bf3242.png?size=1024"
  },
  bu: {
    name: "Bu",
    title: "擁有者",
    url: "/404",
    image_url: "https://cdn.discordapp.com/avatars/730325036640239626/f299e0ec60cd580a303dc22f9209d3cd.png?size=1024"
  },
  blockeric: {
    name: "八瑞",
    title: "擁有者",
    url: "/404",
    image_url: "https://cdn.discordapp.com/avatars/678181301609562123/d4ef51c4af80355b9aad8deb695d81ab.png?size=1024"
  },
};