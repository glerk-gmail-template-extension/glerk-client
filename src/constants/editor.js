import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuStrikethrough,
  LuListOrdered,
  LuList,
  LuUndo,
  LuRedo,
  LuLink,
  LuUnlink,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuIndent,
  LuOutdent,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";
import { applyCommand, createLink } from "../utils/editor";

export const EDITOR_FEATURES = [
  {
    option: "bold",
    description: "Bold",
    Icon: LuBold,
    formatText: () => applyCommand("bold"),
  },
  {
    option: "italic",
    description: "Italic",
    Icon: LuItalic,
    formatText: () => applyCommand("italic"),
  },
  {
    option: "underline",
    description: "Underline",
    Icon: LuUnderline,
    formatText: () => applyCommand("underline"),
  },
  {
    option: "strikethrough",
    description: "Strikethrough",
    Icon: LuStrikethrough,
    formatText: () => applyCommand("strikethrough"),
  },
  {
    option: "break",
    description: "break1",
  },
  {
    option: "insertOrderedList",
    description: "Ordered List",
    Icon: LuListOrdered,
    formatText: () => applyCommand("insertOrderedList"),
  },
  {
    option: "insertUnorderedList",
    description: "Unordered List",
    Icon: LuList,
    formatText: () => applyCommand("insertUnorderedList"),
  },
  {
    option: "break",
    description: "break2",
  },
  {
    option: "justifyFull",
    description: "Align Justify",
    Icon: LuAlignJustify,
    formatText: () => applyCommand("justifyFull"),
  },
  {
    option: "justifyLeft",
    description: "Align Left",
    Icon: LuAlignLeft,
    formatText: () => applyCommand("justifyLeft"),
  },
  {
    option: "justifyCenter",
    description: "Align Center",
    Icon: LuAlignCenter,
    formatText: () => applyCommand("justifyCenter"),
  },
  {
    option: "justifyRight",
    description: "Align Right",
    Icon: LuAlignRight,
    formatText: () => applyCommand("justifyRight"),
  },
  {
    option: "break",
    description: "break3",
  },
  {
    option: "indent",
    description: "Indent",
    Icon: LuIndent,
    formatText: () => applyCommand("indent"),
  },
  {
    option: "outdent",
    description: "Outdent",
    Icon: LuOutdent,
    formatText: () => applyCommand("outdent"),
  },
  {
    option: "break",
    description: "break4",
  },
  {
    option: "createLink",
    description: "Link",
    Icon: LuLink,
    formatText: createLink,
  },
  {
    option: "unlink",
    description: "Unlink",
    Icon: LuUnlink,
    formatText: () => applyCommand("unlink"),
  },
  {
    option: "break",
    description: "break5",
  },
  {
    option: "undo",
    description: "Undo",
    Icon: LuUndo,
    formatText: () => applyCommand("undo"),
  },
  {
    option: "redo",
    description: "Redo",
    Icon: LuRedo,
    formatText: () => applyCommand("redo"),
  },
];

export const EDITOR_FONT = [
  {
    option: "Sans Serif",
    description: "Sans Serif",
  },
  {
    option: "Serif",
    description: "Serif",
  },
  {
    option: "Fixed Width",
    description: "Fixed Width",
  },
  {
    option: "Arial",
    description: "Arial",
  },
  {
    option: "Arial Black",
    description: "Arial Black",
  },
  {
    option: "Comic Sans MS",
    description: "Comic Sans MS",
  },
  {
    option: "Courier New",
    description: "Courier New",
  },
  {
    option: "Georgia",
    description: "Georgia",
  },
  {
    option: "Impact",
    description: "Impact",
  },
  {
    option: "Tahoma",
    description: "Tahoma",
  },
  {
    option: "Times New Roman",
    description: "Times New Roman",
  },
  {
    option: "Trebuchet MS",
    description: "Trebuchet MS",
  },
  {
    option: "Verdana",
    description: "Verdana",
  },
];

const EDITOR_FONT_OPTION = EDITOR_FONT.map((font) => font.option);

export const EDITOR_FONT_FAMILY_PAIR = EDITOR_FONT_OPTION.reduce(
  (acc, font) => {
    const key = font.toLowerCase();
    acc[key] = font;
    return acc;
  },
  {},
);

export const EDITOR_FONT_SIZE = [
  {
    option: "8",
    description: "8px",
  },
  {
    option: "9",
    description: "9px",
  },
  {
    option: "10",
    description: "10px",
  },
  {
    option: "11",
    description: "11px",
  },
  {
    option: "12",
    description: "12px",
  },
  {
    option: "13",
    description: "13px",
  },
  {
    option: "14",
    description: "14px",
  },
  {
    option: "16",
    description: "16px",
  },
  {
    option: "18",
    description: "18px",
  },
  {
    option: "20",
    description: "20px",
  },
  {
    option: "22",
    description: "22px",
  },
  {
    option: "24",
    description: "24px",
  },
  {
    option: "36",
    description: "36px",
  },
];

export const EDITOR_FONT_SIZE_PAIR = EDITOR_FONT_SIZE.reduce((acc, item) => {
  acc[item.description] = parseInt(item.option, 10);
  return acc;
}, {});

export const EDITOR_HEADER = [
  {
    option: "H1",
    description: "H1",
    Icon: LuHeading1,
  },
  {
    option: "H2",
    description: "H2",
    Icon: LuHeading2,
  },
  {
    option: "H3",
    description: "H3",
    Icon: LuHeading3,
  },
  {
    option: "H4",
    description: "H4",
    Icon: LuHeading4,
  },
  {
    option: "H5",
    description: "H5",
    Icon: LuHeading5,
  },
  {
    option: "H6",
    description: "H6",
    Icon: LuHeading6,
  },
];
