"use client";

import { theme, font } from "../../theme";

const variants = {
  primary: { bg: theme.btnPrimary, color: theme.btnPrimaryText, border: `1px solid ${theme.btnPrimary}` },
  secondary: { bg: "transparent", color: theme.text, border: `1px solid ${theme.border}` },
  ghost: { bg: "transparent", color: theme.textSecondary, border: "1px solid transparent" },
  danger: { bg: "transparent", color: theme.error.text, border: `1px solid ${theme.error.bg}` },
};

const sizes = {
  sm: { padding: "6px 12px", fontSize: 13 },
  md: { padding: "9px 16px", fontSize: 14 },
};

export const Btn = ({ children, onClick, variant = "primary", size = "md", disabled = false, icon }) => {
  const s = variants[variant];
  const sz = sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: sz.padding,
        fontSize: sz.fontSize,
        fontWeight: 500,
        background: disabled ? "#E5E5E5" : s.bg,
        color: disabled ? "#AAAAAA" : s.color,
        border: s.border,
        borderRadius: 6,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: font,
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = "0.82";
          e.currentTarget.style.transform = "scale(0.99)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {icon && icon}
      {children}
    </button>
  );
};