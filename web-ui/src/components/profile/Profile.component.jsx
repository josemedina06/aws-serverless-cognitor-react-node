import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
//Components
import Profiletabs from './profileForms/ProfileTabs';
//Query
import { USER_QUERY_TYPE } from './Profile.Queries';

const useStyles = makeStyles(theme => ({
  profile: {
    flexGrow: 1,
    marginTop: 0
  }
}));

const Profile = props => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(USER_QUERY_TYPE);
  if (loading) return <LinearProgress />;
  if (error) return console.log('ERROR', error);

  //Check if the user is a student
  const isStudent = /student/.test(data.users[0].user_type);
  return (
    <div id='aAAA' className={classes.profile}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {isStudent ? (
            <Profiletabs />
          ) : (
            <h2>Only students can see profile page.</h2>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
