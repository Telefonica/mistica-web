# Prompt 06 — Skin-specific screen: Vivo dashboard

Build a home/dashboard screen for a Vivo (Brazil) mobile web app using `@telefonica/mistica`.

Requirements:

- Use the Vivo New skin with Brazilian Portuguese locale (`pt-BR`, region code `BR`)
- Set the correct Vivo font family on the body
- Set the body background color from `skinVars`
- Top navigation bar with sections: "Início", "Planos", "Suporte"
- A usage summary section showing data consumed (e.g. "12 GB de 30 GB")
- A carousel of recommended plan cards
- No hardcoded colors — all colors from `skinVars`
- No raw `<div>` for layout — use Mistica layout components

Produce a single self-contained `.tsx` file named `VivoDashboard.tsx`.
