import express from 'express'
import bodyParser from 'body-parser'
import { DataSource } from 'typeorm'

import entities from "./entities"
import { routes } from './routes'
import { database } from './dataSource'

const app = express()

const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes);

app.listen(port, async () => {
    try {
        console.log(`server run in port = ${port}`)
        await database.initialize()
        console.log('data base running')
        await database.runMigrations()
        console.log('migrations finished')
    } catch (err) {
        console.log(err)
    }
})