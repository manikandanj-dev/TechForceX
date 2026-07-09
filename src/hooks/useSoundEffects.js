import { useCallback, useRef } from 'react'

/**
 * Plays a single tone using the Web Audio API.
 * @param {AudioContext} ctx
 * @param {{ frequency: number, duration?: number, type?: OscillatorType, startTime?: number, gain?: number }} options
 */
function playTone(ctx, { frequency, duration = 0.15, type = 'sine', startTime = 0, gain = 0.15 }) {
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + startTime)
  gainNode.gain.setValueAtTime(gain, ctx.currentTime + startTime)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration)

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)
  oscillator.start(ctx.currentTime + startTime)
  oscillator.stop(ctx.currentTime + startTime + duration)
}

/**
 * Lightweight, dependency-free sound effects generated with the Web Audio
 * API (no audio files to load). Returns no-ops when `enabled` is false or
 * the browser has no Web Audio support.
 * @param {boolean} enabled
 */
export function useSoundEffects(enabled = true) {
  const ctxRef = useRef(null)

  const getContext = useCallback(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return null
    if (!ctxRef.current) {
      ctxRef.current = new AudioContextClass()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playFlip = useCallback(() => {
    if (!enabled) return
    const ctx = getContext()
    if (!ctx) return
    playTone(ctx, { frequency: 520, duration: 0.1, type: 'triangle', gain: 0.12 })
  }, [enabled, getContext])

  const playMatch = useCallback(() => {
    if (!enabled) return
    const ctx = getContext()
    if (!ctx) return
    playTone(ctx, { frequency: 660, duration: 0.15, type: 'sine', gain: 0.15 })
    playTone(ctx, { frequency: 880, duration: 0.2, startTime: 0.08, type: 'sine', gain: 0.15 })
  }, [enabled, getContext])

  const playMismatch = useCallback(() => {
    if (!enabled) return
    const ctx = getContext()
    if (!ctx) return
    playTone(ctx, { frequency: 180, duration: 0.22, type: 'sawtooth', gain: 0.1 })
  }, [enabled, getContext])

  const playWin = useCallback(() => {
    if (!enabled) return
    const ctx = getContext()
    if (!ctx) return
    const notes = [523, 659, 784, 1047]
    notes.forEach((frequency, index) => {
      playTone(ctx, {
        frequency,
        duration: 0.25,
        startTime: index * 0.12,
        type: 'sine',
        gain: 0.14,
      })
    })
  }, [enabled, getContext])

  return { playFlip, playMatch, playMismatch, playWin }
}

export default useSoundEffects
