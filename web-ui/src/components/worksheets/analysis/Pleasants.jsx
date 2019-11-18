import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { GET_PLEASANTS, INSERT_PLEASANTS } from './../../../graphql/worksheets/self-analysis/Pleasants';
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

const Pleasants = (props) => {
    const [user_id, setUserID] = useState(Number);
    const [count, setCount] = useState(Number);
    const [eventsID, setEventsID] = useState(Number);
    const [events, setEvents] = useState(String);
    const [pleasants, setPleasants] = useState(Array);

    useEffect(() => {
        async function fetchData() {
            const userid = props.user.id
            const { client } = props;
            const { data, error } = await client.query({query: GET_PLEASANTS, variables: {user_id: userid}});
            if (data.events.length > 0) {
                setUserID(userid);
                setCount(0);
                setEventsID(data.events[0].id);
                setEvents(data.events[0].events);
                setPleasants(data.pleasants);
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
            mutation: INSERT_PLEASANTS,
            variables: {
                user_id: user_id,
                count: count,
                pleasants: setPleasant(),
                event: eventObjec
            }
        }).then(props.history.push("/worksheet"));
    };

    const pleasantsTable = () => {
        let tbody = [];
        for (let index = 0; index < 20; index++) {
            tbody.push(
                <tr key = { index }>
                    <td><input className = 'p-100 h-30' type = 'text' defaultValue = { pleasants[index] ? pleasants[index].pleasant : '' }></input></td>
                    <td><input className = 'p-100 h-30' type = 'text' defaultValue = { pleasants[index] ? pleasants[index].reason : '' }></input></td>
                    <td><input type = 'hidden' defaultValue = { pleasants[index] ? pleasants[index].id : '' }></input></td>
                </tr> 
            );            
        };
        return tbody;
    };

    const setPleasant = () => {
        var pleasants = [];
        var tbody = document.getElementById('pleasant');
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var pleasant_name = tbody.childNodes[index].childNodes[0].childNodes[0].value;
            var pleasant_reason = tbody.childNodes[index].childNodes[1].childNodes[0].value;
            var pleasant_id = tbody.childNodes[index].childNodes[2].childNodes[0].value;
            if (pleasant_name !== '' && pleasant_reason !== '') {
                const pleasant = new Object();
                if (pleasant_id !== '') {
                    pleasant.id = pleasant_id
                }
                pleasant.user_id = user_id;
                pleasant.pleasant = pleasant_name;
                pleasant.reason = pleasant_reason;
                pleasants.push(pleasant)
            } else {
                console.log('one or no');
            }
        };
        return pleasants;
    };

    return (
        <div>
            <div className = 'header'>
                <h2 className = 'center'>2.3 Pleasant Events</h2>
                <h3 className = 'center'>(20 min)</h3>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>You must have some happy memories that you enjoyed and/or are proud of. List as many events as possible and briefly describe them. Be authentic, as this worksheet is designed to help you organize your thought process!</p>
                    <div className = 'line'></div>
                    <p>(Fill out at least 15 items)</p>                        
                    <table className = 'p-100'>
                        <thead>
                            <tr className = 'title'>
                                <td className = 'p-20 pl-2'>Pleasant events</td>
                                <td className = 'p-80 pl-2'>Why you felt happy</td>
                            </tr>
                        </thead>
                        <tbody id = 'pleasant'>
                            { pleasantsTable() }
                        </tbody>
                    </table>
                    <br/>
                    <p>What are some common themes/factors among these events, and what do they show about what you love, enjoy, and/or are proud of? What kind of fulfillment do you want to pursue for the rest of your life? (Write at least 3 examples)</p>
                    <textarea className = 'p-100' maxLength="200" rows = '10' defaultValue = { events} onChange = { handleEventChange }></textarea>
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
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (withApollo(Pleasants));
