"use client"

import { MapContainer, TileLayer, Circle, CircleMarker, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"

/**
 * Posição APROXIMADA (não é o endereço exato).
 * Centro aproximado do bairro Vila Assunção - Santo André - SP.
 */
const APPROX_CENTER: [number, number] = [-23.6558, -46.5268]
const APPROX_RADIUS_METERS = 420

type Poi = {
  label: string
  category: "Hospital" | "Colégio" | "Shopping" | "Trólebus" | "Serviços"
  position: [number, number]
  color: string
}

// Pontos aproximados no entorno (referências de fluxo, não coordenadas exatas)
const POIS: Poi[] = [
  { label: "Hospitais e clínicas médicas", category: "Hospital", position: [-23.6512, -46.523], color: "#ef4444" },
  { label: "Pronto-socorro / laboratórios", category: "Hospital", position: [-23.6598, -46.5225], color: "#ef4444" },
  { label: "Grand Plaza Shopping", category: "Shopping", position: [-23.6535, -46.5338], color: "#8b5cf6" },
  { label: "Shopping ABC", category: "Shopping", position: [-23.6605, -46.5322], color: "#8b5cf6" },
  { label: "Colégios de grande porte", category: "Colégio", position: [-23.6585, -46.5205], color: "#f59e0b" },
  { label: "Escolas e cursos técnicos", category: "Colégio", position: [-23.6505, -46.5312], color: "#f59e0b" },
  { label: "Corredor de trólebus (Av. dos Andradas)", category: "Trólebus", position: [-23.6572, -46.5228], color: "#0ea5e9" },
  { label: "Estação / terminal de ônibus", category: "Serviços", position: [-23.6528, -46.5198], color: "#14b8a6" },
]

const LEGEND: { category: string; color: string }[] = [
  { category: "Hospitais", color: "#ef4444" },
  { category: "Shoppings", color: "#8b5cf6" },
  { category: "Colégios", color: "#f59e0b" },
  { category: "Trólebus", color: "#0ea5e9" },
  { category: "Transporte", color: "#14b8a6" },
]

export default function LocationMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <div className="relative h-[340px] w-full sm:h-[420px]">
        <MapContainer
          center={APPROX_CENTER}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Área aproximada da clínica (não revela endereço exato) */}
          <Circle
            center={APPROX_CENTER}
            radius={APPROX_RADIUS_METERS}
            pathOptions={{
              color: "#0d9488",
              fillColor: "#14b8a6",
              fillOpacity: 0.25,
              weight: 2,
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <span className="font-semibold">Localização aproximada da clínica</span>
            </Tooltip>
          </Circle>

          {/* Pontos de interesse no entorno */}
          {POIS.map((poi, i) => (
            <CircleMarker
              key={i}
              center={poi.position}
              radius={8}
              pathOptions={{
                color: "#ffffff",
                weight: 2,
                fillColor: poi.color,
                fillOpacity: 1,
              }}
            >
              <Tooltip direction="top" offset={[0, -6]} opacity={1}>
                <span className="text-xs font-medium">{poi.label}</span>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 bg-white px-4 py-3">
        {LEGEND.map((l) => (
          <span key={l.category} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
            {l.category}
          </span>
        ))}
        <span className="ml-auto text-[11px] text-slate-400">
          Posição aproximada · para preservar a privacidade do imóvel
        </span>
      </div>
    </div>
  )
}
