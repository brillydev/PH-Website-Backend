import * as express from 'express';
import { Mail } from '../utils/winston-email';
import { successRes } from '../utils';
import * as parser from 'body-parser';

export const router = express.Router();
console.log('outside');
router.post('/test', (req, res) => {
    console.log('inside');
    const transport = new Mail();
    transport.send(req.body)
    return successRes(res, 'Email Sent');
});
