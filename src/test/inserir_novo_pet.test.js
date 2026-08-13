require('dotenv').config();
const request = require('supertest');

const baseUrl = process.env.API_URL;

const userWorker = process.env.WORKER_USER;
const passwordWorker = process.env.WORKER_PASSWORD;

const novoPet = require('../fixtures/post_inserir_novo_pet.json');

let token;

let expect;

before(async () => {
    ({ expect } = await import('chai'));
});


  describe('POST / inserir novo pet', () => {

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
        
        it('inserir pet com sucesso', async () => {
            const bodyInserirPet = {...novoPet}
            bodyInserirPet.name = "Bolo";
            bodyInserirPet.age = 17;
            bodyInserirPet.weight = 20;
            bodyInserirPet.tutorId = 8;

            const response = await request(baseUrl)
                .post('/pets')
                .set("Authorization", `Bearer ${token}`)
                .send(bodyInserirPet);

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('id');
            console.log ('bodyInserirPet:', bodyInserirPet);

            })
        })