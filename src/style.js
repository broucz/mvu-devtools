const base = 16;

const defaultFont = {
  fontFamily: 'monaco, Consolas, Lucida Console, monospace',
  fontSize: base,
  color: '#fff'
};

const defaultContainer = {
  position: 'fixed',
  zIndex: 10000,
  overflow: 'hidden',
  right: 0,
  top: 0,
  bottom: 0,
  width: '20%',
  wordWrap: 'break-word',
  boxSizing: 'border-box'
};

// -- devTools

export const devToolsContainer = () => {
  return {};
};

export const devToolsView = () => {
  return {};
};

export const devToolsPanel = () => {
  return {
    ...defaultContainer,
    ...defaultFont,
    maxHeight: '100%',
    background: '#2A2F3A'
  };
};

// -- timeTravel

const timeTravelRelativeHeight = 4;

const timeTravelButton = {
  boxSizing: 'border-box',
  width: '50%',
  float: 'left',
  textAlign: 'center',
  cursor: 'pointer',
  WebkitUserSelect: 'none',
  lineHeight: `${base * timeTravelRelativeHeight}px`
};

const timeTravelButtonDisabled = {
  ...timeTravelButton,
  color: '#757575'
};

export const timeTravelContainer = () => {
  return {
    ...defaultContainer,
    ...defaultFont,
    zIndex: defaultContainer.zIndex + 1,
    top: `${base * 0}px`,
    height: `${base * timeTravelRelativeHeight}px`
  };
};

export const timeTravelUndoButton = () => {
  return {
    ...timeTravelButton,
    borderRight: '1px solid #fff'
  };
};

export const timeTravelUndoButtonDisabled = () => {
  return {
    ...timeTravelButtonDisabled,
    borderRight: '1px solid #fff'
  };
};

export const timeTravelRedoButton = () => {
  return {
    ...timeTravelButton,
    borderLeft: '1px solid #fff'
  };
};

export const timeTravelRedoButtonDisabled = () => {
  return {
    ...timeTravelButtonDisabled,
    borderLeft: '1px solid #fff'
  };
};

// -- logger

export const loggerTheme = () => {
  return {
    scheme: 'nicinabox',
    author: 'nicinabox (http://github.com/nicinabox)',
    base00: '#2a2f3a',
    base01: '#3c444f',
    base02: '#4f5a65',
    base03: '#bebebe',
    base04: '#b0b0b0', // unmodified
    base05: '#d0d0d0', // unmodified
    base06: '#ffffff',
    base07: '#f5f5f5', // unmodified
    base08: '#fb9fb1', // unmodified
    base09: '#fc6d24',
    base0A: '#ddb26f', // unmodified
    base0B: '#a1c659',
    base0C: '#12cfc0', // unmodified
    base0D: '#6fb3d2',
    base0E: '#d381c3',
    base0F: '#deaf8f'  // unmodified
  };
};

export const loggerContainer = () => {
  return {
    ...defaultContainer,
    ...defaultFont,
    zIndex: defaultContainer.zIndex + 1,
    top: `${base * 4}px`,
    overflowY: 'auto'
  };
};
