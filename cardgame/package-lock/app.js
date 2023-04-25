const express = require('express')
const cors = require('cors');
// 设置端口号
const PORT = process.env.PORT || 9000

// 引入mongodb
const { MongoClient } = require('mongodb')
// 设置远程数据库名
const uri = 'mongodb://Tanxiaoxu:651123@ac-nztxvbo-shard-00-00.evsebmk.mongodb.net:27017,ac-nztxvbo-shard-00-01.evsebmk.mongodb.net:27017,ac-nztxvbo-shard-00-02.evsebmk.mongodb.net:27017/test?replicaSet=atlas-wcok94-shard-0&ssl=true&authSource=admin'

const client = new MongoClient(uri)

const app = express()

app.use(cors());

// 配置解析表单请求体：application/json
app.use(express.json())
// 解析表单请求体：application/x-www-form-urlencoded
app.use(express.urlencoded())


// 登录用户
app.post('/login', async (req, res, next) => {
  try {
    // 1. 获取客户端登录数据
    const {email, password} = req.body
    // 2. 数据验证
    if(!email) {
      return res.send({
        code:0,
        error: 'Please enter your email address !'
      })
    } else if (!password) {
      return res.send({
        code:0,
        error: 'Please enter your email address !'
    })
    }
    // 连接数据库
    await client.connect()
    const collection = client.db('cs353').collection('user')
    // 查询所有用户
    const userList = await collection.find().toArray()
    // console.log('用户列表', userList)
    userList.forEach(item => {
      if (item.email == email && item.password == password) {
        res.send({
          code:1,
          user:item,
          message: 'login success !',
        })
      }
    })
    res.send({
      message: 'login failed',
      code:0,
    })
  } catch (error) {
    next(error)
  }
})

// 查询所有卡片
app.get('/card',async (req, res, next)=>{
  try {
    // 连接数据库
    await client.connect()
    const collection = client.db('cs353').collection('cardgame')
    // 查找用户
    const cardList = await collection.find().toArray();
    res.send({
      code:1,
      cardList:cardList[0].cards
    })
  } catch (error) {
    next(error)
  }
})


app.post('/uploadCard',async (req, res, next) => {
  try {
    // 连接数据库
    await client.connect()
    const collection = client.db('cs353').collection('user')
    // 查找用户
    const card = await collection.findOne({
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

    incoludArray = incoludArray.map(item => {
      return totalArray.find(findItem => findItem.id === item)
    } )

    await collection.updateOne({email:req.body.email},{$set:{
      cards:incoludArray
    }})
   
    res.send({
      code:1,
      message: 'ok !',
    })

    }else{
      res.send({
        code:0,
        message: 'upadte failed',
      })
    }
   
  } catch (error) {
    next(error)
  }
})

// 查询用户
app.post('/findDeckCards', async (req, res, next) => {
  try {
    // 连接数据库
    await client.connect()
    const collection = client.db('cs353').collection('user')
    // 查找用户
    const card = await collection.findOne({
      email: req.body.email
    })

    if(card){
      res.send({
        code:1,
        cards:card.cards
      })
    }
    res.send({
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
