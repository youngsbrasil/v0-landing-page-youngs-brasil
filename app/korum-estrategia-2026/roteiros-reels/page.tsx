"use client"

import Link from "next/link"
import RoteirosReels from "./roteiros-content"

export default function RoteirosReelsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 p-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/korum-estrategia-2026"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 text-sm uppercase tracking-wider"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            VOLTAR PARA ESTRATEGIA
          </Link>
        </div>
      </div>
      <RoteirosReels />
    </main>
  )
}
