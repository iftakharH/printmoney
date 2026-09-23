export interface PrintStep {
  id: number;
  title: string;
  short: string;
  body: string;
  fact: string;
}

export const PRINT_STEPS: PrintStep[] = [
  {
    id: 1,
    title: "Design & engraving",
    short: "Artists carve the master",
    body: "Every note starts as art: portraits, buildings, and patterns drawn and engraved into steel. Guilloche rosettes — intricate spirograph lines — are mathematically generated to be almost impossible to redraw by hand.",
    fact: "A single banknote can combine work from designers, engravers, and mathematicians.",
  },
  {
    id: 2,
    title: "Master plate making",
    short: "Steel becomes the source of truth",
    body: "Engravings are transferred to master dies, then photomechanically reduced and duplicated onto printing plates. One master becomes thousands of plate copies for high-volume runs.",
    fact: "Plates are serialized, tracked, and destroyed under audit after their life ends.",
  },
  {
    id: 3,
    title: "Offset background",
    short: "Color layers first",
    body: "Background tints, fine line-work, and underprints are laid down by lithographic offset — crisp, flat color at high speed on cotton paper or polymer substrate.",
    fact: "Modern polymer notes (like UK £5+) are cleaner and harder to tear than paper.",
  },
  {
    id: 4,
    title: "Intaglio portrait",
    short: "Raised ink you can feel",
    body: "Intaglio printing forces ink from engraved recesses onto the sheet under enormous pressure. The result: tactile, raised lines on portraits and denominations — a feature casual printers can't fake well.",
    fact: "Run your fingernail across a real note's portrait — that texture is security.",
  },
  {
    id: 5,
    title: "Security features",
    short: "Hidden defenses switch on",
    body: "Watermarks, embedded security threads, holograms, color-shifting ink, microprinting, and UV-reactive fibers are added. Each targets a different counterfeiting shortcut.",
    fact: "Under UV light, some notes glow with patterns invisible under normal light.",
  },
  {
    id: 6,
    title: "Serials & inspection",
    short: "Every note gets an ID",
    body: "Serial numbers, bank identifiers, and check digits are applied. Vision systems scan for defects; humans audit samples. Sheets that fail are destroyed, not discounted.",
    fact: "Sequential serials help central banks track issuance and detect fakes.",
  },
  {
    id: 7,
    title: "Cut, pack, issue",
    short: "From sheet to wallet",
    body: "Sheets are cut into individual notes, counted by machine, bundled, and shipped to banks under tight chain-of-custody. Only then does it enter circulation as legal tender.",
    fact: "Worn notes are returned to central banks and destroyed — often into refuse-derived fuel or compost for polymer.",
  },
];

export interface CounterfeitRound {
  id: string;
  realHints: string[];
  fakeFeature: string;
  fakeExplanation: string;
}

export const COUNTERFEIT_ROUNDS: CounterfeitRound[] = [
  {
    id: "watermark",
    realHints: ["Hold to light: portrait watermark fades in", "Serial numbers are crisp and color-matched"],
    fakeFeature: "Watermark missing",
    fakeExplanation:
      "Fakes often print a 'watermark' as gray ink on the surface. A real watermark is thinner paper density — visible only when light passes through.",
  },
  {
    id: "thread",
    realHints: ["Security thread sits inside the note", "Thread appears as dashed line when held to light"],
    fakeFeature: "Thread painted on top",
    fakeExplanation:
      "Real security threads are embedded during paper/polymer making. Painted lines flake, sit on the surface, and don't align with transmitted light.",
  },
  {
    id: "colorshift",
    realHints: ["Denomination numeral shifts color when tilted", "Shifting is smooth, not sticky sparkles"],
    fakeFeature: "No color shift on tilt",
    fakeExplanation:
      "Color-shifting ink (OVI) changes hue with viewing angle. Counterfeits use ordinary ink or glitter that doesn't shift cleanly.",
  },
];
