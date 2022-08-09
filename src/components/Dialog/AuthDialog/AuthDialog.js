import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Hidden,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { green } from '@mui/material/colors';
import { Close as CloseIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate } from 'react-router-dom';

import { loginAction } from '../../../redux/slices/account';
import { addNotificationAction } from '../../../redux/slices/notifications';

const useStyles = makeStyles((theme) => ({
  image: {
    background: `url(${process.env.PUBLIC_URL + '/ZeroJourneyer/login.png'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  leftContainer: {
    height: 300,
    padding: theme.spacing(2),
  },
  leftGrid: {
    height: '100%',
  },
  buttonProgress: {
    color: green[500],
  },
  notStarted: {
    margin: theme.spacing(3),
  },
}));

function AuthDialog({
  open,
  handleClose,
  isFetching,
  isLoggedIn,
  user,
  login,
  addNotification,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const t = useTranslate();

  const navigate = useNavigate();

  useEffect(() => {
    if (open && isLoggedIn) {
      navigate('/mentor');
    }
  }, [isLoggedIn, user, open, navigate]);

  const doLogin = () => {
    if (!username || !password) {
      addNotification({
        message: 'لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!',
        type: 'error',
      });
      return;
    }
    login({ username, password });
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <Grid container direction="row" justifyContent="center">
        <Grid
          item
          xs={12}
          sm={7}
          container
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
          className={classes.leftContainer}>
          <Grid container item direction="row">
            <Grid item container justifyContent="center" alignItems="center">
              <Typography component="h3" variant="h2" align="center">
                {t('login')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              value={username}
              label={t('username')}
              type="text"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ className: 'ltr-input' }}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              value={password}
              label={t('password')}
              fullWidth
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ className: 'ltr-input' }}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              onClick={doLogin}
              disabled={isFetching}
              color="primary">
              {isFetching ? (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              ) : (
                  t('login')
                )}
            </Button>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item sm={5} className={classes.image}></Grid>
        </Hidden>
      </Grid>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.account.isFetching,
  isLoggedIn: state.account.token,
  user: state.account.user,
});

export default connect(mapStateToProps, {
  login: loginAction,
  addNotification: addNotificationAction,
})(AuthDialog);