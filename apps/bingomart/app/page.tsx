import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 p-6">
      <div>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-deep font-display font-bold text-saffron">Bm</span>
        <h1 className="mt-4 text-3xl text-deep">BingoMart</h1>
        <p className="mt-2 text-soft">အော်ဒါ၊ ငွေပေးချေမှုနှင့် ပို့ဆောင်ရေးကို တစ်နေရာတည်းမှာ စီမံပါ။</p>
      </div>
      <div className="flex flex-col gap-3">
        <Link href="/seller/signup" className="btn btn-primary">ဆိုင်ဖွင့်မည်</Link>
        <Link href="/seller/login" className="btn btn-ghost">ဝင်ရောက်မည်</Link>
      </div>
    </main>
  );
}
