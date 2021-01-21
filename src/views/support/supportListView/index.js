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
/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';
/* utils */
import httpClient from 'src/utils/httpClient';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
  }
}));

const SupportListView = ({ intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [faqs, setFaqs] = useState([]);

  const getFaqs = useCallback(async () => {
    try {
      const response = await httpClient.get('api/faq');

      if (isMountedRef.current) {
        setFaqs(response.data.faqs);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getFaqs();
  }, [getFaqs]);

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.support)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.support)}
          crumbs={[
            {
              label: 'Menu',
            }
          ]}
        />
        <Box mt={3}>
          <Results
            faqs={faqs}
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

export default connectIntl(mapStateToProps)(SupportListView);
