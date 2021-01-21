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
import axios from 'src/utils/axios';
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

const BalanceListView = ({ intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [licenses, setLicenses] = useState([]);
  const [referrals, setReferrals] = useState([]);

  const getLicenses = useCallback(async () => {
    try {
      const response = await httpClient.get('api/license/performance_by_user');

      if (isMountedRef.current) {
        setLicenses(response.data.licenses);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  const getReferrals = useCallback(async () => {
    try {
      const response = await httpClient.get('api/invitee/by_inviter');

      if (isMountedRef.current) {
        setReferrals(response.data.invitees);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getLicenses();
    getReferrals();
  }, [getLicenses, getReferrals]);

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.balanceList)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.balanceList)}
          crumbs={[
            {
              label: 'Menu',
            }
          ]}
        />
        <Box mt={3}>
          <Results
            licenses={licenses}
            referrals={referrals}
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

export default connectIntl(mapStateToProps)(BalanceListView);
