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
