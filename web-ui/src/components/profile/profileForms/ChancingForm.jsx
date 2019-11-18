import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import uuid from 'uuidv4';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from '../styles';
// Components
import RadioEthnicity from '../helperComponents/RadioEthnicity';
import InputObject from '../helperComponents/InputObject';
//Query
import { USER_QUERY_PROFILE_ACADEMIC } from '../Profile.Queries';

const ChancingForm = () => {
  const classes = useStyles();

  const [satObjects, setSatObject] = useState([
    { subject: 'Math', score: '600' },
    { subject: 'Reading and Writing', score: '490' }
  ]);
  const [actObjects, setActObject] = useState([
    { subject: 'Math', score: 34 },
    { subject: 'Reading', score: 32 },
    { subject: 'English', score: 33 },
    { subject: 'Science', score: 35 }
  ]);

  const [satSubjectTests, setSubjectTest] = useState([
    { subject: 'Math', score: '600' }
  ]);

  const { data, loading, error } = useQuery(USER_QUERY_PROFILE_ACADEMIC);
  if (loading) return <LinearProgress />;
  if (error) return console.log('ERROR', error);

  const {
    gpa,
    n_other_acedemic_classes,
    n_ap_ib_classes,
    n_honors_classes,
    n_national_internation_extracurriculars,
    n_district_level_extracurriculars,
    n_school_level_extracurriculars,
    n_state_level_extracurriculars,
    race_or_ethnicity
  } = data.users[0].student_profiles[0];

  const classFields = [
    { class: 'AP/IB classes', value: n_ap_ib_classes },
    { class: 'Honor classes', value: n_honors_classes },
    { class: 'Other academic classes', value: n_other_acedemic_classes }
  ];

  // const setNewObjectSat = subject => {
  //   console.log(subject);
  //   setSatObject([...satObjects, subject]);
  // };
  // const setNewObjectAct = subject => {
  //   setActObject([...actObjects, subject]);
  // };

  const setSatSubjectTest = subject => {
    setSubjectTest([...satSubjectTests, subject]);
  };

  return (
    <form>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <p>
            Your admissions chance are calculated based on the following
            information.
          </p>
        </Grid>
        {/* Academic Information */}
        <Grid container item xs={12}>
          <h4>1. Academic information</h4>
          <Grid item xs={12} className={classes.infoBlock}>
            <div>
              <p className={classes.pre}>GPA</p>
              <TextField
                type='number'
                margin='normal'
                defaultValue={gpa}
                placeholder='GPA'
                variant='outlined'
              />
              <p className={classes.after}>
                Unweighted (4.00 scale). If you don't know your Unweighted GPA,
                please use this{' '}
                <span className={classes.calcLink}>calculator</span>
              </p>
            </div>
          </Grid>
          {/* STUDENT'S SAT OBJECTS */}
          <Grid item xs={12} className={classes.infoBlock}>
            <h5>SAT</h5>
            <InputObject objects={satObjects} />
          </Grid>
          {/* STUDENT'S ACT OBJECTS */}
          <Grid item xs={12} className={classes.infoBlock}>
            <h5>ACT</h5>
            <InputObject objects={actObjects} />
          </Grid>
          {/* STUDENT'S ACT OBJECTS */}
          <Grid item xs={12} className={classes.infoBlock}>
            <h5>SAT ||</h5>
            <InputObject
              objects={satSubjectTests}
              addNewObject={setSatSubjectTest}
              btnText='Add SAT ||'
            />
          </Grid>

          <Grid item xs={12} className={classes.infoBlock}>
            <h5>
              How many classes you complete by the end of senior year(12
              <sup>th</sup>grade)
            </h5>
            <Grid item container spacing={2} xs={12}>
              {classFields.map(item => (
                <Grid item xs={10} sm={6} md={5} lg={3} key={uuid()}>
                  <p className={classes.pre}>{item.class}</p>
                  <TextField
                    type='number'
                    margin='normal'
                    defaultValue={item.value}
                    variant='outlined'
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Extracurricular activities*/}
        <Grid item container direction='column' xs={12}>
          <h4>2. Extracurricular activities</h4>
          <div className={classes.infoBlock}>
            <div>
              <h5>Extracurricular activities</h5>
              <p className={classes.pre}>
                Did you know that admissions officers consider Extracurricular
                activities and students' level of involvement heavily? Our light
                admissions algorithm takes students' activity and rigor into
                consideration.
              </p>
            </div>
          </div>

          <div className={classes.infoBlock}>
            <h5>Enter number of activities at the...</h5>
            <Grid item container spacing={1} xs={12}>
              <Grid item xs={12} md={10} lg={6}>
                <Box className={classes.flexBoxRow}>
                  <p className={classes.pre}>
                    National or international level{' '}
                    <HelpOutlineIcon className={classes.iconHover} />
                  </p>
                  <TextField
                    margin='normal'
                    defaultValue={n_national_internation_extracurriculars}
                    variant='outlined'
                  />
                </Box>
                <Box className={classes.flexBoxRow}>
                  <p className={classes.pre}>
                    State level{' '}
                    <HelpOutlineIcon className={classes.iconHover} />
                  </p>
                  <TextField
                    margin='normal'
                    defaultValue={n_state_level_extracurriculars}
                    variant='outlined'
                  />
                </Box>
                <Box className={classes.flexBoxRow}>
                  <p className={classes.pre}>
                    District Level{' '}
                    <HelpOutlineIcon className={classes.iconHover} />
                  </p>
                  <TextField
                    margin='normal'
                    defaultValue={n_district_level_extracurriculars}
                    variant='outlined'
                  />
                </Box>
                <Box className={classes.flexBoxRow}>
                  <p className={classes.pre}>
                    School Level{' '}
                    <HelpOutlineIcon className={classes.iconHover} />
                  </p>
                  <TextField
                    margin='normal'
                    defaultValue={n_school_level_extracurriculars}
                    variant='outlined'
                  />
                </Box>
              </Grid>
              {/* <Grid item xs={4}>
                <Box>Tip box</Box>
              </Grid> */}
            </Grid>
          </div>
        </Grid>

        <Grid item container direction='column' xs={12}>
          <h4 m={4}>3. Personal information</h4>
          <div className={classes.infoBlock}>
            <h5>Race or ethnicity</h5>
            <Grid item container spacing={1} xs={12}>
              <Grid item xs={12} md={10}>
                <RadioEthnicity curentEthninity={race_or_ethnicity} />
              </Grid>
              {/* <Grid item xs={4}>
                <Box>Tip box</Box>
              </Grid> */}
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
        Save
      </Button>
    </form>
  );
};
export default ChancingForm;
