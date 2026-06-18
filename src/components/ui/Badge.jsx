import { theme, font } from "../../theme";

export const Badge = ({ type }) => (
  <span
    style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "9999px",
      fontSize: "11px",
      fontWeight: 500,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      background: type === "sms" ? theme.sms.bg : theme.email.bg,
      color: type === "sms" ? theme.sms.text : theme.email.text,
      fontFamily: font,
    }}
  >
    {type === "sms" ? "SMS" : "Email"}
  </span>
);

export const StatusBadge = ({ status }) => (
  <span
    style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "9999px",
      fontSize: "11px",
      fontWeight: 500,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      background: status === "delivered" ? theme.success.bg : theme.error.bg,
      color: status === "delivered" ? theme.success.text : theme.error.text,
      fontFamily: font,
    }}
  >
    {status}
  </span>
);