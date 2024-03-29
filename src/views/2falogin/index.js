import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  makeStyles,
  TextField,
  Button
} from '@material-ui/core';
import Page from '../../components/Page';
import useAuth from '../../hooks/useAuth';

const methodIcons = {
  'Auth0': '/static/images/auth0.svg',
  'FirebaseAuth': '/static/images/firebase.svg',
  'JWT': '/static/images/jwt.svg'
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const { method } = useAuth();
  const [secret, setSecret] = useState('');
  const { login_2fa } = useAuth();

  const handlesubmit = async () => {
    if (secret === '')
      return;
    try {
      await login_2fa(secret);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Box
          mb={8}
          display="flex"
          justifyContent="center"
        >
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h2"
                >
                  Enter 2FA Code
                </Typography>
              </div>
              <div className={classes.currentMethodIcon}>
                <img
                  alt="Auth method"
                  src={methodIcons[method]}
                />
              </div>
            </Box>
            <Box
              flexGrow={1}
              mt={3}
            >
              <TextField
                fullWidth
                label="Code"
                name="name"
                required
                type="number"
                onChange={(e) => setSecret(e.target.value)}
                value={secret}
                variant="outlined"
              />
              <Box mt={2} style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ width: '100%', marginTop: 100 }}
                  onClick={handlesubmit}
                >
                  LOG IN
                </Button>
              </Box>
            </Box>
            {/* <Box my={3}>
              <Divider />
            </Box> */}
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default LoginView;
