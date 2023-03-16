var express = require('express');
const { getNews, firstFiveRecords } = require('../middlewear/commonfunction');
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

module.exports = router;
