const express = require('express')
const cors = require('cors');
// set the port number
const PORT = process.env.PORT || 9000

// import mongodb
const { MongoClient } = require('mongodb')
// Set the remote database name
const uri = 'mongodb://Tanxiaoxu:651123@ac-nztxvbo-shard-00-00.evsebmk.mongodb.net:27017,ac-nztxvbo-shard-00-01.evsebmk.mongodb.net:27017,ac- nztxvbo-shard-00-02.evsebmk.mongodb.net:27017/test?replicaSet=atlas-wcok94-shard-0&ssl=true&authSource=admin'

const client = new MongoClient(uri)

const app = express()

app. use(cors());

// Configuration parsing form request body: application/json
app. use(express. json())
// Parse form request body: application/x-www-form-urlencoded
app. use(express. urlencoded())


// login user
app. post('/login', async (req, res, next) => {
  try {
    // 1. Get client login data
    const {email, password} = req. body
    // 2. Data validation
    if(!email) {
      return res. send({
        code:0,
        error: 'Please enter your email address !'
      })
    } else if (!password) {
      return res. send({
        code:0,
        error: 'Please enter your email address !'
      })
    }
    // Connect to the database
    await client. connect()
    const collection = client.db('cs353').collection('user')
    // query all users
    const userList = await collection.find().toArray()
    // console.log('User List', userList)
    userList.forEach(item => {
      if (item. email == email && item. password == password) {
        res. send({
          code: 1,
          user: item,
          message: 'login success!',
        })
      }
    })
    res. send({
      message: 'login failed',
      code:0,
    })
  } catch (error) {
    next(error)
  }
})

// query all cards
app.get('/card', async (req, res, next)=>{
  try {
    // Connect to the database
    await client. connect()
    const collection = client.db('cs353').collection('cardgame')
    // find user
    const cardList = await collection. find(). toArray();
    res. send({
      code: 1,
      cardList: cardList[0].cards
    })
  } catch (error) {
    next(error)
  }
})


app.post('/uploadCard', async (req, res, next) => {
  try {
    // Connect to the database
    await client. connect()
    const collection = client.db('cs353').collection('user')
    // find user
    const card = await collection. findOne({
      email: req.body.email
    })

    if(card){
      const totalArray = card.cards.concat(req.body.cardList || []);

      let incoludArray = [];

      totalArray.forEach(item => {
        if(!incoludArray.includes(item.id)){
          incoludArray.push(item.id)
        }

      })

      incoludArray = incoludArray. map(item => {
        return totalArray.find(findItem => findItem.id === item)
      } )

      await collection.updateOne({email:req.body.email},{$set:{
          cards:incoludArray
        }})

      res. send({
        code: 1,
        message: 'ok!',
      })

    }else{
      res. send({
        code:0,
        message: 'upadte failed',
      })
    }

  } catch (error) {
    next(error)
  }
})

// query users
app.post('/findDeckCards', async (req, res, next) => {
  try {
    // Connect to the database
    await client. connect()
    const collection = client.db('cs353').collection('user')
    // find user
    const card = await collection. findOne({
      email: req.body.email
    })

    if(card){
      res. send({
        code: 1,
        cards:card.cards
      })
    }
    res. send({
      code:0,
      message: 'find failed',
    })
  } catch (error) {
    next(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

