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

const MarketListView = ({ intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [marketings, setMarketings] = useState([]);

  const getMarketings = useCallback(async () => {
    try {
      const response = await axios.get('/api/marketing');

      if (isMountedRef.current) {
        setMarketings(response.data.marketings);
      }
    } catch (err) {
      //
    }
  }, [isMountedRef]);

  useEffect(() => {
    getMarketings();
  }, [getMarketings]);

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.marketingsList)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.marketingsList)}
          crumbs={[
            {
              label: 'Menu',
            }
          ]}
        />
        <Box mt={3}>
          <Results
            marketings={marketings}
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

export default connectIntl(mapStateToProps)(MarketListView);
