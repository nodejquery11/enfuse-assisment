var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({"message": "API working fine"});
});

/**
 * Task: expose the POST request
 * Description: getNew is the method which returns the entire response, firstFiveRecords method will return only five records from that object.
 * Created Date: 16/03/2023
 * Created By: Vikas Bose
 */

router.post('/news', (req, res, next) => {
  getNews(req).then(rs => {
      res.json({"result": firstFiveRecords(rs.articles, 5)});
  }).catch(error => {
      res.sendStatus(500);
  });  
});

async function getNews(req){
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

function firstFiveRecords(obj, records) {
    return obj.slice(0, records).map(item => item);
}

module.exports = router;
