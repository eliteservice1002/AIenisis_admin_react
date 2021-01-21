import React, { useEffect, useState, useCallback } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import httpClient from 'src/utils/httpClient';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  makeStyles,
  CardContent,
  TablePagination,
  Grid,
  Button
} from '@material-ui/core';

/* utils */
import {
  applySort,
  applyFilters,
  applyPagination,
  sortOptionsDefault,
} from 'src/utils/listTableSettings';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormHelperText-root.Mui-required': {
      color: 'red'
    }
  },
  titleDiv: {
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #333',
    borderRadius: 30,
    width: '100%',
    fontSize: 17
  },
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  btndialogClose: {
    textAlign: 'right',
    marginBottom: 10
  },
  btndialogclose: {
    cursor: 'pointer'
  },
  btndialogenviar: {
    backgroundColor: 'rgb(52,103,177)',
    color: '#fff',
    width: 140
  },
  dialogselect: {
    width: 400
  },
  gridLabel: {
    textAlign: 'center',
    alignSelf: 'center',
  },
}));

const Results = ({
  withrawals,
  className,
  getWithdrawals,
  intl
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [selectedWithrawals, setSelectedWithrawals] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [sort, setSort] = useState(sortOptionsDefault[2].value);
  const isMountedRef = useIsMountedRef();
  const [filters] = useState({
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const getWithdrawAmount = useCallback(async () => {
    try {
      const response = await httpClient.get('api/withdrawal/balance_by_user');

      if (isMountedRef.current) {
        setWithdrawAmount(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getWithdrawAmount();
  }, [])

  const filteredWithrawals = applyFilters(withrawals, query, filters, ['title_es']);
  const sortedWithrawals = applySort(filteredWithrawals, sort);
  const paginatedWithrawals = applyPagination(sortedWithrawals, page, limit);
  const defaultError = 'El campo es requerido';

  return (
    <Card className={clsx(classes.root, className)} >
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <div className={classes.titleDiv}>
          <div>{formatMessage(intl.retreats)}</div>
        </div>
      </Box>
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <Formik
          initialValues={{
            amount_withdraw: '',
          }}
          validationSchema={Yup.object().shape({
            amount_withdraw: Yup.number().min(0)
          })}
          onSubmit={
            async (values, { setErrors }) => {
              try {
                setIsSubmitting(true);
                let data = { ...values };
                let errors = {};
                if (Object.keys(errors).length) {
                  setErrors(errors);
                  setIsSubmitting(false);
                  return;
                }

                httpClient.post('api/withdrawal/by_user', {
                  amount_usd: data.amount_withdraw,
                  // amount_btc: withdrawAmount.balance_btc,
                })
                  .then(json => {
                    if (json.success) {
                      enqueueSnackbar('Withrawal is requested successfully.', {
                        variant: 'success'
                      });
                      getWithdrawals()
                    }
                  })
                  .catch((error) => {
                    enqueueSnackbar('Withrawal request has been failed.', {
                      variant: 'error'
                    });
                  });

              } catch (err) {
                console.error(err);
                setIsSubmitting(false);
                enqueueSnackbar(
                  'invalid error',
                  { variant: 'error' }
                )
              }
            }
          }
        >
          {({
            errors,
            values,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
          }) => {

            return (
              <form onSubmit={handleSubmit} className={clsx(classes.root)} >
                <Card>
                  <CardContent>
                    <Grid container spacing={3} >
                      <Grid item md={4} xs={4} className={clsx(classes.gridLabel)} >
                        {formatMessage(intl.current_balance_usd)}
                      </Grid>

                      <Grid item md={7} xs={7} >
                        <div>{withdrawAmount.balance_usd}</div>
                      </Grid>

                      <Grid item md={4} xs={4} className={clsx(classes.gridLabel)} >
                        {formatMessage(intl.equivalence_btc)}
                      </Grid>

                      <Grid item md={7} xs={7} >
                        <div>{withdrawAmount.balance_btc}</div>
                      </Grid>

                      <Grid item md={4} xs={4} className={clsx(classes.gridLabel)} >
                        {formatMessage(intl.amount_to_withdraw)}
                      </Grid>

                      <Grid item md={7} xs={7} >
                        <TextField
                          fullWidth
                          required
                          variant="outlined"
                          type="number"
                          name="amount_withdraw"
                          error={Boolean(touched.amount_withdraw && !values.amount_withdraw)}
                          helperText={
                            (Boolean(touched.amount_withdraw && !values.amount_withdraw))
                              ? defaultError : ''
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched.amount_withdraw}
                          value={values.amount_withdraw}
                        />
                      </Grid>
                      <Grid item md={7} xs={7}></Grid>
                      <Grid item md={4} xs={4} style={{ textAlign: 'center' }} >
                        <Button
                          type="submit"
                          color="secondary"
                          variant="contained"
                          disabled={isSubmitting}
                        >
                          {formatMessage(intl.request_withdraw)}
                        </Button>
                      </Grid>
                      <Grid item md={4} xs={12} style={{ textAlign: 'center' }} ></Grid>
                      <Grid item />
                    </Grid>
                  </CardContent>
                </Card>
              </form>
            )
          }}
        </Formik>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  {formatMessage(intl.application_date)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.amount_usd)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.equivalence_btc)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.payment_date)}
								</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWithrawals.map((withrawal, index) => {
                const isWithrawalselected = selectedWithrawals.includes(index);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isWithrawalselected}
                  >
                    <TableCell align="center" style={{ cursor: 'pointer' }}>
                      {withrawal.requested_at}
                    </TableCell>
                    <TableCell align="center">
                      {withrawal.amount_usd}
                    </TableCell>
                    <TableCell align="center">
                      {withrawal.amount_btc}
                    </TableCell>
                    <TableCell align="center">
                      {withrawal.withdrew_at}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={filteredWithrawals.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  withrawals: PropTypes.array.isRequired,
  getWithdrawals: PropTypes.func
};

Results.defaultProps = {
  withrawals: []
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

const mapDispatchToProps = (dispatch) => ({
  // 
})

export default connectIntl(
  mapStateToProps,
  mapDispatchToProps
)(Results);
