import * as express from 'express';

import { hashPassword } from '../../utilities/security/passwords';
import { createToken } from '../../utilities/security/tokens';
import db from '../../db';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let user = req.body;
        user.password = hashPassword(req.body.password);
        let [result]: any = await db.authors.insert(user);
        let token = await createToken({userid: result.insertId});
        res.json({
            token, 
            role: 'admin',
            userid: result.insertId
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

export default router;
