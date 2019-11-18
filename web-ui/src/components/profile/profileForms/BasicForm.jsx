import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import uuid from 'uuidv4';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from '../styles';

//Components
import FileUpload from '../helperComponents/FileUpload';

//Query
import { USER_QUERY_PROFILE_BASIC } from '../Profile.Queries';

const BasicForm = () => {
  // const [lifeVision, setLifeVision] = React.useState('To Be');
  const classes = useStyles();
  const { data, loading, error } = useQuery(USER_QUERY_PROFILE_BASIC);
  // const [profile, setProfile] = useState()
  if (loading) return <LinearProgress />;
  if (error) return <p>Error ...</p>;

  const { user_first_name, user_last_name, user_email } = data.users[0];
  const {
    high_school_graduation_year,
    life_vision_tobe,
    life_vision_togive,
    life_vision_tohave,
    intended_major,
    career_goal
  } = data.users[0].student_profiles[0];

  const textFields = [
    { heading: 'To be', value: life_vision_tobe },
    { heading: 'To give', value: life_vision_togive },
    { heading: 'To have', value: life_vision_tohave },
    { heading: 'Career Goal', value: career_goal },
    { heading: 'Intended Major', value: intended_major }
  ];

  const infoFields = [
    { heading: 'First Name', value: user_first_name },
    { heading: 'Last Name', value: user_last_name },
    { heading: 'Email Address', value: user_email }
  ];

  return (
    <form>
      <Grid container spacing={0}>
        {/* Name/Last Name/ Email  */}
        <Grid
          item
          container
          spacing={2}
          xs={12}
          className={classes.formSection}
        >
          <Grid item container xs={12} md={6} lg={4}>
            {infoFields.map(field => (
              <TextField
                key={uuid()}
                label={field.heading}
                margin='normal'
                defaultValue={field.value || ''}
                variant='filled'
                fullWidth
              />
            ))}
          </Grid>

          <Grid
            item
            container
            justify='center'
            alignItems='center'
            xs={12}
            md={4}
            lg={2}
          >
            <FileUpload />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          spacing={2}
          className={classes.formSection}
        >
          <Grid item xs={12} md={4} lg={3}>
            <TextField
              label='High School Graduation Year'
              type='number'
              fullWidth
              margin='normal'
              defaultValue={high_school_graduation_year}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <TextField
              label='High School ZIP Code'
              placeholder='Placeholder'
              fullWidth
              margin='normal'
              defaultValue='39167'
              variant='outlined'
            />
          </Grid>
        </Grid>
        {/* Life vision and Goal */}
        <Grid
          item
          container
          xs={12}
          md={10}
          lg={6}
          className={classes.formSection}
        >
          <h5>Life vision</h5>
          {textFields.map(field => (
            <Grid item xs={12} key={uuid()}>
              <p className={classes.pre}>{field.heading}</p>
              <TextareaAutosize
                rows={2}
                className={classes.textArea}
                placeholder={`${field.heading}...`}
                defaultValue={field.value}
              />
            </Grid>
          ))}
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
export default BasicForm;
