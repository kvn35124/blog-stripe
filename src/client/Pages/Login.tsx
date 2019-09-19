import * as React from 'react';
import { json, SetAcessToken } from '../Utilities/api';
import { RouteComponentProps } from 'react-router';



class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
    }

    async handleLoginSubmit() {

        event.preventDefault();

        try {
            let result = await json(`/auth/login`, 'POST', {
                email: this.state.email,
                password: this.state.password
            });
            console.log(result); //false

            if(result) {
                SetAcessToken(result.token, { userid: result.userid, role: result.role });
                if(result.role === 'admin') {
                    this.props.history.push('/admin');
                } else {
                    this.props.history.push('/');
                }
            } else {
            console.log('Invalid Credentials');
            }
        } catch (error) {
            throw error;
        }

    }



    render() {
        return (

            <section className="row justify-content-center" >
                <article className="col-12">
                    <form className="form-group border rounded border-dark m-2">
                        <label className="m-2">Email:</label>
                        <input value={this.state.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({email: e.target.value})} type="email" className="form-control" />
                        <label className="form-control">Password:</label>
                        <input value={this.state.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({password: e.target.value})}  type="password" className="form-control" ></input>
                        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleLoginSubmit()} className="btn btn-primary btn-block my-2">Login</button>
                    </form>
                </article>
            </section >

        )
    }
}


interface ILoginProps extends RouteComponentProps {}
interface ILoginState {
    email: string;
    password: string;
}


export default Login;