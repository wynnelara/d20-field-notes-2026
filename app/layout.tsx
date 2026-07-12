import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({ variable:"--font-geist-mono", subsets:["latin"] });
export const metadata: Metadata = { title:"D20 Field Notes｜AI 设计·新应用", description:"面向设计同事的 D20 2026 分论坛现场研究档案与互动洞察索引。" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body className={mono.variable}>{children}</body></html>}
