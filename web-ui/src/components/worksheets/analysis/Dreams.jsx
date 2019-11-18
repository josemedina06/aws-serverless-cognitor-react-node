import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { GET_DREAMS_MODELS, INSERT_DREAMS_MODELS } from './../../../graphql/worksheets/self-analysis/Dreams';
import { fetchUser } from './../../../reducers/user';

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchUser: () => dispatch(fetchUser())
    };
};

const Dreams = (props) => {
    const [user_id, setUserID] = useState(Number);
    const [count, setCount] = useState(Number);
    const [dreamID, setDreamID] = useState(Number);
    const [dreams, setDreams] = useState(String);
    const [models, setModels] = useState(Array);

    useEffect(() => {
        async function fetchData() {
            const userid = props.user.id
            const { client } = props;
            const { data, error } = await client.query({query: GET_DREAMS_MODELS, variables: {user_id: userid}});
            if (data.dreams.length > 0) {
                setUserID(userid);
                setCount(0);
                setDreamID(data.dreams[0].id);
                setDreams(data.dreams[0].dreams);
                setModels(data.models);
            } else {
                setUserID(userid);
                setCount(1);
            }
        };
        fetchData();
    }, []);

    const handleDreamsChange = (event) => {
        setDreams(event.target.value);
    };

    const handleClick = () => {
        const dreamsObjec = new Object();
        
        if (dreamID === 0) {
            dreamsObjec.user_id = user_id;
            dreamsObjec.dreams = dreams
        } else {
            dreamsObjec.id = dreamID;
            dreamsObjec.user_id = user_id;
            dreamsObjec.dreams = dreams;
        };
        console.log(props)
        props.client.mutate({
            mutation: INSERT_DREAMS_MODELS,
            variables: {
                user_id: user_id,
                count: count,
                dreams: dreamsObjec,
                models: setModel()
            }
        }).then(props.history.push("/worksheet"));
    };

    const modelTable = () => {
        let tbody = [];
        for (let index = 0; index <= 4; index++) {
            tbody.push(
                <tr key = { index }>                    
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { models[index] ? models[index].name : '' } ></input></td>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { models[index] ? models[index].reason : '' } ></input></td>
                    <td><input type = 'hidden' defaultValue = { models[index] ? models[index].id : '' }></input></td>
                </tr> 
            );            
        };
        return tbody;
    };

    const setModel = () => {
        var models = [];
        var tbody = document.getElementById('model');
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var name = tbody.childNodes[index].childNodes[0].childNodes[0].value;
            var reason = tbody.childNodes[index].childNodes[1].childNodes[0].value;
            var id = tbody.childNodes[index].childNodes[2].childNodes[0].value;
            if (name !== '' && reason !== '') {
                const model = new Object();
                if (id !== '') {
                    model.id = id;
                };
                model.user_id = user_id;
                model.name = name;
                model.reason = reason;
                models.push(model)
            } else {
                console.log('one or no');
            }
        }
        return models;
    }
    return(
        <div>
            <div className = 'header'>
                <h2 className = 'center'>2.2 Your Dreams and Role Models</h2>
                <h3 className = 'center'>(20 min)</h3>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>
                        Write about your most ambitious dreams, ones that you want to achieve before you die. 
                        Don’t worry about priority, difficulty, size, seriousness, timeline, etc. 
                        Feel free to list personal dreams or professional goals—anything that matters to you. 
                        Be introspective and jot down as many dreams as possible. In the second part of this worksheet, list five of your role models and how/why they inspire you.
                    </p>
                    <div className = 'line'></div>
                    <p>[Your Dreams]</p>
                    <p>(Enter at least 20 dreams)</p>
                    <textarea className = 'p-100' maxLength="200" rows = '10' defaultValue = { dreams } onChange = { handleDreamsChange }></textarea>
                    <p>[Your Role Models]</p>
                    <p>(List 5 people)</p>
                    <table className = 'p-100'>
                        <thead>
                            <tr className = 'title'>
                                <td className = 'p-20 pl-2'>Name</td>
                                <td className = 'p-80 pl-2'>Why are they your role model? How do they inspire you?</td>
                            </tr>
                        </thead>
                        <tbody id = 'model'>
                            { modelTable() }
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
) (withApollo(Dreams));