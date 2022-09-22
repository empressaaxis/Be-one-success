import express from 'express';
import { downloadFile, uploadTheResumes } from '../controllers/student.controllers.js';

const routes = express();

routes.post('/student/upload_resume', uploadTheResumes);
routes.get('/student/download_resume/:name', downloadFile);

export default routes;
