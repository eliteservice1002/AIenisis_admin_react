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
  affiliates,
  className,
  intl
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [selectedAffiliates, setSelectedAffiliates] = useState([]);
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

  const filteredAffiliates = applyFilters(affiliates, query, filters, ['title_es']);
  const sortedAffiliates = applySort(filteredAffiliates, sort);
  const paginatedAffiliates = applyPagination(sortedAffiliates, page, limit);

  return (
    <Card className={clsx(classes.root, className)} >
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <div className={classes.titleDiv}>
          <div>{formatMessage(intl.my_affiliates)}</div>
        </div>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  {formatMessage(intl.level)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.user_name)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.email)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.name_and_surname)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.country)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.enrollment_date)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.number_of_licenses)}
								</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAffiliates.map((affiliate, index) => {
                const isAffiliateselected = selectedAffiliates.includes(index);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isAffiliateselected}
                  >
                    <TableCell align="center">
                      {affiliate.level}
                    </TableCell>
                    <TableCell align="center" style={{ cursor: 'pointer' }}>
                      {affiliate.username}
                    </TableCell>
                    <TableCell align="center">
                      {affiliate.email}
                    </TableCell>
                    <TableCell align="center">
                      {affiliate.last_name} {affiliate.first_name}
                    </TableCell>
                    <TableCell align="center">
                      {affiliate.country_code}
                    </TableCell>
                    <TableCell align="center">
                      {affiliate.created_at}
                    </TableCell>
                    <TableCell align="center">
                      {affiliate.licensing}
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
        count={filteredAffiliates.length}
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
  affiliates: PropTypes.array.isRequired
};

Results.defaultProps = {
  affiliates: []
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
