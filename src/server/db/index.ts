import * as mysql from 'mysql';
import config from '../config';

import Blogs from './tables/Blogs';
import blogtags from "./tables/blogtags";
import tags from './tables/tags';
import authors from './tables/authors';
import tokens from './tables/tokens';

export const connection = mysql.createPool(config.mysql);

export const Query = (query: string, values?: any) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
            if(err) reject(err);
            resolve(results);
        })
    })
};




export default {
    Blogs,
    blogtags,
    tags,
    authors,
    tokens
};
