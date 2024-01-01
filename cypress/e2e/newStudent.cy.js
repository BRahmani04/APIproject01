import {postRequestBody, putRequestBody} from '../fixtures/putAndpost.json'

describe('API Project', () => {

    let studentid;

    it('Create a new user', () => {

        cy.request({
            method: 'Post',
            url: Cypress.env('baseUrl'),
            body: postRequestBody,
            headers: {
                'Authorization' : 'Bearer YOUR_TOKEN'
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.lessThan(200)
            cy.validateResponse(response, postRequestBody)
            studentid = response.body.id
        })
    })
    it('Retrieve a specific user-created', () => {
        cy.request({
            method: 'GET',
            url:`${Cypress.env('baseUrl')}/${studentid}`
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.lessThan(200)
            cy.validateResponse(response, postRequestBody)
        })
    })
    it('Update an existing user', () => {
        cy.request({
            method:'PUT',
            url: `${Cypress.env('baseUrl')}/${studentid}`,
            body: putRequestBody,
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.lessThan(200)
            cy.validateResponse(response, putRequestBody)
        })
    })
    it('Retrieve a specific user created to confirm the update.', () => {
        cy.request({
            method: 'GET',
            url:`${Cypress.env('baseUrl')}/${studentid}`
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.lessThan(200)
            cy.validateResponse(response, putRequestBody)
        })
    })
    it('Finally, delete the user that you created.', () => {
        cy.request({
            method: 'DELETE',
            url:`${Cypress.env('baseUrl')}/${studentid}`
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.lessThan(200)

            cy.task('runQuery', 'SELECT * FROM student WHERE email = \'updateBali@gmail.com\'').then((rows) => {
                expect(rows).to.have.length(0)})
        })
    })
})