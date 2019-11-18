import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { GET_STATEMENT, INSEERT_STATEMENT } from './../../../graphql/worksheets/self-analysis/Statement';
import { fetchUser } from './../../../reducers/user';

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: sub => dispatch(fetchUser(sub))
    };
};

const Statement = (props) => {
    const [user_id, setUserID] = useState(Number);
    const [count, setCount] = useState(Number);
    const [statementid, setStatementID] = useState(Number);
    const [statement, setStatement] = useState(String);
    
    useEffect(()=> {
        async function fetchData() {
            const userid = props.user.id
            const { client } = props;
            const { data, error} = await client.query({query: GET_STATEMENT, variables: {user_id: userid}});
            if (data.statement.length > 0) {
                setUserID(userid);
                setCount(0);
                setStatementID(data.statement[0].id);
                setStatement(data.statement[0].statement);
            } else {
                setUserID(userid)
                setCount(1);
            }
        };
        fetchData();
    }, []);

    const handleChange = (event) => {
        setStatement(event.target.value);
    };

    const handleClick = () => {
        const stateObjec = new Object();

        if (setStatementID === 0) {
            stateObjec.user_id = user_id;
            stateObjec.statement = statement;
        } else {
            stateObjec.id = statementid;
            stateObjec.user_id = user_id;
            stateObjec.statement = statement;
        };

        props.client.mutate({
            mutation: INSEERT_STATEMENT,
            variables: {
                user_id: user_id,
                count: count,
                statement: stateObjec
            }
        }).then(props.history.push("/worksheet"));
    };

    return (
        <div>
            <div className = 'header'>
                <h2 className = 'center'>2.1 State of Commitment</h2>
                <h3 className = 'center'>(15 min)</h3>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>Write about why YOU (not your parents) have decided to participate in the WeAdmit college admissions program. Be authentic to yourself and log how you feel now as well as what you ultimately want to achieve through participation in this program. This statement will help you when you get stuck and want to give up by reminding you of your motivation to start in the first place.</p>
                    <div className = 'line'></div>
                    <p>(limit: 200 words)</p>
                    <textarea  className = 'p-100' maxLength="200" rows = '10' defaultValue = { statement } onChange = { handleChange }></textarea>
                </div>
            </div>
            <div className = 'center'>
                <Button
                    onClick = { handleClick }
                    className = 'pl-4 pr-4'
                    variant = 'success'
                >
                    Save
                </Button>
            </div>
        </div>
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
) (withApollo(Statement));