import React from 'react';
import {
  Container,
  Grid,
  Button,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import DailyPerformance from './DailyPerformance';
import DashCard from './DashCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DashboardView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Aienesis Bot 0.4"
    >
      <Container maxWidth={false}>
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
          >
            <Button
              color="primary"
            >
              Invitation link
            </Button>
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <DashCard 
              title="ROI DAILY"
              value="0.48"
              currency="%" 
            />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <DashCard 
              title="ROI WEEKLY"
              value="0.3"
              currency="%" 
            />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <DashCard 
              title="MONTHLY"
              value="15"
              currency="%" 
            />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <DashCard 
              title="MY LICENSE"
              value="0.48"
              currency="" 
            />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <DashCard 
              title="VALUE OF MY LICENSES"
              value="5000"
              currency="$" 
            />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
          >
            <DashCard 
              title="CURRENT BALANCE"
              value="300"
              currency="$" 
            />
          </Grid>

          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
            <DailyPerformance />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardView;
