import { Router } from 'express';
import blogsRouter from './blogs';
import blogtagsRouter from './blogtags';
import tagRouter from './tags';
import { hashPassword } from '../../utilities/security/passwords';
import * as passport from 'passport';


const router = Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', {session: false}, (err, user, info) => {
        // console.log(user);
        if(user) req.user = user;
        return next();
    })(req, res, next);
})

router.use('/blogs', blogsRouter);
router.use('/blogtags', blogtagsRouter);
router.use('/tags', tagRouter);


router.get('/test', async (req, res) => {
    res.json(hashPassword('password'));
})

export default router;