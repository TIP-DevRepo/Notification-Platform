"use client";

import { theme, font } from "../../theme";

export const Textarea = ({ label, value, onChange, placeholder, rows = 5, required }) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 500,
          color: theme.text,
          marginBottom: 6,
          fontFamily: font,
        }}
      >
        {label}
        {required && <span style={{ color: theme.error.text }}> *</span>}
      </label>
    )}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",
        padding: "9px 12px",
        fontSize: 14,
        fontFamily: font,
        border: `1px solid ${theme.border}`,
        borderRadius: 6,
        outline: "none",
        background: theme.surface,
        color: theme.text,
        boxSizing: "border-box",
        resize: "vertical",
        lineHeight: 1.6,
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#AAAAAA")}
      onBlur={(e) => (e.target.style.borderColor = theme.border)}
    />
    <p style={{ fontSize: 12, color: theme.textMuted, marginTop: 4, fontFamily: font }}>
      Use {"{{variable_name}}"} syntax for dynamic fields.
    </p>
  </div>
);