export const extractCodeFromString = (message: string) => {
  if (message.includes('```')) {
    const blocks = message.split('```');
    return blocks;
  }
};

export const isCodeBlock = (str: string) => {
  if (
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('#') ||
    str.includes('//')
  ) {
    return true;
  }
  return false;
};

export const updateScroll = (ref: HTMLElement) => {
  if (ref) {
    ref.scrollTop = ref.scrollHeight;
  }
};
