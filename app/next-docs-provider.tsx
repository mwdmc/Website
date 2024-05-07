"use client"
import Link from "fumadocs-core/link";
import { I18nProvider } from "fumadocs-ui/i18n";
import { DocsLayout } from "fumadocs-ui/layout";
import { RootProvider } from "fumadocs-ui/provider";
import { ReactNode } from "react";
import { docs, other } from "./utils/source";
import { Book, StepBack, Undo2Icon } from 'lucide-react';
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function NextDocsProvider({ children }: { children: ReactNode }) {
    let path = usePathname();
    return (
        <I18nProvider
            locale='cn'
            translations={{
            cn: {
                name: '中文',
                toc: "目錄",
                search: "搜索文檔",
                lastUpdate: "最後更新於",
                searchNoResult: "沒有結果",
            },
        }}>
            <RootProvider>
                <DocsLayout 
                    sidebar={{
                        enabled: (path.startsWith("/docs")) ? true : false,
                        defaultOpenLevel: 0,
                        banner: (
                            <Link
                                href="/"
                                className="mb-4 inline-flex flex-row gap-2 px-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                                <Undo2Icon className="h-5 w-5" /> 返回主頁
                            </Link>
                        ),
                    }}
                    tree={(path.startsWith("/docs")) ? docs.pageTree : other.pageTree}
                    nav={{
                        title: (
                          <>
                            <Image
                              alt="logo"
                              src="https://i.imgur.com/10NgdV5.png"
                              width={35}
                              height={35}
                              className="rounded-full" />
                            <span className="ml-2 text-lg font-bold">多元世界團隊</span>
                          </>
                        )
                    }}
                    links={[
                        {
                          icon: <Book />,
                          url: "/docs",
                          text: "星球文件",
                        },
                        {
                          url: "/blog",
                          text: "星球日記",
                        },
                        {
                          url: "https://status.mwdmc.dev",
                          text: "星球導航",
                          external: true,
                        },
                        {
                          url: "/discord",
                          text: "星球聚集地",
                          external: true,
                        },
                    ]}
                >
                    {children}
                </DocsLayout>
            </RootProvider>
        </I18nProvider>
    );
}