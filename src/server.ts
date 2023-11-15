import express, { type Express, type Request, type Response, type RequestHandler } from 'express';
import DataProvider from './dataProvider';
import { type Player, type PlayerData } from './types';
import SalaryService from './salaryService';

const app: Express = express();

app.use(express.json());

let data: PlayerData;

app.get('/salary/player/:id', (async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id === undefined || isNaN(Number(id))) {
    res.status(404).send();
  } else {
    if (data === undefined) {
      data = await (new DataProvider()).load();
    }
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
}) as RequestHandler);

export default app;
