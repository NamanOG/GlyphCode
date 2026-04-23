const processSteps = [
  { num: "01", title: "DISCOVER", desc: "Understanding goals and constraints." },
  { num: "02", title: "DEFINE", desc: "Architecting the technical foundation." },
  { num: "03", title: "DESIGN", desc: "Crafting the visual language." },
  { num: "04", title: "BUILD", desc: "Engineering the platform." },
  { num: "05", title: "SHIP", desc: "Deploying to production." },
];
export default function ProcessStrip() {
  return (
    <div style={{ paddingTop: 80, paddingBottom: 80 }} className="w-full bg-[#080808] border-y border-[#252c35]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-10" style={{ marginBottom: 32 }}>
        <p className="font-courier uppercase" style={{ fontSize: 10, letterSpacing: "0.2em", color: "#00D4FF" }}>
          PROCESS
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className="process-card group"
              style={{
                padding: "28px 20px",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 6,
                background: "rgba(255,255,255,0.02)",
                transition: "border-color 200ms ease, background 200ms ease",
                minHeight: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p className="font-courier" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#00D4FF", marginBottom: 8 }}>
                {step.num}
              </p>
              <p className="font-courier" style={{ fontSize: 13, letterSpacing: "0.08em", color: "#FAFAFA", fontWeight: 700 }}>
                {step.title}
              </p>
              <p style={{ fontSize: 12, marginTop: 8, color: "rgba(255,255,255,0.46)", lineHeight: 1.5 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}