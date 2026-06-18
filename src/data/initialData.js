export const INITIAL_TEMPLATES = [
  {
    id: 1,
    type: "sms",
    name: "Appointment Reminder",
    body: "Hi {{name}}, this is a reminder for your appointment on {{date}} at {{time}}. Reply STOP to opt out.",
    created: "Jun 10, 2025",
  },
  {
    id: 2,
    type: "email",
    name: "Welcome to the Platform",
    subject: "Welcome, {{name}}!",
    body: "<p>Hi {{name}},</p><p>Your account is ready. Log in at <a href='{{link}}'>{{link}}</a> to get started.</p><p>— The Team</p>",
    created: "Jun 8, 2025",
  },
  {
    id: 3,
    type: "sms",
    name: "Order Shipped",
    body: "Great news! Order #{{order_id}} is on its way. Est. delivery: {{date}}. Track: {{link}}",
    created: "Jun 5, 2025",
  },
  {
    id: 4,
    type: "email",
    name: "Password Reset",
    subject: "Reset your password",
    body: "<p>Hi {{name}},</p><p>Click below to reset your password (expires in 24 hours):</p><p><a href='{{link}}'>Reset Password</a></p>",
    created: "Jun 3, 2025",
  },
  {
    id: 5,
    type: "sms",
    name: "Payment Received",
    body: "Payment of ${{amount}} received for Invoice #{{invoice_id}}. Thank you!",
    created: "May 28, 2025",
  },
];

export const INITIAL_HISTORY = [
  { id: 1, template: "Appointment Reminder", type: "sms", recipient: "+1 (302) 555-0191", status: "delivered", time: "2 hours ago" },
  { id: 2, template: "Welcome to the Platform", type: "email", recipient: "sarah.chen@ridgeline.com", status: "delivered", time: "5 hours ago" },
  { id: 3, template: "Order Shipped", type: "sms", recipient: "+1 (410) 555-0147", status: "delivered", time: "Yesterday" },
  { id: 4, template: "Password Reset", type: "email", recipient: "mark.davis@techcorp.com", status: "failed", time: "Yesterday" },
  { id: 5, template: "Payment Received", type: "sms", recipient: "+1 (302) 555-0288", status: "delivered", time: "2 days ago" },
];