const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../../fixtures/postLogin.json');

describe('Login', () => {
    describe('POST/users/login', () => {
        it('Deve retornar sucesso com 200 com um token em string quando usar credenciais válidas', async () => {
            const bodyLogin = { ...postLogin };
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(postLogin);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        });        
    });
});