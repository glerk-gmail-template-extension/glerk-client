export const applyCommand = (command, value = null) => {
  document.execCommand(command, false, value);
};

export const createLink = (link) => {
  if (/http/i.test(link)) {
    applyCommand("createLink", link);
  } else {
    applyCommand("createLink", `http://${link}`);
  }
};

export const storeCurrentCursor = (cursorRef) => {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    cursorRef.current = {
      rangeCount: selection.rangeCount,
      range: selection.getRangeAt(0),
      removeAllRanges: () => selection.removeAllRanges(),
      addRange: (range) => selection.addRange(range),
    };
  }
};

export const addVariable = (variable, editableRef, cursorRef) => {
  const editableEl = editableRef.current;
  const selectionEl = cursorRef.current;

  if (
    selectionEl?.rangeCount > 0 &&
    editableEl.contains(selectionEl?.range.commonAncestorContainer)
  ) {
    const { range } = selectionEl;
    range.deleteContents();

    const textNode = document.createTextNode(`[{${variable.trim()}}]`);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);

    selectionEl.removeAllRanges();
    selectionEl.addRange(range);
  } else {
    editableEl.innerHTML += `[{${variable.trim()}}]`;
  }

  editableEl.focus();
};

const WHITE = "#ffffff";
const BLACK = "#000000";

const rgbToHex = (rgb) => {
  const result = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
  if (!result) return null;

  const r = parseInt(result[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(result[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(result[3], 10).toString(16).padStart(2, "0");

  return `#${r}${g}${b}`.toUpperCase();
};

export const getStyles = (node, FONT_SIZE, FONT_FAMILY) => {
  const styles = {};

  while (node && node !== document) {
    const { textAlign, fontSize, color, backgroundColor } =
      window.getComputedStyle(node);

    if (
      !styles.textAlign &&
      ["left", "center", "right", "justify"].includes(textAlign)
    ) {
      styles.textAlign = textAlign;
    }

    if (!styles.fontSize && FONT_SIZE[fontSize]) {
      styles.fontSize = FONT_SIZE[fontSize];
    }

    if (!styles.color && color) {
      styles.color = rgbToHex(color) || BLACK;
    }

    if (!styles.backgroundColor && backgroundColor) {
      const hex = rgbToHex(backgroundColor);
      styles.backgroundColor = (hex === BLACK ? WHITE : hex) || WHITE;
    }

    const nodeName = node.nodeName.toLowerCase();

    if (
      !styles.header &&
      ["h1", "h2", "h3", "h4", "h5", "h6"].includes(nodeName)
    ) {
      styles.header = nodeName.toUpperCase();
    }

    const fontFamily = window
      .getComputedStyle(node)
      .fontFamily.replace(/['"]/g, "")
      .toLowerCase();

    if (!styles.fontFamily) {
      styles.fontFamily = FONT_FAMILY[fontFamily];
    }

    node = node.parentNode;
  }

  return styles;
};
