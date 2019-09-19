import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';

class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            name: '',
            amount: ''
        }
    }

    async handleSubmit() {
        event.preventDefault();
        try {
            let token = await this.props.stripe.createToken({ name: this.state.name });
            console.log(token);
            //have a post error and it console logs error (card error)
            let amount = this.state.amount;
            await fetch(`/api/donate`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ token, amount })
            })
            //this await fetch post creates a post error
        } catch (error) {
            throw error;
        }
    }


    render() {
        return (
            <main className="container">
                <form action="" className="form-group border border-dark rounded shadow-lg p-3" 
                onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => this.handleSubmit()}
                >
                    <label htmlFor="" className="m-2">Name</label>
                    <input type="text" placeholder="What is your name?" value={this.state.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })} className="form-control border borer-dark" />
                    <label htmlFor="" className="m-2">Amount</label>
                    <input type="text" placeholder="How much?" value={this.state.amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ amount: e.target.value })} className="form-control border borer-dark" />
                    <CardElement className="border border-dark m-2" />
                    <button className="btn btn-primary border border-dark m-2">Pay Now</button>
                </form>
            </main>
        ) 
    }
}



interface IFormProps extends ReactStripeElements.InjectedStripeProps { }

interface IFormState { 
    name: string;
    amount: string;
}


export default injectStripe(Form)