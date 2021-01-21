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
  }
}));

const Results = ({
  legalsmenutitle,
  legalsurls,
  className,
}) => {
  const classes = useStyles();
  const handleopen = (url) => {
    window.open(url)
  }
  return (
    <Card className={clsx(classes.root, className)} >
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          {
            legalsmenutitle.map((val, index) => {
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
                    onClick={() => { handleopen(legalsurls[index]) }}
                  >
                    <a href="#"
                      style={{ textDecoration: 'none', color: '#000' }}
                    >
                      {val.title}
                    </a>
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
  legalsmenutitle: PropTypes.array.isRequired,
  legalsurls: PropTypes.array.isRequired
};

Results.defaultProps = {
  legalsmenutitle: [],
  legalsurls: []
};

export default Results;
