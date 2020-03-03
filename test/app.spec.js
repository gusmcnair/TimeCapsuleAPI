const app = require('../src/app')
const knex = require('knex')

describe('Capsules endpoint happy cases', () => {
  let db;
  let newCapsule = [
    {"title": "Benry", "contents": "Howdy there my fair brethren", "imageurl": "www.com", "burydate": "idk", "opendate": "lol", "opennumber": 27}
  ]
  
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })
  
  before('cleanup', () => db.raw('TRUNCATE TABLE capsules RESTART IDENTITY;'));

  beforeEach('insert some todos', () => {
    return db('capsules').insert(newCapsule);
  })

  afterEach('cleanup', () => db.raw('TRUNCATE TABLE capsules RESTART IDENTITY;')); 

  after('disconnect from the database', () => db.destroy()); 
  
  it('GET responds with correct data', () => {
    return supertest(app)
      .get('/api/capsules')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.a('array')
        expect(res.body).to.have.length(newCapsule.length)
        expect(res.body[0]).to.include.keys('id', 'title', 'burydate', 'opendate', 'opennumber')
      })
  })

  it('GET ID responds with correct data', () => {
    return supertest(app)
      .get('/api/capsules/1')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.a('object')
        expect(res.body).to.include.keys('id', 'contents', 'imageurl')
      })
  })


  it('DELETE removes correct data', () => {
    return supertest(app)
      .delete('/api/capsules/1')
      .expect(204)
  })


  it('POST posts correct data', () => {
    let newCapsule2 = {"title": "Henry", "contents": "It's there my fair brethren", "imageurl": "www.internet.com", "burydate": "idk", "opendate": "lol", "opennumber": 27}
    return supertest(app)
      .post('/api/capsules')
      .send(newCapsule2)
      .expect(201)
      .expect(res => {
        expect(res.body).to.be.a('object')
        expect(res.body).to.include.keys('id', 'contents', 'imageurl', 'title', 'burydate', 'opendate', 'opennumber')
      })
  })

})
