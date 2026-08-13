require('dotenv').config();
const request = require('supertest');

const baseUrl = process.env.API_URL;


const userTutor1 = process.env.TUTOR_USER1;
const passwordTutor = process.env.TUTOR_PASSWORD;

let expect;

before(async () => {
    ({ expect } = await import('chai'));
});

describe('Buscar informações do DayCare do pet - tutor', () => {


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
        expect(response.body).to.have.property('role');

    });


    it("Buscar relatório diário do pet", async () => {

        const petId = 1;
        const date = '2026-08-03';

        const response = await request(baseUrl)
            .get(`/daycare/report/${petId}/${date}`)


        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message)
            .to.equal('Relatório recuperado com sucesso');

        expect(response.body).to.have.property('data');

        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('petId');
        expect(response.body.data).to.have.property('date');
        expect(response.body.data).to.have.property('checkin');


        expect(response.body.data).to.have.property('checkout');
        expect(response.body.data).to.have.property('dormiu');
        expect(response.body.data).to.have.property('consumoAlimentar');
        expect(response.body.data.consumoAlimentar).to.equal('esfomeado');

        expect(response.body.data).to.have.property('nivelEnergia');
        expect(response.body.data.nivelEnergia).to.equal('bateria_cheia');

        expect(response.body.data).to.have.property('pagamentoRealizado');


        console.log("response.body:", response.body);
    });


});