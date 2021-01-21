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

const InnovationListView = ({ intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [affiliates, setAffiliate] = useState([]);

  const getAffiliate = useCallback(async () => {
    try {
      const response = await httpClient.get('api/invitee/by_inviter');

      if (isMountedRef.current) {
        setAffiliate(response.data.invitees);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAffiliate();
  }, [getAffiliate]);

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.affiliateList)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.affiliateList)}
          crumbs={[
            {
              label: 'Menu',
            }
          ]}
        />
        <Box mt={3}>
          <Results
            affiliates={affiliates}
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

export default connectIntl(mapStateToProps)(InnovationListView);
