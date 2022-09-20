import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.should()
chai.use(chaiHttp);

describe('Testing the whole app', () => { 

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
});



