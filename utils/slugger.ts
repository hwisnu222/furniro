export const slugger = (text: string) => {
  return text.toLowerCase().replaceAll(" ", "-");
};
