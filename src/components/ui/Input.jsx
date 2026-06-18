"use client";

import { theme, font } from "../../theme";

export const Input = ({ label, value, onChange, placeholder, type = "text", required }) => (
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
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
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
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#AAAAAA")}
      onBlur={(e) => (e.target.style.borderColor = theme.border)}
    />
  </div>
);

export const MaskedInput = ({ label, value, onChange, placeholder, show, onToggle, EyeIcon }) => (
  <div style={{ marginBottom: 16 }}>
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
    </label>
    <div style={{ position: "relative" }}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "9px 40px 9px 12px",
          fontSize: 14,
          fontFamily: "monospace",
          border: `1px solid ${theme.border}`,
          borderRadius: 6,
          outline: "none",
          background: theme.surface,
          color: theme.text,
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={onToggle}
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: theme.textSecondary,
          display: "flex",
        }}
      >
        {EyeIcon && <EyeIcon size={16} />}
      </button>
    </div>
  </div>
);