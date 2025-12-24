export const truncateId = (id: string, length: number = 8): string => {
  return id.slice(0, length);
};

export const formatIdDisplay = (id: string): string => {
  return `#${truncateId(id).toUpperCase()}`;
};

export const searchInText = (text: string, query: string): boolean => {
  return text.toLowerCase().includes(query.toLowerCase());
};
