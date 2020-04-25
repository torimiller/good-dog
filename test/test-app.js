  
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require('../server');
chai.use(chaiHttp);

describe('POST /auth', function() {
  // note there's no `done` parameter passed to `function()` below
  it('should add a user on POST', function() {
    // since we're returning `chai.request.get.then...`
    // we don't need a `done` call back
    const newUser = {
      email: "test@test.com",
      password: 123456
    };

    return chai
      .request(app)
      .post("/auth")
      .send(newUser)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
      });
  });
});

// it("should add a blog post on POST", function() {
//   const newPost = {
//     title: "Lorem ip some",
//     content: "foo foo foo foo",
//     author: "Emma Goldman"
//   };
//   const expectedKeys = ["id", "publishDate"].concat(Object.keys(newPost));

//   return chai
//     .request(app)
//     .post("/blog-posts")
//     .send(newPost)
//     .then(function(res) {
//       expect(res).to.have.status(201);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a("object");
//       expect(res.body).to.have.all.keys(expectedKeys);
//       expect(res.body.title).to.equal(newPost.title);
//       expect(res.body.content).to.equal(newPost.content);
//       expect(res.body.author).to.equal(newPost.author);
//     });
// });