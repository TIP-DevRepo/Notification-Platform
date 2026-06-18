"use client";

import { useState } from "react";
import { theme, font } from "../../theme";
import { Input, MaskedInput } from "../../components/ui/Input";
import { Btn } from "../../components/ui/Button";
import { IconCheck, IconEye } from "../../icons";

const SettingsSection = ({ title, description, children, onSave, savedKey, saved }) => (
  <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
    <div style={{ padding: "20px 24px", borderBottom: `1px solid ${theme.border}` }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.text, margin: "0 0 4px", fontFamily: font }}>
        {title}
      </h3>
      <p style={{ fontSize: 13, color: theme.textSecondary, margin: 0, fontFamily: font }}>
        {description}
      </p>
    </div>
    <div style={{ padding: "20px 24px" }}>
      {children}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8, paddingTop: 16, borderTop: `1px solid ${theme.border}` }}>
        {saved[savedKey] && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: theme.success.text, fontFamily: font }}>
            <IconCheck size={14} color={theme.success.text} /> Saved
          </span>
        )}
        <Btn onClick={onSave} icon={<IconCheck size={14} />}>
          Save Configuration
        </Btn>
      </div>
    </div>
  </div>
);

export const Settings = () => {
  const [twilio, setTwilio] = useState({ accountSid: "", authToken: "", fromNumber: "" });
  const [paubox, setPaubox] = useState({ apiKey: "", domain: "", fromEmail: "" });
  const [saved, setSaved] = useState({ twilio: false, paubox: false });
  const [showToken, setShowToken] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const save = (section) => {
    setSaved((s) => ({ ...s, [section]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [section]: false })), 2500);
  };

  return (
    <div style={{ maxWidth: 640 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: theme.text, margin: "0 0 4px", fontFamily: font, letterSpacing: "-0.01em" }}>
          Settings
        </h1>
        <p style={{ fontSize: 14, color: theme.textSecondary, margin: 0, fontFamily: font }}>
          Configure your messaging provider credentials.
        </p>
      </div>

      {/* Twilio */}
      <SettingsSection
        title="Twilio — SMS"
        description="Configure SMS delivery via Twilio. Find these in your Twilio Console."
        onSave={() => save("twilio")}
        savedKey="twilio"
        saved={saved}
      >
        <Input
          label="Account SID"
          value={twilio.accountSid}
          onChange={(v) => setTwilio((t) => ({ ...t, accountSid: v }))}
          placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        />
        <MaskedInput
          label="Auth Token"
          value={twilio.authToken}
          onChange={(v) => setTwilio((t) => ({ ...t, authToken: v }))}
          placeholder="Your Twilio auth token"
          show={showToken}
          onToggle={() => setShowToken(!showToken)}
          EyeIcon={IconEye}
        />
        <Input
          label="From Number"
          value={twilio.fromNumber}
          onChange={(v) => setTwilio((t) => ({ ...t, fromNumber: v }))}
          placeholder="+13025550100"
        />
      </SettingsSection>

      {/* Paubox */}
      <SettingsSection
        title="Paubox — Email"
        description="Configure HIPAA-compliant email delivery via Paubox."
        onSave={() => save("paubox")}
        savedKey="paubox"
        saved={saved}
      >
        <MaskedInput
          label="API Key"
          value={paubox.apiKey}
          onChange={(v) => setPaubox((p) => ({ ...p, apiKey: v }))}
          placeholder="Your Paubox API key"
          show={showKey}
          onToggle={() => setShowKey(!showKey)}
          EyeIcon={IconEye}
        />
        <Input
          label="Authorized Domain"
          value={paubox.domain}
          onChange={(v) => setPaubox((p) => ({ ...p, domain: v }))}
          placeholder="yourcompany.com"
        />
        <Input
          label="From Email Address"
          value={paubox.fromEmail}
          onChange={(v) => setPaubox((p) => ({ ...p, fromEmail: v }))}
          placeholder="notifications@yourcompany.com"
          type="email"
        />
      </SettingsSection>

      {/* Security Note */}
      <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 20 }}>
        <p style={{ fontSize: 13, color: theme.textSecondary, margin: 0, fontFamily: font, lineHeight: 1.6 }}>
          <strong style={{ color: theme.text }}>Security note:</strong> API keys are stored locally in this session only. In production, store credentials server-side in environment variables — never in client-side code.
        </p>
      </div>
    </div>
  );
};