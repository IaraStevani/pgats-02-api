const request = require('supertest');

const obterToken = async (usuario, senha) => {
    const respostaLogin = await request(process.env.BASE_URL_REST)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': usuario,
            'password': senha
        })

    return respostaLogin.body.token;
}

module.exports = {
    obterToken
};