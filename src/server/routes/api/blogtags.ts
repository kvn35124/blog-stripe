import { Router } from 'express';
import db from '../../db';


const router = Router();

router.get('/:blogid', async (req, res) => {
    try {
        let [blogtags]: any = await db.blogtags.all(req.params.blogid);
        res.json(blogtags);
    } catch (error) {
        console.log(error);
        res.status(500).json("This code ain't working");
    }
});

router.post(`/`, async (req, res) => {
    try {
        let r: any = await db.blogtags.insert(req.body.blogid, req.body.tagid);
        res.json(r);
    } catch (error) {
        console.log(error);
    }
})


export default router;