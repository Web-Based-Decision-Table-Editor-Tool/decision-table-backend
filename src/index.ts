import express, {Application, Request, Response} from 'express';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Server listening on port ' + port);
});

//Incorect syntax, this is GET syntax (demo purposes only)
app.post('/rule/add/:tableid', (req: Request, res: Response)=>{
    //Calling addRule service to add rule to table, using data from this post request
    res.send('Server listening on port ' + port);
});

app.listen(port, ()=> {
    console.log('Server successfully started on port ' + port);
})
