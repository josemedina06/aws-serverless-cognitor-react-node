import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { GET_FAVORITES, INSERT_FAVORITES } from './../../../graphql/worksheets/self-analysis/Favorites';
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

const Favorites = (props) => {
    const [user_id, setUserID] = useState(Number);
    const [count, setCount] = useState(Number);
    const [likes, setLikes] = useState(Array);
    const [unlikes, setUnlikes] = useState(Array);

    useEffect(() => {
        async function fetchData() {
            const userid = props.user.id
            const { client } = props;
            const { data, error } = await client.query({query: GET_FAVORITES, variables: {user_id: userid}});
            if (data.likes.length > 0) {
                setUserID(userid);
                setCount(0);
                setLikes(data.likes);
                setUnlikes(data.unlikes);
            } else {
                setUserID(userid);
                setCount(1);
            }
        };
        fetchData();
    }, []);

    const handleClick = () => {
        props.client.mutate({
            mutation: INSERT_FAVORITES,
            variables: {
                user_id: user_id,
                count: count,
                likes: setLike(),
                unlikes: setUnlike()
            }
        }).then(props.history.push("/worksheet"));
    };

    const likesTable = () => {
        let tbody = [];
        for (let index = 0; index < 5; index++) {
            tbody.push(
                <tr key = {index}>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { likes[index] ? likes[index].like : '' }></input></td>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { likes[index] ? likes[index].example : '' }></input></td>
                    <td><input type = 'hidden' defaultValue = { likes[index] ? likes[index].id : '' }></input></td>
                </tr> 
            );            
        };
        return tbody;
    };

    const unlikesTable = () => {
        let tbody = [];
        for (let index = 0; index < 5; index++) {
            tbody.push(
                <tr key = { index }>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { unlikes[index] ? unlikes[index].unlike : '' }></input></td>
                    <td><input className = 'h-80 p-100' type = 'text' defaultValue = { unlikes[index] ? unlikes[index].example : '' }></input></td>
                    <td><input type = 'hidden' defaultValue = { unlikes[index] ? unlikes[index].id : '' }></input></td>
                </tr> 
            );            
        };
        return tbody;
    };

    const setLike = () => {
        var likes = [];
        var tbody = document.getElementById('like');
        console.log(tbody)
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var likething = tbody.childNodes[index].childNodes[0].childNodes[0].value;
            var example = tbody.childNodes[index].childNodes[1].childNodes[0].value;
            var id = tbody.childNodes[index].childNodes[2].childNodes[0].value;
            if (likething !== '' && example !== '') {
                const like = new Object();
                if (id !== '') {
                    like.id = id;
                }
                like.user_id = user_id;
                like.like = likething;
                like.example = example;
                likes.push(like)
            } else {
                console.log('one or no');
            }
        }
        return likes;
    };

    const setUnlike = () => {
        var unlikes = [];
        var tbody = document.getElementById('unlike');
        console.log(tbody)
        var count = tbody.childElementCount;
        for (let index = 0; index < count; index++) {
            var unlikething = tbody.childNodes[index].childNodes[0].childNodes[0].value;
            var example = tbody.childNodes[index].childNodes[1].childNodes[0].value;
            var id = tbody.childNodes[index].childNodes[2].childNodes[0].value;
            if (unlikething !== '' && example !== '') {
                const unlike = new Object();
                if (id !== '') {
                    unlike.id = id;
                }
                unlike.user_id = user_id;
                unlike.unlike = unlikething;
                unlike.example = example;
                unlikes.push(unlike)
            } else {
                console.log('one or no');
            }
        }
        return unlikes;
    };

    return(
        <div>
            <div className = 'header'>
                <h2 className = 'center'>2.5 What you like/dislike about yourself</h2>
                <h3 className = 'center'>(15 min)</h3>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>
                        Be truthful and write honestly; do not write superficially.
                    </p>
                    <div className = 'line'></div>
                    <p>(Fill out 5 items)</p>                        
                    <table className = 'p-100'>
                        <thead>
                            <tr className = 'title'>
                                <td className = 'p-40 pl-2'>Things you like about yourself</td>
                                <td className = 'p-60 pl-2'>Examples (how these have manifested in your life)</td>
                            </tr>
                        </thead>
                        <tbody id = 'like'>
                            { likesTable() }
                        </tbody>
                    </table>
                    <br/>
                    <p>(Fill out 5 items)</p>                        
                    <table className = 'p-100'>
                        <thead>
                            <tr className = 'title'>
                                <td className = 'p-40 pl-2'>Things you dislike about yourself</td>
                                <td className = 'p-60 pl-2'>Examples (how these have manifested in your life)</td>
                            </tr>
                        </thead>
                        <tbody id = 'unlike'>
                            { unlikesTable() }
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
) (withApollo(Favorites));