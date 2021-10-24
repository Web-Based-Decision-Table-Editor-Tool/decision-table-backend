import express, {Application, Request, Response} from 'express';
import actionController from './rest-controller/action-controller';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Server listening on port ' + port);
});

app.listen(port, ()=> {
    console.log('Server successfully started on port ' + port);
});

// body parser to parse req body as json
app.use(
    cors(),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json()
);

app.use(actionController);
