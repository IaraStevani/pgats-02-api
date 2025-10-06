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

    describe('POST/transfers', () => {

        it('Deve retornar sucesso com 201 quando a transferência for menor ou igual a R$5.000,00', async () => {
            const bodyTransferencia = { ...postTransferencias };

            const resposta = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencia)
            expect(resposta.status).to.equal(201);
        })

        it('Deve retornar falha com 400 quando a transferências for acima de R$ 5.000,00, só podem ser feitas para favorecido', async () => {
            it('Deve retornar sucesso com 201 quando a transferência for menor ou igual a R$5.000,00', async () => {
                const bodyTransferencia = { ...postTransferencias };
                bodyTransferencia.value = 5000.01;

                const resposta = await request(process.env.BASE_URL_REST)
                    .post('/transfers')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${token}`)
                    .send(bodyTransferencia)
                expect(resposta.status).to.equal(400);
            })
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
})