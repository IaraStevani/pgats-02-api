import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseURL } from '../../utils/variaveis.js';

const BASE_URL = pegarBaseURL();

export const options = {
    stages: [
        { duration: '5s', target: 10 },
        { duration: '20m', target: 10 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(95)<200', 'max<200'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const res = http.get(BASE_URL + '/users'); 

    check(res, {
        'Validar que o status é 200': (res) => res.status === 200,
    });

    sleep(1);

}