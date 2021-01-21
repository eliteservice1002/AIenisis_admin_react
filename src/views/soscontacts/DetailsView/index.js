import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Details from './Details';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import { Edit as EditIcon } from 'react-feather';
import Header from 'src/components/HeaderBreadcrumbs';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

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

const ContactsDetailsView = ({ match }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [ contact, setContact ] = useState(null);

  const getContact = useCallback(async () => {
    try {
      const response = await httpClient.get(`api/soscontacts/${params.contactId}`);

      if (isMountedRef.current) {
        setContact(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getContact();
  }, [getContact]);

  if (!contact) {
    return null;
  }


  return (
    <Page
      className={classes.root}
      title="SOScontacts Details"
    >
      <Container maxWidth={false}>
        <Header
          goBack
          actualPage={'SOScontacts Details'}
          buttonRight={{
            label: 'Editar',
            icon: (<EditIcon/>),
            to: `/management/soscontacts/${params.contactId}/edit`,
          }}
        />
        <Box mt={3}>
          <Details contact={contact} />
        </Box>
      </Container>
    </Page>
  );
};

export default ContactsDetailsView;
