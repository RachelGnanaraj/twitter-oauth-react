import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, savePost, deletePost } from '../Actions/PostActions';
import { Field, reduxForm, reset } from 'redux-form';
import '../Styles/App.css';
import _ from 'lodash';
import PostCard from '../Components/PostCard';
import { getUser, logout, twitterLogin } from '../Actions/UserActions';
import { Link } from 'react-router-dom';
import { required } from '../Helpers/ReduxFormValidation';

import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import {Navbar, Nav, NavItem, Button, Modal} from 'react-bootstrap'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class App extends Component {

    componentDidMount() {
        this.setState({
            isLoading: true,
        });
        this._fetchPosts();
    }

    _fetchPosts() {

        const defaultOptions = {
            headers: {
                "Authorization": 'OAuth oauth_consumer_key="e88clPdLdPh1gWO2Pg4cNC3UQ",oauth_token="2195751156-2lJLlhXqRhnSq4CQ72rOG0uDU5Kc35xJF9opykO",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1520153695",oauth_nonce="8zhing",oauth_version="1.0",oauth_signature="nWhMJEJ2cIj0WYOAoEdG9w9lu7w%3D"' ,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
                "Access-Control-Allow-Headers":"Origin, X-Auth-Token, Client-Security-Token, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
                "Access-Control-Allow-Credentials": false,
                "Access-Control-Max-Age": "86400",
            }
        };
        debugger
        axios.get('https://api.twitter.com/1.1/statuses/home_timeline.json', defaultOptions)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

  renderPosts() {
      return (
          <MuiThemeProvider>
            <Card >
              <CardTitle title="user.name" subtitle="user.screen_name" />
              <CardText>
                  text
              </CardText>
            </Card>
          </MuiThemeProvider>
      );
  }

  renderField(field) {
    const errStyle = {
      borderColor: 'red'
    };
    return (
        <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} className={field.class} style={field.meta.touched && field.meta.error ? errStyle : null}/>
    );
  }

  onSubmit(values) {
    this.props.savePost(values, this.props.user.uid).then(this.props.dispatch(reset('NewPost')));
  }

  render() {
    const { handleSubmit } = this.props;
    console.log(this.props.user.displayName,">>>UserName")
      console.log(this.props,"Get Props here!")
    return (
      <div>

        <Navbar inverse collapseOnSelect style={{marginBottom: '0px'}}>
          <Navbar.Header>
            <MuiThemeProvider>
            <Avatar
                src={this.props.user.photoURL}
                size={40}
            /></MuiThemeProvider>
              <a>Hello! {this.props.user.displayName} </a>
            <Navbar.Toggle />
          </Navbar.Header>
            <Nav pullRight>
              <NavItem eventKey={1} href="#"  onClick={() => {this.props.logout();}}>
                Log out
              </NavItem>
            </Nav>
        </Navbar>

        <div className="container">
          <div className="main">
            {this.renderPosts()}
          </div>

        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewPost'
})(App);

form = connect((state, ownProps) => ({
    posts: state.posts,
    user: state.user
  }), { savePost, getPosts, deletePost, getUser,twitterLogin, logout }
)(form);

export default form;
