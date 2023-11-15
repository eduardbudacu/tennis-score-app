import app from '../../src/server';
import supertest from 'supertest';

describe("test add function", () => {
    it("should respond with 404 for non existing endpoint", async () => {
        const response = await supertest(app)
            .get('/not-available')
            .expect(404);
    });

    it("should respond with player stats", async () => {
        const response = await supertest(app)
            .get('/salary/player/1')
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual("Novak Djokovic");
        expect(response.body.totalSalary).toEqual(21250);
    });

    it("should respond with 404 if player not found", async () => {
        const response = await supertest(app)
            .get('/salary/player/5')
            .expect(404);
    });

    it("should respond with 404 if id is not numeric", async () => {
        const response = await supertest(app)
            .get('/salary/player/abc1')
            .expect(404);
    });
});