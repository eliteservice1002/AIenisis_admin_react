import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
}));

const DashCard = ({ title, value, currency, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1} textAlign="center">
        <Typography
          component="h2"
          gutterBottom
          color="textSecondary"
        >
          {title}
        </Typography>
        <Box
          textAlign="center"
          flexWrap="wrap"
        >
          <Typography
            variant="h1"
            color="textPrimary"
          >
            {value}
            {currency}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

DashCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  currency: PropTypes.string,
  value: PropTypes.string
};

export default DashCard;
