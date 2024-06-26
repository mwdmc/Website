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
import { RollButton } from "fumadocs-ui/components/roll-button";

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
                {children}
            </RootProvider>
        </I18nProvider>
    );
}
