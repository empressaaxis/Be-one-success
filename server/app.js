import express from 'express';
import bodyParser from 'body-parser';
import mongoDbConnect from './config/db.config.js';
import authRoutes from './routes/auth.routes.js';
import studentsRoutes from './routes/students.routes.js';

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}))

const port = process.env.PORT || 3002;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    return next();
});

app.use('/api', authRoutes);
app.use('/api', studentsRoutes);


app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome on Be-One Success APIs'
    });
});
  
app.use((req, res) => {
    res.type('json').status(404).json({
        message: '404 Endpoint not found',
        status: 404
    });
});


app.listen(port, () => console.log(`App is listening on port ${port}`))
mongoDbConnect();

export default app;
  