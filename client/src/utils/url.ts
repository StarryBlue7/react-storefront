/**
 * @param {string} name
 * @returns {string} URL-appropriate name in lower case, without spaces
 */
export const urlString = (name: string): string => {
  const url = name.toLowerCase().replace(/\s+/g, "-");
  return url;
};
