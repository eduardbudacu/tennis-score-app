import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.use(express.json());

app.get('/salary/player/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        res.status(404).send();
    } else {
        const playerId: number = Number(id);
        if (playerId >= 5) {
            res.status(404).send();
        } else {
            res.status(200).json({
                id: 1, 
                name: "Novak Djokovic",
                totalSalary: 100
            });
        }
    }
});

export default app;