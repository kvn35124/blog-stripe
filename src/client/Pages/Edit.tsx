import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';



class Edit extends React.Component<IEditProps, IEditState> {

    constructor(props: IEditProps) {
        super(props);
        this.state = {

            title: '',
            content: '',
            id: 0,
            authorid: 0


        }
    }

    async handleEdit() {
        event.preventDefault();
        let editedBlog = {
            title: this.state.title,
            content: this.state.content
        };
        try {
            let r = await fetch(`/api/blogs/${this.props.match.params.id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(editedBlog)
            });
            if(r.ok) {
                this.props.history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }


    async deleteBlog() {
        event.preventDefault();
        try {
            let r = await fetch(`/api/blogs/${this.props.match.params.id}`, {
                method: 'DELETE'
            });
            if(r.ok) {
                this.props.history.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        try {
            let r = await fetch(`/api/blogs/${this.props.match.params.id}`);
            let blog = await r.json();
            this.setState({
                title: blog.title,
                content: blog.content,
                id: blog.id,
                authorid: blog.authorid
            });
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return (

            <section className="row justify-content-center" >
                <article className="col-12">
                    <form className="form-group border rounded border-dark m-2">
                        <label className="m-2">Title:</label>
                        <input value={this.state.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })} type="text" className="form-control" />
                        <label className="m-2">Content:</label>
                        <textarea value={this.state.content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })} rows="20" className="form-control" ></textarea>
                        <div className="d-flex justify-content-around">
                            <Link to={`/view/${this.props.match.params.id}`} className="btn btn-primary m-2">Go Back</Link>
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleEdit()} className="btn btn-success m-2">Save Edit</button>
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.deleteBlog()} className="btn btn-danger m-2">Delete</button>
                        </div>
                    </form>
                </article>
            </section >
        )
    }
}


interface IEditProps extends RouteComponentProps<{ id: string }> { }

interface IEditState {
    title: string;
    content: string;
    id: number;
    authorid: number;
}



export default Edit