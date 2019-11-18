import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';
import Cookie from 'universal-cookie';
import { GET_WORKSHEETS, GET_MODULES, GET_USER } from './../../graphql/content/Worksheets';
import Dashboard from './../worksheets/dashboard/index';
import Analysis from './../worksheets/analysis/index';
import Core from './../worksheets/core-value/index';
import Life from './../worksheets/life/index';
import Career from './../worksheets/career/index';
import Colledge from './../worksheets/college/index';
import Implementation from './../worksheets/implementation/index';
import Essays from './../worksheets/essays/index';
import { setUser } from './../../reducers/user';
import { setWorksheet } from './../../reducers/worksheet';

const mapStateToProps = (state) => {
    return {
        worksheets: state.worksheet.worksheets,
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetWorksheets: worksheets => dispatch(setWorksheet(worksheets)),
        onSetUser: userinfo => dispatch(setUser(userinfo))
    };
};

const Progress = styled.div`
  width: ${props => props.per}%;
  height: 100%;
  background-color: green;
`;

const Module = (props) => {
    console.log(props)
    const modules = props.modules.map((module, index) => {
        return (
            (
                props.worksheets[index] !== undefined ? 
                <Link
                    key = { index }
                    to = { `${props.match.url}/${props.worksheets[index].worksheet_url}` }
                    className = "col-lg-4 col-md-6 col-sm-12"
                    style = { {textDecoration: 'none', color: 'black'} }
                >                
                    <div className = "module_content">
                        <div className = "module_title center">{ module[0].module_name }</div>
                        <div className = "module_date center">{ module[0].date }</div>
                    </div>
                    <div className = "module_time">
                        <Progress per={ module[0].count / module[0].total * 100 }/>
                    </div>                
                </Link>
                : 
                <div><p>Loading ... </p></div>
            )
        )
    });

    return(
        modules
    );
}


const Worksheets = (props) => {
    const [modules, setModules] = useState([]);

    useEffect (() => {
        async function fetchData() {
            const cookie = new Cookie();
            const { client } = props;
            const {data: data0, error: error0} = await client.query({query: GET_WORKSHEETS});
            const { data: data1, error: error1 } = await client.query({query: GET_USER, variables: {sub: cookie.get('sub')}});
            if (data0.worksheets) {
                props.onSetWorksheets(data0.worksheets);
            };
            if (data1.user[0]) {
                var userid = data1.user[0].user_id;
                props.onSetUser(data1.user[0]);
                const { data: data2, error: error2 } = await client.query({query: GET_MODULES, variables: {user_id: userid}});
                if (data2) {
                    setModules(Object.values(data2))
                };
            };
        };
        fetchData();
    }, []);

    const WorksheetWithModule = () => {
        return (
            <div className = "container">
                <div className = "row">
                    <Module modules = { modules } { ...props }/>
                </div>
            </div>
        );
    };
    
    const Components = [Dashboard, Analysis, Core, Life, Career, Colledge, Implementation, Essays];
    const Routes = props.worksheets.map((worksheet, index) => 
        ( (worksheet !== undefined) ? <Route key = { index } path = { `${props.match.url}/${worksheet.worksheet_url}` } component = { Components[index] }></Route> : <div key = { index }><p>Loading ...</p></div>)
    );

    return (
        <Router history={ props.history }>
            <Switch>
                <Route exact path = { props.match.url } component = { WorksheetWithModule } />
                { Routes }
            </Switch>
        </Router>
    );
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (withApollo(Worksheets));