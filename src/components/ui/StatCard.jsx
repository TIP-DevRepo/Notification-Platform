import { theme, font } from "../../theme";

export const StatCard = ({ label, value, sub, accent }) => (
  <div
    style={{
      background: theme.surface,
      border: `1px solid ${theme.border}`,
      borderRadius: 10,
      padding: "20px 24px",
    }}
  >
    <p
      style={{
        fontSize: 12,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: theme.textSecondary,
        margin: "0 0 10px",
        fontFamily: font,
      }}
    >
      {label}
    </p>
    <p
      style={{
        fontSize: 28,
        fontWeight: 600,
        color: accent || theme.text,
        margin: "0 0 4px",
        fontFamily: font,
        letterSpacing: "-0.02em",
      }}
    >
      {value}
    </p>
    {sub && (
      <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, fontFamily: font }}>
        {sub}
      </p>
    )}
  </div>
);