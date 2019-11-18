import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { GET_STRENGTH, INSERT_STRENGTH } from './../../../graphql/worksheets/self-analysis/Strength';
import { GET_WEAKNESS } from './../../../graphql/worksheets/self-analysis/Weakness';
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

const Strength = (props) => {
    const [user_id, setUserID] = useState(Number);
    const [count, setCount] = useState(Number);
    const [strengths, setStrengths] = useState(Array);
    const [problems, setProblems] = useState(Array);
    const [interpers, setInterpers] = useState(Array);

    useEffect(() => {
        async function fetchData() {
            const userid = props.user.id
            const { client } = props;
            const { data: data1, error: error1 } = await client.query({query: GET_STRENGTH, variables: {user_id: userid}});
            if (data1.strengths.length > 0) {
                setUserID(userid);
                setCount(0);
                setStrengths(data1.strengths);                
            } else {
                setUserID(userid);
                setCount(1);
            }
            const { data: data2, error: error2 } = await client.query({query: GET_WEAKNESS, variables: {user_id: userid}});
            if (data2.interpers.length > 0) {
                setProblems(data2.problems);
                setInterpers(data2.interpers);
            }
        };
        fetchData();
    }, []);

    const handleClick = () => {
        props.client.mutate({
            mutation: INSERT_STRENGTH,
            variables: {
                user_id: user_id,
                count: count,
                strengths: setStrength(),
                problems: setProblem(),
                inters: setInter()
            }
        }).then(props.history.push("/worksheet"));
    };

    const strengthTable = () => {
        let tbody = [];
        for (let index = 0; index < 5; index++) {
            tbody.push(
                <tr key = { index }>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { strengths[index] ? strengths[index].strength : '' }></input></td>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { strengths[index] ? strengths[index].downside : '' }></input></td>
                    <td><input type = 'hidden' defaultValue = { strengths[index] ? strengths[index].id : '' }></input></td>
                </tr> 
            );            
        };
        return tbody;
    };

    const weaknessTable = () => {
        let tbody = [];
        for (let index = 0; index < 5; index++) {
            tbody.push(
                <tr key = { index }>
                    <td>
                        <input type = 'hidden' defaultValue = {problems[index] ? problems[index].id : ''}></input>
                        <input type = 'text' defaultValue = {problems[index] ? problems[index].problems : ''} className = 'h-80 p-100'></input>
                        <input type = 'hidden' defaultValue = {problems[index] ? problems[index].example : ''}></input>
                    </td>
                    <td>
                        <input type = 'hidden' defaultValue = {interpers[index] ? interpers[index].id : ''}></input>
                        <input type = 'text' defaultValue = {interpers[index] ? interpers[index].interpersonal : ''} className = 'h-80 p-100'></input>
                        <input type = 'hidden' defaultValue = {interpers[index] ? interpers[index].example : ''}></input>
                    </td>
                </tr> 
            );
        }
        return tbody;
    };

    const setStrength = () => {
        var strengths = [];
        var tbody = document.getElementById('strength');
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var str = tbody.childNodes[index].childNodes[0].childNodes[0].value;
            var downside = tbody.childNodes[index].childNodes[1].childNodes[0].value;
            var id = tbody.childNodes[index].childNodes[2].childNodes[0].value;
            if (str !== '' && downside !== '') {
                const strength = new Object();
                if (id !== '') {
                    strength.id = id;
                }
                strength.user_id = user_id;
                strength.strength = str;
                strength.downside = downside;
                strengths.push(strength)
            } else {
                console.log('one or no');
            }
        }
        return strengths;
    };

    const setProblem = () => {
        var problems = [];
        var tbody = document.getElementById('weakness');
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var id = tbody.childNodes[index].childNodes[0].childNodes[0].value;
            var pro = tbody.childNodes[index].childNodes[0].childNodes[1].value;
            var example = tbody.childNodes[index].childNodes[0].childNodes[2].value;
            if (id !== '') {
                const problem = new Object();
                problem.id = id;
                problem.user_id = user_id;
                problem.problems = pro;
                problem.example = example
                problems.push(problem);
            }
        };
        return problems;
    };

    const setInter = () => {
        var inters = [];
        var tbody = document.getElementById('weakness');
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var id = tbody.childNodes[index].childNodes[1].childNodes[0].value;
            var inte = tbody.childNodes[index].childNodes[1].childNodes[1].value;
            var example = tbody.childNodes[index].childNodes[1].childNodes[2].value;
            if (id !== '') {
                const inter = new Object();
                inter.id = id;
                inter.user_id = user_id;
                inter.interpersonal = inte;
                inter.example = example;
                inters.push(inter);
            }
        }
        console.log(inters);
        return inters;
    };
    
    return(
        <div>
            <div className = 'header'>
                <h2 className = 'center'>2.7 Your Strength</h2>
                <h3 className = 'center'>(15 min)</h3>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>
                        Describe your strengths. 
                        Knowing yourself as a rounded person - both weaknesses and strengths - is very valuable to forming a complete picture of yourself in your mind and can boost self-confidence. 
                    </p>
                    <div className = 'line'></div>
                    <p>(Fill out 5 items)</p>                        
                    <table className = 'p-100'>
                        <thead>
                            <tr className = 'title'>
                                <td className = 'p-40 pl-2'>Your strengths</td>
                                <td className = 'p-60 pl-2'>Potential downsides of the strengths</td>
                            </tr>
                        </thead>
                        <tbody id = 'strength'>
                            { strengthTable() }
                        </tbody>
                    </table>
                    <br/>
                    <p>
                        Review the weaknesses that you identified in the previous worksheet.
                        Feel free to update based on the findings above. Summarize your weaknesses regarding problem-solving skills and interpersonal skills.
                    </p>                 
                    <table className = 'p-100'>
                        <thead>
                            <tr className = 'title'>
                                <td className = 'p-50 pl-2'>Weakness: Problem-solving skills</td>
                                <td className = 'p-50 pl-2'>Weakness: Interpersonal skills</td>
                            </tr>
                        </thead>
                        <tbody id = 'weakness'>
                            { weaknessTable() }
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
) (withApollo(Strength));