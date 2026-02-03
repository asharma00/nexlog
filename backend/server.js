import express from 'express'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import blogRouter from './routes/blogRoute.js'
import 'dotenv/config'
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import commentRouter from './routes/commentRoute.js'


//app configuration
const port = 3000;
const app = express();
const server = createServer(app);
connectDB();
connectCloudinary();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: "http://localhost:5173", credentials: true}));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});
app.set('io', io);


//API endpoints
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);

app.get('/', (req, res) => {
    res.send('API working');
})

server.listen(port, () => {
    console.log('Server started with active socket on port ' + port);
})