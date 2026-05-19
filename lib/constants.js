export const TWEAK_DEFAULTS = {
  goldTone: "#D4AF37",
  buttonStyle: "solid",
  corners: "rounded",
  density: "regular",
  displayFont: "Plus Jakarta Sans",
  showGrain: true,
  shadowOffset: 8,
  gameMode: true,
}

export const GOLD_OPTIONS = ["#D4AF37", "#E8B923", "#C9A227", "#F5C97A"]

export const goldShadow = (t, mult = 1) =>
  `${t.shadowOffset * mult}px ${t.shadowOffset * mult}px 0 0 ${t.goldTone}`

export const goldShadowStacked = (t) =>
  `${t.shadowOffset}px ${t.shadowOffset}px 0 0 ${t.goldTone}, ${t.shadowOffset * 2}px ${t.shadowOffset * 2}px 0 0 rgba(0,0,0,.85)`
