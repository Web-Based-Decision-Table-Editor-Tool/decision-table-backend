import express, {Application, Request, Response} from 'express';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Server listening on port ' + port);
});

app.listen(port, ()=> {
    console.log('Server successfully started on port ' + port);
})
