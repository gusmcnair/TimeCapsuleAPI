require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { API_TOKEN } = require('./config')
const CapsulesService = require('./capsulesservice')
const jsonParser = express.json()
const logger = require('./logger')
const path = require('path')
const xss = require('xss')
const {CLIENT_ORIGIN} = require('./config');
const moment = require('moment')


const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const serializeCapsulePost = (capsule) => ({
  id: capsule.id,
  title: xss(capsule.title),
  contents: xss(capsule.contents),
  imageurl: xss(capsule.imageurl),
  burydate: capsule.burydate,
  opendates: capsule.opendates,
})

const serializeCapsuleGetById = (capsule) => ({
  id: capsule.id,
  contents: xss(capsule.contents),
  imageurl: xss(capsule.imageurl),
  opendates: moment.utc(capsule.opendates).local().format('LLL')
})

const serializeCapsuleGet = (capsule) => ({
  id: capsule.id,
  title: xss(capsule.title),
  burydate: moment.utc(capsule.burydate).local().format('LLL'),
  opendates: moment.utc(capsule.opendates).local().format('LLL'),
})
/*
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);
*/
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())


app
  .route('/')
  .get((req, res, next) => {
    res.json('hidey ho!')
  })

app
  .route('/api/capsules')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    console.log(req.query.auth)
    console.log({API_TOKEN})
    if(!req.query.auth || req.query.auth !== API_TOKEN){return(res.status(403).json('Invalid authorization'))}
    console.log('hi' + req.query.auth)
    CapsulesService.getCapsules(knexInstance)
      .then(capsules => {
        res.status(200).json(capsules.map(serializeCapsuleGet))
      })
    .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    if(!req.query.auth || req.query.auth !== API_TOKEN){return(res.status(403).json('Invalid authorization'))}
    const knexInstance = req.app.get('db')
    const {title, contents, imageurl, burydate, opendates} = req.body
    const newCapsule = {title, contents, imageurl, burydate, opendates}
    if(!title || !contents || !burydate || !opendates){
      return res.status(400).json('Missing required data.')
    }
    CapsulesService.insertCapsules(knexInstance, newCapsule)
      .then(capsule => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${capsule.id}`))
          .json(serializeCapsulePost(capsule))
      })
      .catch(next)
  })

app
  .route('/api/capsules/:capsule_id')
  .all((req, res, next) => {
    if(!req.query.auth || req.query.auth !== API_TOKEN){return(res.status(403).json('Invalid authorization'))}
    if(isNaN(parseInt(req.params.capsule_id))){
      return res.status(404).json('Invalid capsule ID')
    }
    const knexInstance = req.app.get('db')
    CapsulesService.getCapsuleById(knexInstance, req.params.capsule_id)
      .then(capsule => {
        if(!capsule){return res.status(404).json('Capsule not found')}
        if(capsule.opendates >= moment()){return res.status(403).json('This capsule is not ready to be opened yet.')}
        res.capsule = capsule
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeCapsuleGetById(res.capsule))
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get('db')
    CapsulesService.deleteCapsule(knexInstance, req.params.capsule_id)
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })


   app.use(function errorHandler(error, req, res, next) {
       let response
       if (NODE_ENV === 'production') {
         response = { error: { message: 'server error' } }
       } else {
         console.error(error)
         response = { message: error.message, error }
       }
       res.status(500).json(response)
     })

module.exports = app
