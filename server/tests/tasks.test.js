import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js'; // Ensure the app export in index.js is compatible with ES module
import { setupTestDatabase } from '../helpers/db.js'; // Import the setupTestDatabase function

// Use Mocha’s describe/it syntax to structure tests
describe('Todo Database Tests', function () {
  
  // Reset the database before each test
  beforeEach(async function () {
    await setupTestDatabase();
  });

  // Test for creating a new task
  it('should create a new todo item', async function () {
    const res = await request(app)
      .post('/create')
      .send({ text: 'Test Todo' })
      .set('Authorization', 'Bearer your-test-jwt'); // Include auth token if required

    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.text).to.equal('Test Todo');
    expect(res.body.completed).to.be.false; // default value in your `createTask` function
  });

  // Test for fetching all tasks
  it('should fetch all todo items', async function () {
    const res = await request(app).get('/');

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.at.least(0);
  });

  // Test for fetching a single task
  it('should fetch a single todo item by ID', async function () {
    const newTask = await request(app)
      .post('/create')
      .send({ text: 'Single Fetch Test' })
      .set('Authorization', 'Bearer your-test-jwt');

    const res = await request(app).get(`/tasks/${newTask.body.id}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body.text).to.equal('Single Fetch Test');
    expect(res.body).to.have.property('id', newTask.body.id);
  });

  // Test for updating a task
  it('should update an existing todo item', async function () {
    const newTask = await request(app)
      .post('/create')
      .send({ text: 'Update Test' })
      .set('Authorization', 'Bearer your-test-jwt');

    const res = await request(app)
      .put(`/tasks/${newTask.body.id}`)
      .send({ text: 'Updated Todo', completed: true })
      .set('Authorization', 'Bearer your-test-jwt');

    expect(res.statusCode).to.equal(200);
    expect(res.body.text).to.equal('Updated Todo');
    expect(res.body.completed).to.be.true;
  });

  // Test for deleting a task
  it('should delete a todo item by ID', async function () {
    const newTask = await request(app)
      .post('/create')
      .send({ text: 'Delete Test' })
      .set('Authorization', 'Bearer your-test-jwt');

    const res = await request(app)
      .delete(`/delete/${newTask.body.id}`)
      .set('Authorization', 'Bearer your-test-jwt');

    expect(res.statusCode).to.equal(204); // No Content status for successful deletion
  });

  // Test for trying to delete a non-existent task
  it('should return 404 when trying to delete a non-existent task', async function () {
    const res = await request(app)
      .delete('/delete/99999') // Assume this ID does not exist
      .set('Authorization', 'Bearer your-test-jwt');

    expect(res.statusCode).to.equal(404);
    expect(res.body.error).to.equal('Task not found');
  });
});
