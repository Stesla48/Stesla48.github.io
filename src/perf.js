// Device capability detection used to lighten effects on phones / low-power devices.
export function getPerfProfile() {
  if (typeof window === 'undefined') return { low: false, reduced: false }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = window.matchMedia('(max-width: 768px)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency || 4
  const mem = navigator.deviceMemory || 4
  const low = small || coarse || cores <= 4 || mem <= 4
  return { low, reduced }
}
