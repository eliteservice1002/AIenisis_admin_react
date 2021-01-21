import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import wait from 'src/utils/wait';
import RecordWallets from './RecordWallets'

const useStyles = makeStyles(() => ({
  root: {}
}));

const Security = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        btc_wallet: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        btc_wallet: Yup.string().max(255).required('Btc Wallet is required'),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // NOTE: Make API request
          await wait(500);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Btc Wallet updated', {
            variant: 'success'
          });
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.btc_wallet && errors.btc_wallet)}
                    fullWidth
                    helperText={touched.btc_wallet && errors.btc_wallet}
                    label="Btc Wallet"
                    name="btc_wallet"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.btc_wallet}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
              <Box mt={3}>
                <RecordWallets />
              </Box>
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="center"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
