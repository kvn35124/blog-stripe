import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';

import { ValidToken } from '../utilities/security/tokens';
import db from '../db';

passport.use(new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload = await ValidToken(token);
        let [user]: any = await db.authors.findById(payload.userid);
        // console.log(token);
        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error)
    }
}))