import {Router} from 'express';
import db from '../../db';


const router = Router();


router.get('/', async (req, res) => {
    try {
        let results = await db.tags.all();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json("This code ain't working");
    }
});



export default router;
