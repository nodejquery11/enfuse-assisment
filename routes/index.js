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
      if(rs.status === "ok"){
        if(rs.articles.length === 0) {
            res.status(404).send({"result": "Data not found."});
        } else {
            res.json({"result": firstFiveRecords(rs.articles, 5)});
        }
      } else{
          res.status(400).send({"result": rs.message});
      }      
  }).catch(error => {
      res.json({"result": error});
  });  
});

module.exports = router;
