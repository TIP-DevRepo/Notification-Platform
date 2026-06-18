"use client";

import { theme, font } from "../../theme";
import { IconX } from "../../icons";

export const Modal = ({ title, subtitle, onClose, children, footer }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: 24,
    }}
  >
    <div
      style={{
        background: theme.surface,
        borderRadius: 12,
        width: "100%",
        maxWidth: 560,
        border: `1px solid ${theme.border}`,
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px 28px 20px",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 600, color: theme.text, margin: 0, fontFamily: font }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 13, color: theme.textSecondary, margin: "4px 0 0", fontFamily: font }}>
              {subtitle}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: theme.textSecondary,
            padding: 4,
            borderRadius: 4,
            display: "flex",
          }}
        >
          <IconX size={18} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          style={{
            padding: "16px 28px",
            borderTop: `1px solid ${theme.border}`,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  </div>
);