import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Product from './Product';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const AccountView = () => {
  const classes = useStyles();

  const datas = [
    {
      id: 1,
      name: "Computer",
      description: "Allows you to read the terms and conditions of the license being sold and specify the agreement or disagreement with them",
      quantity: 10,
      price: 178,
    },
    {
      id: 2,
      name: "Computer",
      description: "Allows you to read the terms and conditions of the license being sold and specify the agreement or disagreement with them",
      quantity: 8,
      price: 156,
    },
  ]
  return (
    <Page
      className={classes.root}
      title="Profile"
    >
      <Container maxWidth="lg">
        <Header />
        <Divider />
        <Box mt={3}>
          {
            datas.map((data) => (
              <Product data={data} key={data.id} />
            ))
          }
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView;
