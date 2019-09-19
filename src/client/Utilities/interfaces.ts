



export interface IBlog {
    id: number;
    title: string;
    content: string;
    authorid: number;
    name: string;
}


export interface ITag {
    id: number;
    _created: Date;
    name: string;
}