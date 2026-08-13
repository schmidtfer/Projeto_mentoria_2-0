require('dotenv').config();
const request = require('supertest');

const baseUrl = process.env.API_URL;

const userWorker = process.env.WORKER_USER;
const passwordWorker = process.env.WORKER_PASSWORD;


const userTutor1 = process.env.TUTOR_USER1;
const passwordTutor = process.env.TUTOR_PASSWORD;

let expect;

before(async () => {
    ({ expect } = await import('chai'));
});


describe('login', () => {

    describe('POST /auth/login', () => {
        
        it('validar credenciais válidas de trabalhador', async () => {
            const response = await request(baseUrl)
                .post('/auth/login-worker')
                .set('Content-Type', 'application/json')                
                .send({
                    username: userWorker,
                    password: passwordWorker
                });

                const token = response.body.token;

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('role');
            expect(response.body.token).to.be.a('string');

            console.log('Token do trabalhador:', token);
        });


         it('validar credenciais inválidas de trabalhador', async () => {
            const response = await request(baseUrl)
                .post('/auth/login-worker')
                .set('Content-Type', 'application/json')
               .send({
                    username: userWorker,
                    password: 124578
                });

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('message');
            });

        it('validar credenciais válidas de tutor', async () => {
            const response = await request(baseUrl)
                .post('/auth/login-tutor')
                .set('Content-Type', 'application/json')
                .send({
                    username: userTutor1,
                    password: passwordTutor
                });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('role');
        });    

        it('validar credenciais inválidas do tutor', async () => {
            const response = await request(baseUrl)
                .post('/auth/login-tutor')
                .set('Content-Type', 'application/json')
                .send({
                    username: tutor_Bobs,
                    password: passwordTutor
                });

    

            expect(response.status).to.equal(401);
            expect(response.body).to.have.property('message');       
        });    
        
        
    });

});
