import { Query } from '../index';

const all = () => Query(`select Blogs.*, Authors.name, Authors.email from Blogs join Authors on Blogs.authorid = Authors.id`);

const one = (id: number) => Query(`select Blogs.*, Authors.name, Authors.email from Blogs join Authors on Blogs.authorid = Authors.id where Blogs.id = ?`, [id]);

const insert = (title: string, content: string, authorid: number) => Query(`insert into Blogs (title, content, authorid) values (?)`, [[title, content, authorid]]);

const destroy = (id: number) => Query(`delete from Blogs where id = ?`, [id]);

const edit = (title: string, content: string, id: number) => Query(`update Blogs set title = ?, content = ? where id = ?`, [title, content, id]);





export default {
    all,
    one,
    insert,
    destroy,
    edit
}