const express = require('express')
const app = express()
const cors = require("cors")
app.use(express.json());
const routes = require ('./routes')
app.use("/" ,routes)
app.use(cors({origin:`http://locallhost:3000)`}))  

app.listen("5000")