export const ICNDb = {
  getData: async link => {
    const result = await fetch(link);
    return result;
  }
};
