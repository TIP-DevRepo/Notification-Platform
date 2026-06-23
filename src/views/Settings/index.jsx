"use client";

import { theme, font } from "../../theme";
import { IconCheck, IconSMS, IconMail } from "../../icons";

const IntegrationCard = ({ title, description, items, Icon, iconStyle }) => (
  <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
    <div style={{ padding: "20px 24px", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ padding: 10, background: iconStyle.bg, borderRadius: 8, display: "flex" }}>
        <Icon size={18} color={iconStyle.text} />
      </span>
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.text, margin: "0 0 2px", fontFamily: font }}>
          {title}
        </h3>
        <p style={{ fontSize: 13, color: theme.textSecondary, margin: 0, fontFamily: font }}>
          {description}
        </p>
      </div>
      <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: theme.success.text, background: theme.success.bg, padding: "4px 12px", borderRadius: 9999, fontFamily: font }}>
        <IconCheck size={13} color={theme.success.text} /> Connected
      </span>
    </div>
    <div style={{ padding: "20px 24px" }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
          <span style={{ fontSize: 13, color: theme.textSecondary, fontFamily: font }}>{item.label}</span>
          <span style={{ fontSize: 13, color: theme.text, fontFamily: font, fontWeight: 500 }}>{item.value}</span>
        </div>
      ))}
      <p style={{ fontSize: 12, color: theme.textMuted, margin: "16px 0 0", fontFamily: font, lineHeight: 1.6 }}>
        Credentials are stored securely as environment variables in Vercel and are never exposed to the client.
      </p>
    </div>
  </div>
);

export const Settings = () => (
  <div style={{ maxWidth: 640 }}>
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: theme.text, margin: "0 0 4px", fontFamily: font, letterSpacing: "-0.01em" }}>
        Settings
      </h1>
      <p style={{ fontSize: 14, color: theme.textSecondary, margin: 0, fontFamily: font }}>
        Manage your messaging integrations.
      </p>
    </div>

    <IntegrationCard
      title="Twilio — SMS"
      description="Outbound SMS delivery"
      Icon={IconSMS}
      iconStyle={theme.sms}
      items={[
        { label: "Account SID", value: "Configured via Vercel" },
        { label: "Auth Token", value: "••••••••••••••••" },
        { label: "From Number", value: "Configured via Vercel" },
      ]}
    />

    <IntegrationCard
      title="Paubox — Email"
      description="HIPAA-compliant email delivery"
      Icon={IconMail}
      iconStyle={theme.email}
      items={[
        { label: "API Key", value: "••••••••••••••••" },
        { label: "Domain", value: "Configured via Vercel" },
        { label: "From Email", value: "Configured via Vercel" },
      ]}
    />

    <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 20 }}>
      <p style={{ fontSize: 13, color: theme.textSecondary, margin: 0, fontFamily: font, lineHeight: 1.6 }}>
        To update credentials, go to your <strong style={{ color: theme.text }}>Vercel project → Settings → Environment Variables</strong> and redeploy.
      </p>
    </div>
  </div>
);