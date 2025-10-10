const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../../helpers/autenticacao');
const postUsuario = require('../../fixtures/postUsuario.json');

describe('Users', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('julio', '123456');
    })

    describe('POST//users/register', () => {

        it('Deve retornar sucesso com 201 ao registrar novo usuário', async () => {
            const bodyUsuario = { ...postUsuario };
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send(postUsuario)

            expect(resposta.status).to.equal(201);
        })
    })
})




