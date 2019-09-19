import {Query} from '../index';

const findByEmail = (email: string) => Query(`select * from authors where email = ?`, [email]);
const findById = (id: number) => Query(`Select * from authors where id = ?`, [id]);
const insert = (user: string) => Query(`insert into authors (name, email, password) values ?`, [[user]]);



export default {
    findByEmail,
    findById,
    insert
}