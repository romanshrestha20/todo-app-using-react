import { describe } from "mocha";
import { insertTestUser } from "../helpers/test";

describe('POST register', () => {
    const email = 'test_user@test_eamil.com';
    const password = 'test_password';
    it ('should create a new user', async (done) => {
        const base_url = 'http://localhost:3000';
        const response = await fetch(base_url + '/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        expect(response.status).toBe(201);
        expect(data).toHaveProperty('id');
        done();
    });
});


    
describe('POST login', () => {
    const email = 'test_user@test_eamil.com';
    const password = 'test_password';
    insertTestUser(email, password);
    it('should login with valid credentials', async (done) => {
        const base_url = 'http://localhost:3001';
        const response = await fetch(base_url + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('email');
        expect(data).toHaveProperty('token');
        done();
    }
    )
});