import express, { Express, Request, Response } from 'express';
import DataProvider from './dataProvider';
import { Player, PlayerData } from './types';
import SalaryService from './salaryService';


const app: Express = express();

app.use(express.json());

app.get('/salary/player/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    let data: PlayerData;

    if (!data) {
        data = await (new DataProvider).load();
    }

    if (!id || isNaN(Number(id))) {
        res.status(404).send();
    } else {
        const playerId: number = Number(id);
        const salaryService = new SalaryService(data);

        try {
            const player: Player = salaryService.getPlayer(playerId);
            res.status(200).json({
                id: player.id,
                name: player.name,
                totalSalary: salaryService.getSalary(playerId)
            });
        } catch (err) {
            res.status(404).send();
        }
    }
});

export default app;