import Server from './classes/server';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = Server.instance;

// Bodyparser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Cors
server.app.use(cors({
	origin: true,
	credentials:true
}));

// Start the app
server.start(() => {
    console.log("LA aplicacion esta lista");
});