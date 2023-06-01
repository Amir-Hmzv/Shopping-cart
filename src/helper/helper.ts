export const sunStr = (text: string) => {
  const words = text.split(" ");
  let lines = [];
  let currentLine = "";
  for (let i = 0; i < words.length; i++) {
    if (currentLine.length + words[i].length + 1 <= 40) {
      currentLine += words[i] + " ";
    } else {
      lines.push(currentLine);
      currentLine = words[i] + " ";
    }

    if (i === words.length - 1) {
      lines.push(currentLine);
    }

    if (lines.length === 3) {
      break;
    }
  }
  return `${lines}...`;
};

export const firstTitle = (str:string) => {
    const firstThreeWords = str.split(' ').slice(0, 2).join(' ');
    return firstThreeWords
};
