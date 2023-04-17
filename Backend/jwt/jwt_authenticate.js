const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

function authenticateAdminToken(req, res, next) {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token)
    const username = decoded.username
    console.log(token);
    if (token == null){
        return res.sendStatus(401)
    } 
    
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
        console.log(user);
        // if(user.username === "admin" && user.role === 1){
        //   next()
        // }
    })
      User.findOne({
    where: { username },
  }).then(user => {
    if (!user || user.username !== 'admin') {
      return res.sendStatus(403)
    }
    next()
  }).catch(err => {
    console.error(err)
    return res.sendStatus(500)
  })
  }


  // function checkStatusUser(req, res, next) {
  //   const token = req.headers.authorization
  
  //   User.findOne({
  //     where: {  },
  //   }).then(user => {
  //     if (!user || user.status !== 'user') {
  //       return res.sendStatus(403)
  //     }
  //     next()
  //   }).catch(err => {
  //     console.error(err)
  //     return res.sendStatus(500)
  //   })
  // }







//   jwt.verify(token, SECRET, (err, user)=>{
//     if(err){
//       return res.sendStatus(403)
//   }
//   next()
// })


  

  function authenticateUserToken(req, res, next) {
    const token = req.headers.authorization;

    if (token == null){
        return res.sendStatus(401)
    } 
    
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
        console.log(user);
        if(user.username !== 'admin' && user.role === 0 ){
          next()
        }
    })
  }

  
module.exports = {
  authenticateAdminToken,
  authenticateUserToken
}



