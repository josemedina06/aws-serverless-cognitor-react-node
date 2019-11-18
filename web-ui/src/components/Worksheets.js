import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_MODULES } from '../utils/Schema';
import Module from './Module';
import { user_id } from './../reducers';

function clickHandler(index) {
  console.log(index);
  if (index === 1) {
    window.location.assign('/self-analysis');
  }
}

function Modules() {
  return (
    <Query query={GET_MODULES} variables={{ user_id: user_id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading ...</p>;
        }
        if (error) {
          return <p>Error :(</p>;
        }
        return (
          <Module modules={Object.values(data)} onClickHandler={clickHandler} />
        );
      }}
    </Query>
  );
}

class Worksheets extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <Modules />
        </div>
      </div>
    );
  }
}

export default Worksheets;
