import { memo } from "react";

function ShaderDividerComponent() {
  return (
    <div
      className="shader-divider border-y border-[#252c35]"
      style={{
        height: "2px",
        width: "100%",
        background: "linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.0) 10%, rgba(0, 212, 255, 0.4) 30%, rgba(0, 212, 255, 0.6) 50%, rgba(0, 212, 255, 0.4) 70%, rgba(0, 212, 255, 0.0) 90%, transparent 100%)",
        boxShadow: "0 0 12px rgba(0, 212, 255, 0.3), 0 0 24px rgba(0, 212, 255, 0.1)",
        border: "none",
      }}
    />
  );
}

const ShaderDivider = memo(ShaderDividerComponent);
ShaderDivider.displayName = "ShaderDivider";

export default ShaderDivider;
