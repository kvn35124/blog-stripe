import {Query} from '../index';


const insert = (userid: number) => Query(`insert into accesstokens (userid) value (?)`, [[userid]]);
const update = (id: number, token: string) => Query(`update accesstokens set token = ? where id = ?`, [token, id]);

const findone = (id: number, token: string) => Query(`select * from accesstokens where id = ? and token = ?`, [id, token]);

export default {
    insert,
    update,
    findone
}