import type { Metadata } from "next";
import Link from "next/link";
import { mock } from "@/lib/mock/store";
import { ChatClient } from "./chat-client";

export const metadata: Metadata = { title: "အကူအညီ", robots: { index: false } };

export default async function ChatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-teal px-4 py-2.5 text-white">
        <Link href={`/s/${slug}`} aria-label="ဆိုင်သို့ ပြန်သွားရန်" className="flex h-11 w-11 flex-none items-center justify-center text-xl">←</Link>
        <div className="min-w-0">
          <h1 className="text-base leading-snug break-words">{mock.shop.name} အကူအညီ</h1>
          <p className="text-[0.8125rem] opacity-90">AI လက်ထောက် · ၂၄ နာရီ</p>
        </div>
      </header>
      <ChatClient />
    </div>
  );
}
