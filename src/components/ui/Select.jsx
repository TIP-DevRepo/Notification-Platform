"use client";

import { theme, font } from "../../theme";

export const Select = ({ label, value, onChange, options, required }) => (
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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23787774' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);