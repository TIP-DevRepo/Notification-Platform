"use client";

import { useState } from "react";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Btn } from "../../components/ui/Button";
import { IconCheck, IconEye } from "../../icons";
import { theme, font } from "../../theme";

export const TemplateModal = ({ template, onSave, onClose }) => {
  const isEdit = !!template?.id;
  const [form, setForm] = useState({
    type: template?.type || "sms",
    name: template?.name || "",
    subject: template?.subject || "",
    body: template?.body || "",
  });
  const [preview, setPreview] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.name.trim() && form.body.trim() && (form.type === "sms" || form.subject.trim());

  return (
    <Modal
      title={isEdit ? "Edit Template" : "New Template"}
      subtitle='Use {{variable_name}} for dynamic fields.'
      onClose={onClose}
      footer={
        <>
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={() => valid && onSave(form)} disabled={!valid} icon={<IconCheck size={14} />}>
            {isEdit ? "Save Changes" : "Create Template"}
          </Btn>
        </>
      }
    >
      <Select
        label="Channel"
        value={form.type}
        onChange={(v) => update("type", v)}
        options={[
          { value: "sms", label: "SMS — via Twilio" },
          { value: "email", label: "Email — via Paubox" },
        ]}
        required
      />
      <Input
        label="Template Name"
        value={form.name}
        onChange={(v) => update("name", v)}
        placeholder="e.g. Appointment Reminder"
        required
      />
      {form.type === "email" && (
        <Input
          label="Subject Line"
          value={form.subject}
          onChange={(v) => update("subject", v)}
          placeholder="e.g. Your appointment is confirmed"
          required
        />
      )}
      <Textarea
        label={form.type === "sms" ? "Message Body" : "Email Body (HTML supported)"}
        value={form.body}
        onChange={(v) => update("body", v)}
        rows={form.type === "email" ? 7 : 4}
        placeholder={
          form.type === "sms"
            ? "Hi {{name}}, your appointment is..."
            : "<p>Hi {{name}},</p><p>...</p>"
        }
        required
      />

      {form.body && (
        <div>
          <button
            onClick={() => setPreview(!preview)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              color: theme.textSecondary,
              fontFamily: font,
              padding: 0,
              marginBottom: preview ? 12 : 0,
            }}
          >
            <IconEye size={14} />
            {preview ? "Hide preview" : "Preview"}
          </button>
          {preview && (
            <div
              style={{
                background: theme.bg,
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                padding: 16,
                fontSize: 13,
                color: theme.text,
                fontFamily: font,
                lineHeight: 1.6,
              }}
            >
              {form.type === "sms" ? (
                <p style={{ margin: 0 }}>{form.body}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: form.body }} />
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};