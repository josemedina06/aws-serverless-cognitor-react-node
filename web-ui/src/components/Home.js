import React, { useState, useEffect} from 'react';
import { Route, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import ApolloClient from 'apollo-boost';
import { GET_USER } from './../graphql/content/Worksheets';
import Cookie from 'universal-cookie';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';
import SettingIcon from '@material-ui/icons/Settings';
import Nav from './Nav';
import SideBar from "./SideBar";
import Profile from "./pages/Profile";
import Worksheets from "./pages/Worksheets";
import Friends from "./pages/Friends";
import Feedback from "./pages/Feedback";
import Settings from "./pages/Settings";
import Logout from "./auth/Logout";
import LcHome from "./lc/LcHome";


const Wrapper = styled.div `
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const PageContent = styled.div `
    border-left: solid;
    border-left-color: gray;
    flex: 1;
    margin-top: 0%;
    padding-top: 5%;
`;

const studentWrapper = props => {
    console.log( props)
    return(
        <Wrapper>
            <SideBar location = { props.location }>
                <SideBar.Entry pathname = { '/' } label = { 'Profile' } />
                <SideBar.Entry pathname = { '/worksheet' } label = { 'Worksheets' } />
                <SideBar.Entry pathname = { '/friend' } label = { 'Refer a friend' } />
                <SideBar.Entry pathname = { '/feedback' } label = { 'Feedback' } />
                <SideBar.Entry pathname = { '/logout' } label = { 'Logout' } />
                <SideBar.Entry pathname = { '/setting' } icon = { <SettingIcon /> } />
            </SideBar>
            <PageContent>
                <Route path = '/worksheet' component = { Worksheets } />
                <Route path = '/friend' component = { Friends } />
                <Route path = '/feedback' component = { Feedback } />
                <Route path = '/logout' component = { Logout } />
                <Route path = '/setting' component = { Settings } />
                <Route exact path = '/' component = { Profile } />
            </PageContent>
        </Wrapper>
    );
}


const lcWrapper = props => {
    return(
        <Wrapper>
            <SideBar location = { props.location }>
                <SideBar.Entry pathname = { '/' } label = { 'LcHome' } />
                <SideBar.Entry pathname = { '/logout' } label = { 'Logout' } />
            </SideBar>
            <PageContent>
                <Route path = '/' component = { LcHome } />
                <Route path = '/logout' component = { Logout } />
            </PageContent>
        </Wrapper>
    );
}

const userMediator = props => {
    console.log("PRADEEP")
    console.log(props.children)
    if (props.userType === 'student'){
        return studentWrapper(props);
    }
    else if (props.userType === 'lead_coach'){
        return lcWrapper(props);
    }
    else{
        return null;
    }
}

const Home = props => {
    const [jwtToken, setToken] = useState('');
    const [sub, setSub] = useState('');
    const [userType, setUserType] = useState('');

    Auth.currentSession().then(userSession => {
        setToken(userSession.getIdToken().getJwtToken());
        const cookies = new Cookie();
        cookies.set('sub', userSession.getIdToken().payload.sub);
        setSub(userSession.getIdToken().payload.sub);
    });

    useEffect(() => {
        Auth.currentSession().then(userSession => {
            setToken(userSession.getIdToken().getJwtToken());
            const cookies = new Cookie();
            cookies.set('sub', userSession.getIdToken().payload.sub);
        }); 
    })

    if (jwtToken) {
        const client = new ApolloClient({
            uri: "http://52.14.192.9/v1/graphql",
            headers: {
                authorization: jwtToken ? `Bearer ${jwtToken}` : ''
            }
        });
        client.query({query: GET_USER, variables: {sub: sub}}).then(response => {
            setUserType(response.data.user[0].user_type);
        });
        props = {...props,userType} 
        return (
            <ApolloProvider client = { client }>
                <Nav />
                {userMediator(props)}
            </ApolloProvider>
        );
    } else {
        return (
            <div>          
                <p align = 'center'>
                    <Link to = '/login'>Login</Link> &nbsp;
                    <Link to = '/register'>Register</Link>
                </p>
            </div>
        )
    }

};

export default Home;