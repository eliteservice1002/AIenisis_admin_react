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

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		backgroundColor: theme.palette.background.dark,
	}
}));

const LicensesListView = () => {
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const [ licenses, setLicense ] = useState([]);

	const getLicense = useCallback(async () => {
    try {
      const response = await axios.get('/api/license');
      if (isMountedRef.current) {
        setLicense(response.data.licenses);
      }
    } catch (err) {
      console.log(err)
    }
  }, [isMountedRef]);

	useEffect(() => {
		getLicense();
	}, [getLicense]);

	return (
		<Page
			className={classes.root}
			title="My Licenses"
		>
			<Container maxWidth={false}>
				<Box mt={3}>
					<Results
						licenses={licenses}
					/>
				</Box>
			</Container>
		</Page>
	);
};

export default LicensesListView;
