const express=require('express')
const dotenv=require('dotenv')
const app=express()
dotenv.config()

//middleware
app.set('view engine','ejs')


app.get('/',(req,res)=>{
res.render('index')
})
//login
app.get('/login',(req,res)=>{
    res.render('LogIn')
})

const port =process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Server is connected on localhost:${port}`)
})