const ICNDb = (function() {
  const link = "http://api.icndb.com/";

  async function getData(url) {
    const result = await fetch(url);
    return result;
  }

  async function pullData(options, action) {
    const data = getData(link + options);
    data.then(request => request.json()).then(json => {
      action(json);
    });
  }

  return {
    pullData: pullData
  };
})();

export default ICNDb;
