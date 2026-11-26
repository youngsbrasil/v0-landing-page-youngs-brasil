import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Página suspensa | Young's Brasil",
  description: "Entre em contato com o suporte Young's Brasil ou verifique se o pagamento está em dia.",
  robots: { index: false, follow: false },
}

export default function PaginaSuspensa() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f7f4] px-5 py-12 text-[#171914]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-36 size-96 rounded-full bg-[#39ff14]/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-28 size-96 rounded-full bg-[#39ff14]/10 blur-3xl" />

      <section className="relative w-full max-w-xl rounded-3xl border border-black/[0.07] bg-white p-8 shadow-[0_24px_80px_-36px_rgba(20,25,14,0.25)] sm:p-12">
        <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-[#39ff14]/20">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-7 text-[#20231c]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4m0 4h.01" />
            <path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          </svg>
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#68705f]">Young&apos;s Brasil</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Página suspensa</h1>
        <p className="mt-4 text-base leading-7 text-[#555b50] sm:text-lg">
          Esta página está temporariamente indisponível. Entre em contato com o suporte ou verifique se o pagamento está em dia.
        </p>

        <div className="mt-8 rounded-2xl border border-[#e8ebe4] bg-[#fafbf9] p-5">
          <p className="text-sm font-medium text-[#68705f]">Precisa de ajuda?</p>
          <Link
            href="mailto:suporte@youngsbrasil.com.br"
            className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-[#20231c] underline decoration-[#39b91e] decoration-2 underline-offset-4 transition-colors hover:text-[#388c25] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#318e20]"
          >
            suporte@youngsbrasil.com.br
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
