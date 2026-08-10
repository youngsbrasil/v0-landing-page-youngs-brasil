import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Young's Brasil | Growth Marketing, Automação & IA, Vendas & CRM",
  description:
    "Escalamos negócios com Growth Marketing, Automação & IA e Vendas & CRM. Estratégia, dados e performance aplicados ao crescimento real.",
  keywords: [
    "growth marketing",
    "growth hacking",
    "automação de marketing",
    "automação de vendas",
    "inteligência artificial para negócios",
    "automação com ia",
    "vendas e crm",
    "gestão de crm",
    "revenue operations",
    "revops",
    "performance marketing",
    "gestão de tráfego",
    "tráfego pago",
    "google ads",
    "meta ads",
    "facebook ads",
    "instagram ads",
    "geração de leads",
    "qualificação de leads",
    "funil de vendas",
    "otimização de funil",
    "cro conversão",
    "conversão de leads",
    "marketing orientado a dados",
    "data driven marketing",
    "análise de dados de marketing",
    "automação comercial",
    "chatbots inteligentes",
  ],
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://www.youngsbrasil.com.br"),
  openGraph: {
    title: "Young's Brasil | Growth Marketing, Automação & IA, Vendas & CRM",
    description:
      "Escalamos negócios com Growth Marketing, Automação & IA e Vendas & CRM. Estratégia, dados e performance aplicados ao crescimento real.",
    url: "https://www.youngsbrasil.com.br",
    siteName: "Young's Brasil",
    images: [
      {
        url: "/images/chatgpt-20image-2016-20de-20dez.png",
        width: 1456,
        height: 816,
        alt: "Young's Brasil - Growth Marketing, Automação & IA, Vendas & CRM",
      },
    ],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Young's Brasil | Growth Marketing, Automação & IA, Vendas & CRM",
    description:
      "Escalamos negócios com Growth Marketing, Automação & IA e Vendas & CRM. Estratégia, dados e performance aplicados ao crescimento real.",
    images: ["/images/chatgpt-20image-2016-20de-20dez.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-7515S9W1P6" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7515S9W1P6');
          `}
        </Script>
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
