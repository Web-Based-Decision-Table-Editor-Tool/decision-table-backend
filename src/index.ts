import 'reflect-metadata';
import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import defaultRouter from './routes/routes';
import { Socket } from 'net';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Server listening on port ' + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", defaultRouter);

const server = app.listen(port, ()=> {
    console.log('Server successfully started on port ' + port);
});

//for cucumber tests
app.get('/shutdown', (req: Request, res: Response) => {
    try {
        closeServer();
    } catch (error) {
        console.log(error);
    }
});

/* 
Following code is to manage open sockets and shutdown server from cucumber tests
ref: https://stackoverflow.com/questions/18874689/force-close-all-connections-in-a-node-js-http-server
*/

const serverSockets = new Set<Socket>();

server.on('connection', (socket) => {
    /* add socket when it is connected */
    serverSockets.add(socket);
    socket.on("close", () => {
        /* remove socket when it is closed */
        serverSockets.delete(socket);
    });
})

function closeServer() {
    for (const socket of serverSockets.values()) {
        socket.destroy();
    }
    /* after all the sockets are destroyed, we may close the server! */
    server.close((err) => {
        if(err) throw err;

        console.log('Server stopped');
        /* exit gracefully */
        process.exit(0);
    });
}
