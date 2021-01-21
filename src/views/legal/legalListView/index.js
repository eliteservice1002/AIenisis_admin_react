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

const LegalListView = ({ intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [legalsmenutitle, setLegalsmenutitle] = useState([]);
  const [legalsurls, setLegalsUrls] = useState([]);

  const getLegalsmenutitle = useCallback(async () => {
    try {
      const response = await axios.get('/api/regal');

      if (isMountedRef.current) {
        setLegalsmenutitle(response.data.regals);
      }
    } catch (err) {
      //
    }
  }, [isMountedRef]);

  const getLegalUrls = useCallback(async () => {
    try {
      const response = await httpClient.get('api/legal_doc');

      if (isMountedRef.current) {
        setLegalsUrls(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getLegalsmenutitle();
    getLegalUrls();
  }, [getLegalsmenutitle, getLegalUrls]);

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.legal)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.legal)}
          crumbs={[
            {
              label: 'Menu',
            }
          ]}
        />
        <Box mt={3}>
          <Results
            legalsmenutitle={legalsmenutitle}
            legalsurls={legalsurls}
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

export default connectIntl(mapStateToProps)(LegalListView);
