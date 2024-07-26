export const MAIL_BUTTONS = [
  { id: "to.firstName", name: "To: First Name" },
  { id: "to.fullName", name: "To: Full Name" },
  { id: "to.email", name: "To: Email" },
];

export const MONTH_BUTTONS = [
  { id: "month.last", name: "Last Month" },
  { id: "month.this", name: "This Month" },
  { id: "month.next", name: "Next Month" },
];

export const DATE_OPTIONS = [
  { id: "date.today", name: "Today" },
  { id: "date.tomorrow", name: "Tomorrow" },
  { id: "date.nextMonday", name: "Next Monday" },
  { id: "date.lastWeek", name: "Last week" },
  { id: "date.nextWeek", name: "Next Week" },
];

export const DATE_FORMAT = {
  LONG: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  SHORT: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
};
