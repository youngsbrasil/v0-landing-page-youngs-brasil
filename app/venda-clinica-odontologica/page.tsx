import type { Metadata } from "next"
import ClinicaSalePage from "./clinica-sale-page"

export const metadata: Metadata = {
  title: "Clínica Odontológica Completa à Venda em Santo André - SP",
  description:
    "Vendo clínica odontológica completa em Santo André - SP: 3 salas equipadas, 8 vagas de estacionamento, carteira com +6 mil clientes ativos e faturamento garantido. Fale com Anderson Youngs.",
  openGraph: {
    title: "Clínica Odontológica Completa à Venda em Santo André - SP",
    description:
      "3 salas equipadas, 8 vagas de estacionamento, +6 mil clientes ativos e faturamento garantido. É entrar já trabalhando.",
    images: [{ url: "/images/clinica/clinica-01.jpeg" }],
    type: "website",
    locale: "pt_BR",
  },
}

export default function Page() {
  return <ClinicaSalePage />
}
