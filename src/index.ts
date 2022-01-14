import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import defaultRouter from './routes/routes';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Server listening on port ' + port);
});

app.listen(port, ()=> {
    console.log('Server successfully started on port ' + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", defaultRouter);
