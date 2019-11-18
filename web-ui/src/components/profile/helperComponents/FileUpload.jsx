import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  profilePic: {
    margin: 0,
    width: 215,
    height: 215,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // TEST BACKGROUND
    background: 'url(https://picsum.photos/210)',
    cursor: 'pointer',
    position: 'relative'
  },
  fabProgress: {
    color: blue[500],
    position: 'absolute',
    top: -5,
    left: -5,
    zIndex: 1
  },
  picBox: {
    position: 'relative'
  }
});

const FileUpload = () => {
  const [profilePic, setProfilePic] = useState({});
  const [profilePicPath, setProfilePath] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const inputFile = useRef(null);

  const classes = useStyles();

  const fileSelectedHandler = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(e.target.files[0]);

    setFileLoading(true);

    reader.onloadend = () => {
      setProfilePic(file);
      setProfilePath(reader.result);
    };
    setTimeout(() => setFileLoading(false), 1000);
  };

  console.log('profilePic', profilePic);

  return (
    <React.Fragment>
      <input
        style={{ display: 'none' }}
        type='file'
        ref={inputFile}
        onChange={fileSelectedHandler}
      />
      <Box className={classes.picBox}>
        <Avatar
          alt='Remy Sharp'
          src={profilePicPath}
          className={classes.profilePic}
          onClick={() => inputFile.current.click()}
        />
        {fileLoading && (
          <CircularProgress
            thickness={0.6}
            size={225}
            className={classes.fabProgress}
          />
        )}
      </Box>
    </React.Fragment>
  );
};

export default FileUpload;
