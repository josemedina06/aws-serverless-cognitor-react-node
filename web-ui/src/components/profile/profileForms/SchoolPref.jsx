import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from '../styles';
import LinearProgress from '@material-ui/core/LinearProgress';

//Components
import CheckRegions from '../helperComponents/CheckRegions';

//Query
import { USER_QUERY_PROFILE_PREFS } from '../Profile.Queries';

const SchoolPref = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(USER_QUERY_PROFILE_PREFS);
  // const [profile, setProfile] = useState()
  if (loading) return <LinearProgress />;
  if (error) return <p>Error ...</p>;

  const {
    region_preference_college,
    state_preference_college
  } = data.users[0].student_profiles[0];
  return (
    <form>
      <Grid container spacing={2}>
        {/* Extracurricular activities*/}
        <Grid item container xs={12}>
          <div className={classes.infoBlock}>
            <Grid item xs={12} md={12}>
              <p className={classes.pre}>
                Which states are you most interested in ? (optional)
              </p>
              <TextField
                margin='normal'
                style={{ minWidth: '30rem' }}
                defaultValue={state_preference_college}
                placeholder='States'
                variant='outlined'
              />
            </Grid>
          </div>
        </Grid>
        <Grid item container xs={12}>
          <div className={classes.infoBlock}>
            <Grid item xs={12} md={12}>
              <p className={classes.pre}>
                Choose the regions where you'd most like to attend college.
                (optional)
              </p>
              <CheckRegions regionList={region_preference_college} />
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Button
        size='large'
        type='submit'
        variant='contained'
        color='primary'
        className={classes.button}
      >
        Save Preferences
      </Button>
    </form>
  );
};
export default SchoolPref;
