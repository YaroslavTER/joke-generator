export const ICNDb = {
  getData: async () => {
    const link = `http://api.icndb.com/jokes/random/2?limitTo=[nerdy, explicit]`;
    const result = await fetch(link);
    return result;
  }
};
