import http from 'k6/http';
import { check, sleep } from 'k6';
import { obterToken } from '../../helpers/autenticaocaPerformance.js';

export const options = {
    iterations: 1,
};

export default function () {
    const token = obterToken();

    const url = 'http://localhost:3000/transfers';

    const payload = JSON.stringify({
        from: 'julio',
        to: 'priscila',
        value: 11
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };

    let res = http.post(url, payload, params);

    check(res, {
        'Validar que o status é 201': (res) => res.status === 201,
    });

    sleep(1);
}