import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import db from '../db';
import { comparePassword } from '../utilities/security/passwords';


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    session: false
}, async (email, password, done) => {
    try {
        let [author]: any = await db.authors.findByEmail(email);
        if (author && comparePassword(password, author.password)) {
            delete author.password
            done(null, author);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
}));




