"use client";

import { theme, font } from "../theme";
import { StatCard } from "../components/ui/StatCard";
import { Badge, StatusBadge } from "../components/ui/Badge";
import { Btn } from "../components/ui/Button";
import { IconFile, IconSend, IconSMS, IconMail } from "../icons";

export const Dashboard = ({ templates, history, setView }) => (
  <div>
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: theme.text, margin: "0 0 4px", fontFamily: font, letterSpacing: "-0.01em" }}>
        Overview
      </h1>
      <p style={{ fontSize: 14, color: theme.textSecondary, margin: 0, fontFamily: font }}>
        Your notification activity at a glance.
      </p>
    </div>

    {/* Stat Cards */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
      <StatCard label="Total Sent" value={history.length} sub="All time" />
      <StatCard
        label="Delivered"
        value={history.filter((h) => h.status === "delivered").length}
        sub={`${Math.round((history.filter((h) => h.status === "delivered").length / history.length) * 100)}% rate`}
        accent={theme.success.text}
      />
      <StatCard
        label="SMS Templates"
        value={templates.filter((t) => t.type === "sms").length}
        sub="Active"
        accent={theme.sms.text}
      />
      <StatCard
        label="Email Templates"
        value={templates.filter((t) => t.type === "email").length}
        sub="Active"
        accent={theme.email.text}
      />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      {/* Recent Activity */}
      <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: theme.text, margin: 0, fontFamily: font }}>
            Recent Activity
          </h3>
          <Btn variant="ghost" size="sm">View all</Btn>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Template", "Channel", "Recipient", "Status", "Time"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: theme.textMuted,
                    paddingBottom: 10,
                    paddingRight: 12,
                    fontFamily: font,
                    borderBottom: `1px solid ${theme.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.slice(0, 5).map((item, i) => (
              <tr
                key={item.id}
                style={{ borderBottom: i < history.length - 1 ? `1px solid ${theme.border}` : "none" }}
              >
                <td style={{ padding: "12px 12px 12px 0", fontSize: 13, fontWeight: 500, color: theme.text, fontFamily: font }}>
                  {item.template}
                </td>
                <td style={{ padding: "12px 12px 12px 0" }}>
                  <Badge type={item.type} />
                </td>
                <td style={{ padding: "12px 12px 12px 0", fontSize: 13, color: theme.textSecondary, fontFamily: font }}>
                  {item.recipient}
                </td>
                <td style={{ padding: "12px 12px 12px 0" }}>
                  <StatusBadge status={item.status} />
                </td>
                <td style={{ padding: "12px 0 12px 0", fontSize: 12, color: theme.textMuted, fontFamily: font }}>
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Quick Actions */}
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: theme.text, margin: "0 0 16px", fontFamily: font }}>
            Quick Actions
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                label: "Send Notification",
                sub: "Choose a template and send",
                icon: <IconSend size={14} color="#FFFFFF" />,
                iconBg: "#111111",
                action: () => setView("send"),
              },
              {
                label: "Manage Templates",
                sub: `${templates.length} templates`,
                icon: <IconFile size={14} color={theme.textSecondary} />,
                iconBg: theme.bg,
                action: () => setView("templates"),
              },
            ].map((qa) => (
              <button
                key={qa.label}
                onClick={qa.action}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 8,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#CCCCCC")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.border)}
              >
                <span style={{ padding: 8, background: qa.iconBg, borderRadius: 6, border: qa.iconBg === theme.bg ? `1px solid ${theme.border}` : "none", display: "flex" }}>
                  {qa.icon}
                </span>
                <span>
                  <p style={{ fontSize: 13, fontWeight: 500, color: theme.text, margin: 0, fontFamily: font }}>{qa.label}</p>
                  <p style={{ fontSize: 12, color: theme.textSecondary, margin: 0, fontFamily: font }}>{qa.sub}</p>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Channel Breakdown */}
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: theme.text, margin: "0 0 14px", fontFamily: font }}>
            Channel Breakdown
          </h3>
          {[
            { type: "sms", label: "SMS via Twilio", Icon: IconSMS, style: theme.sms },
            { type: "email", label: "Email via Paubox", Icon: IconMail, style: theme.email },
          ].map((ch) => (
            <div key={ch.type} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ padding: 7, background: ch.style.bg, borderRadius: 6, display: "flex" }}>
                  <ch.Icon size={14} color={ch.style.text} />
                </span>
                <span style={{ fontSize: 13, color: theme.text, fontFamily: font }}>{ch.label}</span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: theme.text, fontFamily: font }}>
                {history.filter((h) => h.type === ch.type).length}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);