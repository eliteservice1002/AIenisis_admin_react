import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  makeStyles,
  TablePagination,
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
  }
}));

const Results = ({
  licenses,
  referrals,
  className,
  intl
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [selectedlicenses, setSelectedlicenses] = useState([]);
  const [selectedreferrals, setSelectedreferrals] = useState([]);
  const [sort, setSort] = useState(sortOptionsDefault[2].value);
  const [filters] = useState({
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredlicenses = applyFilters(licenses, query, filters, ['title_es']);
  const sortedlicenses = applySort(filteredlicenses, sort);
  const paginatedlicenses = applyPagination(sortedlicenses, page, limit);

  const filteredreferrals = applyFilters(referrals, query, filters, ['title_es']);
  const sortedreferrals = applySort(filteredreferrals, sort);
  const paginatedreferrals = applyPagination(sortedreferrals, page, limit);

  return (
    <Card className={clsx(classes.root, className)} >
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <div className={classes.titleDiv}>
          <div>{formatMessage(intl.performance_of_my_licenses)}</div>
        </div>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  {formatMessage(intl.date)}
                </TableCell>
                <TableCell align="center">
                  {formatMessage(intl.performance_percent)}
                </TableCell>
                <TableCell align="center">
                  {formatMessage(intl.perfomance_usd)}
                </TableCell>
                <TableCell align="center">
                  {formatMessage(intl.equivalence_btc)}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedlicenses.map((licenses, index) => {
                const islicenseselected = selectedlicenses.includes(index);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={islicenseselected}
                  >
                    <TableCell align="center" style={{ cursor: 'pointer' }}>
                      {licenses.purchased_at}
                    </TableCell>
                    <TableCell align="center">
                      {licenses.profit_percent}
                    </TableCell>
                    <TableCell align="center">
                      {licenses.profit}
                    </TableCell>
                    <TableCell align="center">
                      {licenses.profit_btc}
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
        count={filteredlicenses.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <div className={classes.titleDiv}>
          <div>{formatMessage(intl.performance_of_my_referals)}</div>
        </div>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  {formatMessage(intl.date)}
                </TableCell>
                <TableCell align="center">
                  {formatMessage(intl.concept)}
                </TableCell>
                <TableCell align="center">
                  {formatMessage(intl.amount)}
                </TableCell>
                <TableCell align="center">
                  {formatMessage(intl.equivalence_btc)}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedreferrals.map((referral, index) => {
                const isreferralselected = selectedreferrals.includes(index);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isreferralselected}
                  >
                    <TableCell align="center" style={{ cursor: 'pointer' }}>
                      {referral.created_at}
                    </TableCell>
                    <TableCell align="center">
                      {referral.concept}
                    </TableCell>
                    <TableCell align="center">
                      {referral.licensing}
                    </TableCell>
                    <TableCell align="center">
                      {referral.profit_btc}
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
        count={filteredreferrals.length}
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
  licenses: PropTypes.array.isRequired,
  referrals: PropTypes.array.isRequired
};

Results.defaultProps = {
  licenses: [],
  referrals: []
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
