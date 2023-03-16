/**
 * Description: File content all common methods
 */

let getNews = async function (req){
    let q = req.body.q;
    let from = req.body.from;
    let sortBy = req.body.sortBy;
    let apiKey = req.body.apiKey;
  
    let res = await fetch(`https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=${sortBy}&apiKey=${apiKey}`, {  
        method: 'GET',
        headers: {
        "Content-Type": "application/json"
        },
        credentials: "include"
    });
    return res.json();
  }
  
let firstFiveRecords = function (obj, records) {
      return obj.slice(0, records).map(item => item);
  }

  module.exports = {
    getNews: getNews,
    firstFiveRecords: firstFiveRecords
  }
  