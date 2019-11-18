import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { GET_WEAKNESS, INSERT_WEAKNESS } from './../../../graphql/worksheets/self-analysis/Weakness';
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

const Weakness = (props) => {
    const [user_id, setUserID] = useState(Number);
    const [count, setCount] = useState(Number);
    const [problems, setProblems] = useState(Array);
    const [interpers, setInterpers] = useState(Array);

    useEffect(() => {
        async function fetchData() {
            const userid = props.user.id
            const { client } = props;
            const { data, error } = await client.query({query: GET_WEAKNESS, variables: {user_id: userid}});
            if (data.interpers.length > 0) {
                setUserID(userid);
                setCount(0);
                setProblems(data.problems);
                setInterpers(data.interpers);
            } else {
                setUserID(userid);
                setCount(1);
            }
        };
        fetchData();
    }, []);

    const handleClick = () => {
        props.client.mutate({
            mutation: INSERT_WEAKNESS,
            variables: {
                user_id: user_id,
                count: count,
                problems: setProblem(),
                inters: setInterper()
            }
        }).then(props.history.push("/worksheet"));
    };

    const problemsTable = () => {
        let tbody = [];
        for (let index = 0; index < 5; index++) {
            tbody.push(
                <tr key = { index }>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { problems[index] ? problems[index].problems : '' }></input></td>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { problems[index] ? problems[index].example : '' }></input></td>
                    <td><input type = 'hidden' defaultValue = { problems[index] ? problems[index].id : '' }></input></td>
                </tr> 
            );            
        };
        return tbody;
    };

    const interpersTable = () => {
        let tbody = [];
        for (let index = 0; index < 5; index++) {
            tbody.push(
                <tr key = { index }>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { interpers[index] ? interpers[index].interpersonal : '' }></input></td>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { interpers[index] ? interpers[index].example : '' }></input></td>
                    <td><input type = 'hidden' defaultValue = { interpers[index] ? interpers[index].id : '' }></input></td>
                </tr> 
            );            
        };
        return tbody;
    };

    const setProblem = () => {
        var problems = [];
        var tbody = document.getElementById('problem');
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var pro = tbody.childNodes[index].childNodes[0].childNodes[0].value;
            var example = tbody.childNodes[index].childNodes[1].childNodes[0].value;
            var id = tbody.childNodes[index].childNodes[2].childNodes[0].value;
            if (pro !== '' && example !== '') {
                const problem = new Object();
                if (id !== '') {
                    problem.id = id;
                }
                problem.user_id = user_id;
                problem.problems = pro;
                problem.example = example;
                problems.push(problem)
            } else {
                console.log('one or no');
            }
        }
        return problems;
    };

    const setInterper = () => {
        var interpers = [];
        var tbody = document.getElementById('interper');
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var personal = tbody.childNodes[index].childNodes[0].childNodes[0].value;
            var example = tbody.childNodes[index].childNodes[1].childNodes[0].value;
            var id = tbody.childNodes[index].childNodes[2].childNodes[0].value;
            if (personal !== '' && example !== '') {
                const interper = new Object();
                if (id !== '') {
                    interper.id = id;
                }
                interper.user_id = user_id;
                interper.interpersonal = personal;
                interper.example = example;
                interpers.push(interper)
            } else {
                console.log('one or no');
            }
        }
        return interpers;
    };

    return(
        <div>
            <div className = 'header'>
                <h2 className = 'center'>2.6 Your Weakness</h2>
                <h3 className = 'center'>(15 min)</h3>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>
                    Although you do not have to strengthen your weaknesses immediately in this worksheet, deeply analyzing them is a crucial first step in becoming resilient and conquering life events later in life.
                    </p>
                    <div className = 'line'></div>
                    <p>(Fill out as many items as you can)</p>                        
                    <table className = 'p-100'>
                        <thead>
                            <tr className = 'title'>
                                <td className = 'p-40 pl-2'>Weakness: Problem-solving skills</td>
                                <td className = 'p-60 pl-2'>Examples</td>
                            </tr>
                        </thead>
                        <tbody id = "problem">
                            { problemsTable() }
                        </tbody>
                    </table>
                    <br/>                     
                    <table className = 'p-100'>
                        <thead>
                            <tr className = 'title'>
                                <td className = 'p-40 pl-2'>Weakness: Interpersonal skills</td>
                                <td className = 'p-60 pl-2'>Examples</td>
                            </tr>
                        </thead>
                        <tbody id = "interper">
                            { interpersTable() }
                        </tbody>
                    </table>
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
    );
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
) (withApollo(Weakness));