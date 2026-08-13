require('dotenv').config();
const request = require('supertest');

const baseUrl = process.env.API_URL;

const userWorker = process.env.WORKER_USER;
const passwordWorker = process.env.WORKER_PASSWORD;


let token;

let expect;

before(async () => {
    ({ expect } = await import('chai'));
});


describe('Delete ', () => {

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

    it('deletar pet com sucesso', async () => {
        const petIdToDelete = 14; // Substitua pelo ID do pet que deseja deletar

        const response = await request(baseUrl)
            .delete(`/pets/${petIdToDelete}`)
            .set("Authorization", `Bearer ${token}`)


        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Pet deletado com sucesso');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id');

        console.log('Pet deletado com sucesso:', response.body);

    })

})