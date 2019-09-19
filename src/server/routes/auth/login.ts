import { Router } from 'express';
import * as passport from 'passport';
import { createToken } from '../../utilities/security/tokens';



const router = Router();

router.post('/', passport.authenticate('local'), async (req: any, res) => {
    try {
        let token = await createToken({ userid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            userid: req.user.id
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


export default router;