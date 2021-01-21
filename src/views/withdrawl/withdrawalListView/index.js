import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Results from './Results';
import Page from 'src/components/Page';
import Header from '../header';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
/* utils */
import httpClient from 'src/utils/httpClient';
/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
  }
}));

const WithdrawalListView = ({ intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [withrawals, setWithdrawals] = useState([]);

  const getWithdrawals = useCallback(async () => {
    try {
      const response = await httpClient.get('api/withdrawal/by_user');

      if (isMountedRef.current) {
        setWithdrawals(response.data.withdrawals);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getWithdrawals();
  }, [getWithdrawals]);

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.withrawalList)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.withrawalList)}
          crumbs={[
            {
              label: 'Menu',
            }
          ]}
        />
        <Box mt={3}>
          <Results
            withrawals={withrawals}
            getWithdrawals={getWithdrawals}
          />
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(WithdrawalListView);

