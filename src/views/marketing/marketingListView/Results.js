import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  makeStyles,
  CardContent,
  Grid,
  Button
} from '@material-ui/core';
/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    width: '100%',
    padding: 10
  },
  itemDiv: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #333',
    borderRadius: 15,
    width: '100%',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#fff'
  },
  titleDiv: {
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #333',
    borderRadius: 30,
    width: '100%',
    fontSize: 17
  },
}));

const Results = ({
  marketings,
  className,
  intl
}) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} >
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <div className={classes.titleDiv}>
              <div style={{ fontSize: 20, fontWeight: 'bold' }}>{formatMessage(intl.my_affiliate_link)}</div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <div className={classes.titleDiv}>
              <div style={{ color: 'blue', cursor: 'pointer' }}>http://www.xn--jdsfajdfadslkfaldkadsfkadk-yrcgc.com/afiliate283930</div>
            </div>
          </Grid>
          {
            marketings.map((val, index) => {
              return (
                <Grid
                  item
                  md={4}
                  xs={6}
                  key={index}
                >
                  <Button
                    variant="contained"
                    className={classes.itemDiv}
                    key={index + 1}
                  >
                    {val.title}
                  </Button>
                </Grid>
              )
            })
          }
        </Grid>
      </CardContent>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  regal: PropTypes.array.isRequired
};

Results.defaultProps = {
  regal: []
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

const mapDispatchToProps = (dispatch) => ({
  // 
})

export default connectIntl(
  mapStateToProps,
  mapDispatchToProps
)(Results);
