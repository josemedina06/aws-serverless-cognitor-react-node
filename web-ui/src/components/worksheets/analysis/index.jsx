import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import './index.scss';
import Statement from './Statement';
import Dreams from './Dreams';
import Pleasants from './Pleasants';
import Unpleasants from './Unpleasants';
import Favorites from './Favorites';
import Weakness from './Weakness';
import Strength from './Strength';
import { GET_ANALYSIS_CARDS } from './../../../graphql/worksheets/self-analysis';
import { fetchUser } from './../../../reducers/user';
import { setAnalysis } from './../../../reducers/analysis';

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        analysis: state.analysis.analysis
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchUser: () => dispatch(fetchUser()),
        onSetAnalysis: (analysis) => dispatch(setAnalysis(analysis))
    };
};
const Self = (props) => {
    const analysis = props.analysis.map((analysis, index) => {
        return (
            <Link to = {`${props.match.url}/${analysis.url}`} className = "col-lg-4 col-md-6 col-sm-12" key = { index } style = { {textDecoration: 'none', color: 'black'} }>
                <div className = "card card-body card_content">
                    <div className = "center card_title">{ analysis.name }</div>
                    <div className = "center card_date">{ analysis.date }</div>
                </div>
            </Link>
        )
    });
    return(
        <div className = 'container'>
            <div className = 'row'>
                { analysis }
            </div>
        </div>
    );
};

const Analysis = (props) => {

    useEffect(() => {
        async function fetchData() {
            const { client } = props;
            const userid = props.user.id;
            const { data, error } = await client.query({query: GET_ANALYSIS_CARDS, variables: {userid: userid}});
            if (data.analysis.length > 0) {
                const cards = data.analysis.map(anal => (
                    {
                        id: anal.id,
                        name: anal.card_name,
                        url: anal.card_url,
                        date: data.w_analysis[0].date
                    }
                ));
                props.onSetAnalysis(cards);
            };
        };
        fetchData();
    }, []);

    const SelfWithCard = () => {
        return (
            <Self {...props} />
        );
    };

    const Components = [Statement, Dreams, Pleasants, Unpleasants, Favorites, Weakness, Strength]
    const Routes = props.analysis.map((analysis, index) => 
        <Route key = { index } path = { `${ props.match.url }/${analysis.url}` } component = { Components[index] } />
    );

    return(
        <Router history = {props.history}>
            <Switch>
                <Route exact path = { props.match.url } component = { SelfWithCard } />
                { Routes }
            </Switch>
        </Router>
    );
     
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (withApollo(Analysis));