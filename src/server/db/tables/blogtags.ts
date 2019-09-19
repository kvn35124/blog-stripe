import { Query } from "../index";

const all = (blogid: number) => Query(`Call spGetBlogTAgs(?)`, [blogid]);

const insert = (blogid: number, tagid: number) => Query(`insert into blogtags (blodid, tagid) value (?)`, [[blogid, tagid]]);


export default {
    all,
    insert
}