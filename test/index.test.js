process.env.NODE_ENV = 'test'   //set this so that the program knows it is in test mode

const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Testing the Users routes", () => {
  
  it("Making a GET request to the 'api/users/' route", done => {
    chai
      .request(app)
      .get("/api/users/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Making a valid POST request to the 'api/users/add route", done => {
    chai
      .request(app)
      .post("/api/users/add")
      .send({ username: "Rimmy Slim Bim" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.equals("User added!");
        done();
      });
  });

  it("Making an invalid POST request to the 'api/users/add route", done => {
    chai
      .request(app)
      .post("/api/users/add")
      .send({ username: "Rimmy Slim Bim" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("testing the exercises routes", () => {
    
})