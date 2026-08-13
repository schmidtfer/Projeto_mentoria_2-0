require("dotenv").config();
const request = require("supertest");

const baseUrl = process.env.API_URL;

const userWorker = process.env.WORKER_USER;
const passwordWorker = process.env.WORKER_PASSWORD;

const userTutor1 = process.env.TUTOR_USER1;
const passwordTutor = process.env.TUTOR_PASSWORD;

let expect;

let token; // Variável para armazenar o token do trabalhador

before(async () => {
    ({ expect } = await import("chai"));
});

describe("GET / Buscar todos os pets (apenas trabalhadores)", () => {

    beforeEach(async () => {
        
        const loginResponse = await request(baseUrl)
            .post('/auth/login-worker')
            .set('Content-Type', 'application/json')
            .send({
                username: userWorker,
                password: passwordWorker
            });

        token = loginResponse.body.token;

        });

    it("Buscar todos os pets (apenas trabalhadores)", async () => {
        const response = await request(baseUrl)
            .get("/pets")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(200);

        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("data");

        expect(response.body.data).to.be.an("array");

       console.log("response.body:", response.body);
    });
});
