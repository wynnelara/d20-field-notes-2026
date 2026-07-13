import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title:"D20 Field Notes｜AI 设计·新应用", description:"面向设计同事的 D20 2026 分论坛现场研究档案与互动洞察索引。" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
