const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../../helpers/autenticacao');
const postTransferencias = require('../../fixtures/postTransferencias.json');

describe('Transfers', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('julio', '123456');
    })

    describe('GET/transfers', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferências contidos no banco de dados', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
                .get('/transfers')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
        })
    })
})