const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

// function authenticateAdminToken(req, res, next) {
//     const token = req.headers.authorization;
//     console.log(token);
//     if (token == null){
//         return res.sendStatus(401)
//     } 
    
//     jwt.verify(token, SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403)
//       }
//         console.log(user);
//         if(user.username === "admin" && user.role === 1){
//           next()
//         }
//         else{
//           return res.sendStatus(403)
//         }
//     })
//   }
 

function authenticateAdminToken(req, res, next) {
    const token = req.headers.authorization;
    console.log(token);

    if (token == null){
        return res.sendStatus(401)
    } 
    
    jwt.verify(token, SECRET, (err) => {
      if (err) {
        return res.sendStatus(403)
      }
    
      next()
    })
  }

  


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



