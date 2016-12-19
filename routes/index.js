
/*
 * GET home page.
 */

var itper = require('./../db/itper_schema.js');

exports.index = function(req, res){
  res.render('index');
};

/*submit*/
exports.submit = function(req, res) {
  var name = req.body.Name; 
  var numbers = req.body.numbers;
  var majior = req.body.majior;
  var sex = req.body.sex;
  var character = req.body.character;

  var aDoc = {
    "name":name,
    "numbers":numbers,
    "majior":majior,
    "sex":sex,
    "character":character
  }

  itper.infolist.create(aDoc, function(err){
    if (err) {
    // If it failed, return error
      if(err.code == 11000)
        res.send("姓名已存在!添加数据失败");
      else
        res.send("There was a problem adding the information to the database." + err.code);
    }
    else {
      // And forward to success page
      res.redirect("success");
    }

  });
}

exports.success = function(req, res){
  res.render('success', {
    title: 'success'
  });
}

/* home */

exports.login = function (req, res){
  res.render('login', {
    title: 'login'
  });
}


exports.home = function(req, res) {
  var query = {user: req.body.user, password: req.body.password};
  itper.adminlist.count(query, function(err, doc){ 
    if (doc==1) {
      var findResult = itper.infolist.find(function(error, result){
        if (error) {
          res.send(error);
        }else{
          res.render('home', {
            title : '后台',
            status: doc, 
            username : query.user,
            infolist : result,
            date : new Date()
          });
        }
      });
    }else{
      res.render('home', {
        title : '后台',
        status: doc,
      });
      //res.redirect('/');
    }
  });
}


/*delete*/
exports.delete = function(req, res) {
  console.log(req.body.deleteID);
  itper.infolist.remove({ _id : req.body.deleteID}, function(err){
    if (err) {
    // If it failed, return error    
        res.send("There was a problem remove the information of the database."+err);
    }
    else {
      // And forward to success page
      res.redirect("login");
    }

  });
}
