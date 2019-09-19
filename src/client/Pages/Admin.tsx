import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ITag } from '../Utilities/interfaces';
import {  json, User } from '../Utilities/api';



class Admin extends React.Component<IAdminProps, IAdminState> {


    constructor(props: IAdminProps) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: [],
            selectedTag: '0'
        };
    }


    async componentDidMount() {
        if(!User || User.userid === null || User.role !== 'admin') {
            this.props.history.replace('/login');
        }
        try {
            let r = await fetch(`/api/tags`);
            let tags = await r.json();
            this.setState({ tags });
        } catch (error) {
            console.log(error);
        }
    }


    async handlePost() {
        event.preventDefault();
        let newPost = {
            title: this.state.title,
            content: this.state.content,
            authorid: User.userid,
        }
        try {

            let result = await json(`/api/blogs`, 'POST', newPost);

            let insertedBlogId = await r.json();
            let result2 = await fetch(`/api/blogtags`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json"  
                },
                body: JSON.stringify({blogid: insertedBlogId, tagid: this.state.selectedTag })
            });
            if (result.ok) {
                this.props.history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    resetBlog() {
        event.preventDefault();
        this.setState({
            title: '',
            content: ''
        });
    }



    render() {
        return(
            <section className="row justify-content-center" >
                <article className="col-12">
                    <form className="form-group border rounded border-dark m-2">
                        <label className="m-2">Title:</label>
                        <input value={this.state.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })} type="text" className="form-control" />
                        <label className="form-control">Tags:</label>
                        <select value={this.state.selectedTag} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ selectedTag: e.target.value})} className="form-control"> 
                            <option value="0">Select a tag...</option>
                            {this.state.tags.map(tag => (
                                <option value={tag.id} >{tag.name}</option>
                            ))}
                        </select>
                        <label className="m-2">Content:</label>
                        <textarea value={this.state.content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })} rows= "20" className="form-control" ></textarea>
                        <div className="d-flex justify-content-around">
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handlePost()} className="btn btn-primary m-2">Post Blog</button>
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.resetBlog()} className="btn btn-danger m-2">Reset</button>
                        </div>
                    </form>
                </article>
            </section >
        )
    }
}




interface IAdminProps extends RouteComponentProps{}
interface IAdminState {
    title: string;
    content: string;
    tags: Array<ITag>;
    selectedTag: string;
}

export default Admin;