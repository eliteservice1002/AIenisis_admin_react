import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Label from 'src/components/Label';
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  makeStyles,
  Divider,
  TablePagination,
} from '@material-ui/core';
/* utils */
import {
  applySort,
  applyFilters,
  applyPagination,
  sortOptionsDefault,
} from 'src/utils/listTableSettings';

const statusColors = {
  1: 'success',
  2: 'warning',
  3: 'error'
};

const statusLabels = {
  1: 'Active',
  2: 'Pending',
  3: 'Canceled'
};

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
  className,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [selectedLicenses, setSelectedLicenses] = useState([]);
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

  const filteredLicenses = applyFilters(licenses, query, filters, ['title_es']);
  const sortedLicenses = applySort(filteredLicenses, sort);
  const paginatedLicenses = applyPagination(sortedLicenses, page, limit);

  return (
    <Card className={clsx(classes.root, className)} >
      <CardHeader
        title="My Licenses"
      />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  Date of Pourchase
								</TableCell>
                <TableCell align="center">
                  Number of Licenses
								</TableCell>
                <TableCell align="center">
                  License Cost
								</TableCell>
                <TableCell align="center">
                  Retirement Date
								</TableCell>
                <TableCell align="center">
                  Status
								</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLicenses.map((license, index) => {
                const isLicenseselected = selectedLicenses.includes(index);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isLicenseselected}
                  >
                    <TableCell align="center">
                      {license.date_of_purchase}
                    </TableCell>
                    <TableCell align="center" style={{ cursor: 'pointer' }}>
                      {license.number_of_licenses}
                    </TableCell>
                    <TableCell align="center">
                      {license.license_cost}
                    </TableCell>
                    <TableCell align="center">
                      {license.retirement_date}
                    </TableCell>
                    <TableCell align="center">
                      <Label color={statusColors[license.status]}>
                        {statusLabels[license.status]}
                      </Label>
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
        count={filteredLicenses.length}
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
  licenses: PropTypes.array.isRequired
};

Results.defaultProps = {
  licenses: []
};

export default Results;
