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

export const getTextAlign = (node) => {
  while (node && node !== document) {
    const { textAlign } = window.getComputedStyle(node);

    if (["left", "center", "right", "justify"].includes(textAlign)) {
      return textAlign;
    }

    node = node.parentNode;
  }

  return null;
};

export const getFontFamily = (node, fonts) => {
  const lowerCaseFonts = fonts.map((font) => font.toLowerCase());
  const fontPair = fonts.reduce((acc, font) => {
    const key = font.toLowerCase();
    acc[key] = font;
    return acc;
  }, {});

  while (node && node !== document) {
    const fontFamily = window
      .getComputedStyle(node)
      .fontFamily.replace(/['"]/g, "")
      .toLowerCase();

    if (lowerCaseFonts.includes(fontFamily)) {
      return fontPair[fontFamily];
    }

    node = node.parentNode;
  }

  return null;
};

export const getFontSize = (node, fontSizes) => {
  const sizePair = fontSizes.reduce((acc, size) => {
    const key = size.description;
    acc[key] = size.option;

    return acc;
  }, {});

  while (node && node !== document) {
    const { fontSize } = window.getComputedStyle(node);

    if (sizePair[fontSize]) {
      return sizePair[fontSize];
    }

    node = node.parentNode;
  }

  return null;
};

export const getHeaderTag = (node) => {
  while (node && node !== document) {
    const nodeName = node.nodeName.toLowerCase();

    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(nodeName)) {
      return nodeName.toUpperCase();
    }

    node = node.parentNode;
  }

  return null;
};

const rgbToHex = (rgb) => {
  const result = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
  if (!result) return null;

  const r = parseInt(result[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(result[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(result[3], 10).toString(16).padStart(2, "0");

  return `#${r}${g}${b}`.toUpperCase();
};

export const getFontColor = (node) => {
  while (node && node !== document) {
    const fontColor = window.getComputedStyle(node).color;

    if (fontColor) {
      return rgbToHex(fontColor);
    }

    node = node.parentNode;
  }

  return null;
};

export const getBackgroundColor = (node) => {
  while (node && node !== document) {
    const { backgroundColor } = window.getComputedStyle(node);

    if (backgroundColor) {
      if (rgbToHex(backgroundColor) === "#000000") {
        return "#ffffff";
      }

      return rgbToHex(backgroundColor) || "#ffffff";
    }

    node = node.parentNode;
  }

  return null;
};
