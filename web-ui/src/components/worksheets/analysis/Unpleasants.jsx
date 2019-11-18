import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import {GET_UNPLEASANTS, INSERT_UNPLEASANTS} from './../../../graphql/worksheets/self-analysis/Unpleasants';
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

const Unpleasants = (props) => {
    const [user_id, setUserID] = useState(Number);
    const [count, setCount] = useState(Number);
    const [eventsID, setEventsID] = useState(Number);
    const [events, setEvents] = useState(String);
    const [unpleasants, setUnpleasants] = useState(Array); 

    useEffect(() => {
        async function fetchData() {
            const userid = props.user.id
            const { client } = props;
            const { data, error } = await client.query({query: GET_UNPLEASANTS, variables: {user_id: userid}});
            if (data.events.length > 0) {
                setUserID(userid);
                setCount(0);
                setEventsID(data.events[0].id);
                setEvents(data.events[0].events);
                setUnpleasants(data.unpleasants);
            } else {
                setUserID(userid);
                setCount(1);
            }
        };
        fetchData();
    }, []);

    const handleEventChange = (event) => {
        setEvents(event.target.value);
    };

    const handleClick = () => {
        const eventObjec = new Object();

        if (eventsID === 0) {
            eventObjec.user_id = user_id;
            eventObjec.events = events;
        } else {
            eventObjec.id = eventsID;
            eventObjec.user_id = user_id;
            eventObjec.events = events;
        }

        props.client.mutate({
            mutation: INSERT_UNPLEASANTS,
            variables: {
                user_id: user_id,
                count: count,
                unpleasants: setUnpleasant(),
                event: eventObjec
            }
        }).then(props.history.push("/worksheet"));
    };

    const unpleasantsTable = () => {
        let tbody = [];
        for (let index = 0; index < 5; index++) {
            tbody.push(
                <tr key = { index }>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { unpleasants[index] ? unpleasants[index].unpleasant : '' }></input></td>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { unpleasants[index] ? unpleasants[index].reason : '' }></input></td>
                    <td><input type = 'hidden' defaultValue = { unpleasants[index] ? unpleasants[index].id : '' }></input></td>
                </tr> 
            );            
        };
        return tbody;
    };

    const setUnpleasant = () => {
        var unpleasants = [];
        var tbody = document.getElementById('unpleasant');
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var unpleasant_name = tbody.childNodes[index].childNodes[0].childNodes[0].value;
            var unpleasant_reason = tbody.childNodes[index].childNodes[1].childNodes[0].value;
            var unpleasant_id = tbody.childNodes[index].childNodes[2].childNodes[0].value;
            if (unpleasant_name !== '' && unpleasant_reason !== '') {
                const unpleasant = new Object();
                if (unpleasant_id !== '') {
                    unpleasant.id = unpleasant_id;
                }
                unpleasant.user_id = user_id;
                unpleasant.unpleasant = unpleasant_name;
                unpleasant.reason = unpleasant_reason;
                unpleasants.push(unpleasant)
            } else {
                console.log('one or no');
            }
        };
        return unpleasants;
    };

    return(
        <div>
            <div className = 'header'>
                <h2 className = 'center'>2.4 Unpleasant Events</h2>
                <h3 className = 'center'>(20 min)</h3>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>
                        Try to recall some unpleasant memories that happened in your life. 
                        Describe some events that made you angry, frustrated, and/or regretful. 
                        It may be painful, but writing about these bad experiences will help uncover what you truly value. 
                        Therefore, don’t stop at a superficial level. Scoop out your deep emotion and write as vividly as possible about these memories.
                    </p>
                    <div className = 'line'></div>
                    <p>(Fill out at least 3 items)</p>                        
                    <table className = 'p-100'>
                        <thead>
                            <tr className = 'title'>
                                <td className = 'p-20 pl-2'>Unpleasant event</td>
                                <td className = 'p-80 pl-2'>Why you felt unhappy</td>
                            </tr>
                        </thead>
                        <tbody id = 'unpleasant'>
                            { unpleasantsTable() }
                        </tbody>
                    </table>
                    <br/>
                    <p>
                        What are things in common about what you regret or dislike? 
                        How similar were the emotions you felt from these events? Do these bad memories still trouble you?
                    </p>
                    <textarea className = 'p-100' maxLength="200" rows = '10' defaultValue = { events } onChange = { handleEventChange}></textarea>
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
) (withApollo(Unpleasants));