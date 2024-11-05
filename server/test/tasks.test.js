import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index"; // Make sure `index.js` exports your Express app

chai.use(chaiHttp);
const { expect } = chai;

describe("Tasks API", () => {
  // Test suite for retrieving all tasks
  describe("GET /tasks", () => {
    it("should return all tasks", (done) => {
      chai
        .request(app)
        .get("/tasks")
        .end((_, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.be.an("array");
          res.body.forEach(task => {
            chai.expect(task).to.include.all.keys("id", "description");
          });
          done();
        });
    });
  });

  // Test suite for creating a new task
  describe("POST /tasks", () => {
    it("should create a new task", (done) => {
      const newTask = { text: "Sample Task", completed: false };
      chai
        .request(app)
        .post("/tasks")
        .send(newTask)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.have.property("id");
          chai.expect(res.body.text).to.equal(newTask.text);
          done();
        });
    });

    it("should return an error when description is missing", (done) => {
      const incompleteTask = { completed: false };
      chai
        .request(app)
        .post("/tasks")
        .send(incompleteTask)
        .end((err, res) => {
          chai.expect(res).to.have.status(500);
          chai.expect(res.body).to.have.property("error");
          done();
        });
    });
  });

  // Test suite for deleting a task
  describe("DELETE /tasks/:id", () => {
    it("should delete an existing task", (done) => {
      const taskId = 1; // Replace with an existing task ID in your test database
      chai
        .request(app)
        .delete(`/tasks/${taskId}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(204);
          done();
        });
    });

    it("should return an error for invalid ID format", (done) => {
      const invalidId = "1; DROP TABLE tasks;";
      chai
        .request(app)
        .delete(`/tasks/${invalidId}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(500);
          chai.expect(res.body).to.have.property("error");
          done();
        });
    });
  });
});
