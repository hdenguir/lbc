const path = require('path')
const db = require(`${path.dirname(__filename)}/../db.json`)

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userId = req.query?.senderId
    const result = db?.conversations?.filter(
      conv => conv.senderId == userId || conv.recipientId == userId
    )

    res.status(200).json(result)
    return
  }

  if (/conversations/.test(req.url) && req.method === 'POST') {

    const { recipientId,
      recipientNickname,
      senderId,
      senderNickname,lastMessageTimestamp} = req.body;
      const convExist = db?.conversations?.find(
        conv => conv.senderId == senderId && conv.recipientId == recipientId
      )
    
      if (convExist) {
        return res.status(403).json({})
        
      } else {
        db.conversations.push(
          {id: db.conversations.length + 1,recipientId,
          recipientNickname,
          senderId,
          senderNickname,lastMessageTimestamp});
        return res.status(200).json(true)
      }
    return
  }

  if (/users/.test(req.url) && req.method === 'POST') {
    
      const { action } = req.body;
    if(action === "login") {

      
        const { nickname, password } = req.body;
      const user =  db.users.find(user => user.nickname === nickname && user.password === password);

      

      if (user) {
        delete user.password;
        return res.status(200).json(user)
      } else {
        return res.status(404).json({})
      }
    }
      
    
    if(action === "register") {
      
      const { nickname , password, token} = req.body;
      const userExist = db.users.find(user => user.nickname === nickname);
      
      if (userExist) {
        return res.status(403).json({})
        
      } else {
        db.users.push({id: db.users.length + 1,nickname , password, token});
        return res.status(200).json(true)
      }
    }
  }

  next()
}