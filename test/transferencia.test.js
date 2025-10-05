const request = require('supertest');
const { expect } = require('chai');

describe('Transfers', () => {
    describe('POST/transfers', () => {
        it('Deve retornar sucesso com 201 quando a transferência for menor ou igual a R$5.000,00', async () => {
            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio',
                    'password': '123456'
                })

            const token = respostaLogin.body.token;

            const resposta = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'from': 'julio',
                    'to': 'priscila',
                    'value': 11
                })
            expect(resposta.status).to.equal(201);
        })

        it('Deve retornar falha com 400 quando a transferências for acima de R$ 5.000,00, só podem ser feitas para favorecido', async () => {
            it('Deve retornar sucesso com 201 quando a transferência for menor ou igual a R$5.000,00', async () => {
                const respostaLogin = await request('http://localhost:3000')
                    .post('/users/login')
                    .set('Content-Type', 'application/json')
                    .send({
                        'username': 'julio',
                        'password': '123456'
                    })

                const token = respostaLogin.body.token;

                const resposta = await request('http://localhost:3000')
                    .post('/transfers')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        'from': 'julio',
                        'to': 'priscila',
                        'value': 5000.01
                    })
                expect(resposta.status).to.equal(400);                
            })
        })

    })
})