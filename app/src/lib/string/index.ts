export const truncate = (length: number = 100) => (str: string) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};


