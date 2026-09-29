import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
import { check } from 'k6'
import http from 'k6/http'

const baseUrl = 'http://localhost:3000'

export default function () {

    // Endpoint 1
    const response = http.get(baseUrl + '/api/v1/pizzas')

    check(response, {
        'GET pizzas status code 200': (r) => r.status === 200
    })

    // Endpoint 2
    const response01 = http.get(baseUrl + '/api/v1/pizzas/1')

    check(response01, {
        'GET pizza por ID status code 200': (r) => r.status === 200
    })

    // Endpoint 3
    // aquí irá tu POST

    // Endpoint 4
    // aquí irá tu PUT/DELETE, dependiendo de tu API
}

export function handleSummary(data) {
    return {
        "index.html": htmlReport(data)
    }
}