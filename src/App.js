import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {createNetworkInterface} from 'react-apollo';
import {ApolloClient} from 'react-apollo';
import {ApolloProvider} from 'react-apollo';
import {gql , graphql} from 'react-apollo';

const mutation = gql `mutation generateToken{generateAuthMobileToken(phoneNumber:"9663675922"){token}}`

const networkInterface = createNetworkInterface({
  uri:"http://81fcf0de.ngrok.io/graphql",
});

const apolloClient = new ApolloClient({
  networkInterface:networkInterface
});

class App extends Component {

  handleSubmit = (e) => {
    console.log("handle submit");
    e.preventDefault();
    
    console.log("this.props",this.props);
    this.props.mutate();
    let loginInput = this.refs.login;
    console.log(loginInput.value);
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <form onSubmit={this.handleSubmit }>
        <input placeholder="githug login" ref="login" />
        <button>Add Login</button>
      </form>
        
      </div>
    );
  }
}


let AppwithMutation = graphql(mutation)(App);

class AppForMutation extends React.Component{
  constructor(){
    super();
  }

  render(){
    return (
      <ApolloProvider client = {apolloClient}>
         <AppwithMutation/>
      </ApolloProvider>
      
    )
  }
}

export default AppForMutation;
