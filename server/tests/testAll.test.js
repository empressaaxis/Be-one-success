import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";
import mongoDbConnect from "../config/db.config.js";
import deleteAllDataInUsers from '../helpers/deleteAllTables.js'

chai.should()
chai.use(chaiHttp);

describe('Testing the whole app', () => { 

    before('Delete all table datas', () => deleteAllDataInUsers());

    it('Should welcome a user', done => {
        chai
            .request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('message', 'Welcome on Be-One Success APIs');
                done();
            })
    });

    it('Should prompt 404 endpoint a user', done => {
        chai
            .request(app)
            .get('/dskjfjhsdgfjsdhgf')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object')
                res.body.should.have.property('message', '404 Endpoint not found');
                done();
            })
    });

    const user = {
        names: "Test testing",
        email: "richcyuzuzo@gmail.com",
        phone: "0784218000",
        password: "kigali123!",
        type: "student"
      }

    it('Should signup a user', done => {
        chai
            .request(app)
            .post('/api/auth/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    });

    const userLogin = {
        email: "richcyuzuzo@gmail.com",
        password: "kigali123!"
    }

    it('Should login a user', done => {
        chai
            .request(app)
            .post('/api/auth/login')
            .send(userLogin)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            })
    });
});



