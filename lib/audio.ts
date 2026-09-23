export function playTone(enabled: boolean, type: "click" | "success" | "print" | "coin" | "fail" = "click") {
  if (!enabled || typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const now = ctx.currentTime;

    const configs: Record<string, { freqs: number[]; dur: number; wave: OscillatorType }> = {
      click: { freqs: [880], dur: 0.06, wave: "square" },
      success: { freqs: [523, 659, 784], dur: 0.28, wave: "sine" },
      print: { freqs: [120, 180, 140], dur: 0.35, wave: "sawtooth" },
      coin: { freqs: [988, 1319], dur: 0.2, wave: "triangle" },
      fail: { freqs: [220, 165], dur: 0.25, wave: "sawtooth" },
    };

    const cfg = configs[type];
    cfg.freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = cfg.wave;
      osc.frequency.value = freq;
      const t = now + i * (cfg.dur / cfg.freqs.length);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + cfg.dur / cfg.freqs.length);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + cfg.dur / cfg.freqs.length + 0.02);
    });

    setTimeout(() => void ctx.close(), 600);
  } catch {
    // audio not available
  }
}

export function randomSerial(): string {
  const block = () =>
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("");
  const letter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${letter()}${letter()} ${block()} ${block()} ${letter()}`;
}
