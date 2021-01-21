import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
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
  getComparator,
  applyPagination,
  sortOptionsDefault,
  descendingComparator,
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
  operations,
  className,
  intl
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [selectedOperations, setSelectedOperations] = useState([]);
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

  const filteredOperations = applyFilters(operations, query, filters, ['title_es']);
  const sortedOperations = applySort(filteredOperations, sort);
  const paginatedOperations = applyPagination(sortedOperations, page, limit);
  const isMountedRef = useIsMountedRef();


  return (
    <Card className={clsx(classes.root, className)} >
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <div className={classes.titleDiv}>
          <div>{formatMessage(intl.history_of_operations)}</div>
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
                  {formatMessage(intl.operation)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.market)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.paire)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.type)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.price)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.quantity)}
								</TableCell>
                <TableCell align="center">
                  {formatMessage(intl.amount)}
								</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOperations.map((operation, index) => {
                const isOperationselected = selectedOperations.includes(index);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isOperationselected}
                  >
                    <TableCell align="center">
                      {operation.performed_at_date}
                    </TableCell>
                    <TableCell align="center" style={{ cursor: 'pointer' }}>
                      {operation.type}
                    </TableCell>
                    <TableCell align="center">
                      {operation.market}
                    </TableCell>
                    <TableCell align="center">
                      {operation.cryptocurrency_pair}
                    </TableCell>
                    <TableCell align="center">
                      {operation.type}
                    </TableCell>
                    <TableCell align="center">
                      {operation.price}
                    </TableCell>
                    <TableCell align="center">
                      {operation.quantity}
                    </TableCell>
                    <TableCell align="center">
                      {operation.amount_usd}
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
        count={filteredOperations.length}
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
  operations: PropTypes.array.isRequired
};

Results.defaultProps = {
  operations: []
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
