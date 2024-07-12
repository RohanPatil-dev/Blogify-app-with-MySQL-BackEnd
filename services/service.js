const jwt = require("jsonwebtoken")

const secret = "Rohan123504"

function setUser(user) {
   const payload = {
       id : user[0].id,
       email : user[0].email,
       password : user[0].password,
       role : user[0].role
   }

   return jwt.sign(payload,secret)
}


module.exports = {setUser}
