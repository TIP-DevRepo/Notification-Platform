"use client";

import { useState } from "react";
import { theme, font } from "../../theme";
import { Badge } from "../../components/ui/Badge";
import { Btn } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { TemplateModal } from "./TemplateModal";
import { IconPlus, IconEdit, IconTrash, IconFile, IconSMS, IconMail } from "../../icons";

export const Templates = ({ templates, setTemplates }) => {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = filter === "all" ? templates : templates.filter((t) => t.type === filter);

  const handleSave = (form) => {
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (editing?.id) {
      setTemplates((prev) => prev.map((t) => (t.id === editing.id ? { ...t, ...form } : t)));
    } else {
      setTemplates((prev) => [...prev, { ...form, id: Date.now(), created: today }]);
    }
    setShowModal(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: theme.text, margin: "0 0 4px", fontFamily: font, letterSpacing: "-0.01em" }}>
            Templates
          </h1>
          <p style={{ fontSize: 14, color: theme.textSecondary, margin: 0, fontFamily: font }}>
            Manage reusable message templates for SMS and email.
          </p>
        </div>
        <Btn onClick={() => { setEditing(null); setShowModal(true); }} icon={<IconPlus size={14} />}>
          New Template
        </Btn>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { v: "all", l: "All" },
          { v: "sms", l: "SMS" },
          { v: "email", l: "Email" },
        ].map((f) => (
          <button
            key={f.v}
            onClick={() => setFilter(f.v)}
            style={{
              padding: "6px 14px",
              fontSize: 13,
              fontFamily: font,
              fontWeight: 500,
              borderRadius: 6,
              cursor: "pointer",
              border: `1px solid ${filter === f.v ? "#111111" : theme.border}`,
              background: filter === f.v ? "#111111" : "transparent",
              color: filter === f.v ? "#FFFFFF" : theme.textSecondary,
              transition: "all 0.15s",
            }}
          >
            {f.l} {f.v === "all" ? templates.length : templates.filter((t) => t.type === f.v).length}
          </button>
        ))}
      </div>

      {/* Template List */}
      {filtered.length === 0 ? (
        <div
          style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: 10,
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <IconFile size={32} color={theme.textMuted} />
          <p style={{ fontSize: 15, fontWeight: 500, color: theme.text, margin: "16px 0 6px", fontFamily: font }}>
            No templates yet
          </p>
          <p style={{ fontSize: 13, color: theme.textSecondary, margin: "0 0 20px", fontFamily: font }}>
            Create your first template to start sending notifications.
          </p>
          <Btn onClick={() => { setEditing(null); setShowModal(true); }} icon={<IconPlus size={14} />}>
            Create Template
          </Btn>
        </div>
      ) : (
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, overflow: "hidden" }}>
          {filtered.map((t, i) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderBottom: i < filtered.length - 1 ? `1px solid ${theme.border}` : "none",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = theme.bg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span
                style={{
                  padding: 9,
                  background: t.type === "sms" ? theme.sms.bg : theme.email.bg,
                  borderRadius: 8,
                  display: "flex",
                  flexShrink: 0,
                }}
              >
                {t.type === "sms" ? (
                  <IconSMS size={16} color={theme.sms.text} />
                ) : (
                  <IconMail size={16} color={theme.email.text} />
                )}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: theme.text, margin: 0, fontFamily: font }}>
                    {t.name}
                  </p>
                  <Badge type={t.type} />
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: theme.textSecondary,
                    margin: 0,
                    fontFamily: font,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 420,
                  }}
                >
                  {t.type === "email" ? `Subject: ${t.subject}` : t.body}
                </p>
              </div>

              <p style={{ fontSize: 12, color: theme.textMuted, fontFamily: font, flexShrink: 0 }}>
                {t.created}
              </p>

              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => { setEditing(t); setShowModal(true); }}
                  style={{
                    display: "flex",
                    padding: 7,
                    background: "none",
                    border: `1px solid ${theme.border}`,
                    borderRadius: 6,
                    cursor: "pointer",
                    color: theme.textSecondary,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#AAAAAA"; e.currentTarget.style.color = theme.text; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textSecondary; }}
                >
                  <IconEdit size={14} />
                </button>
                <button
                  onClick={() => setDeleteConfirm(t.id)}
                  style={{
                    display: "flex",
                    padding: 7,
                    background: "none",
                    border: `1px solid ${theme.border}`,
                    borderRadius: 6,
                    cursor: "pointer",
                    color: theme.textSecondary,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.error.text; e.currentTarget.style.color = theme.error.text; e.currentTarget.style.background = theme.error.bg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textSecondary; e.currentTarget.style.background = "none"; }}
                >
                  <IconTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <TemplateModal
          template={editing}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditing(null); }}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <Modal
          title="Delete Template"
          subtitle="This action cannot be undone."
          onClose={() => setDeleteConfirm(null)}
          footer={
            <>
              <Btn variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</Btn>
              <Btn variant="danger" onClick={() => handleDelete(deleteConfirm)} icon={<IconTrash size={14} />}>
                Delete Template
              </Btn>
            </>
          }
        >
          <p style={{ fontSize: 14, color: theme.textSecondary, fontFamily: font, margin: 0, lineHeight: 1.6 }}>
            Are you sure you want to delete this template? Any unsent messages using it will not be affected.
          </p>
        </Modal>
      )}
    </div>
  );
};