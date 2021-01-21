import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import wait from 'src/utils/wait';
import countries from './countries';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css'

const useStyles = makeStyles(() => ({
  root: {}
}));

const GeneralSettings = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        locality: user.locality || '',
        country: user.country || '',
        email: user.email || '',
        name: user.name || '',
        surname: user.surname || '',
        prefix: user.prefix || '',
        phone: user.phone || '',
        province: user.province || '',
        dni_passport: user.dni_passport || 1,
        document_number: user.document_number || '',
        address: user.address || '',
        postal_code: user.postal_code || '',
        birthday: user.birthday || (new Date()),
        submit: null
      }}
      validationSchema={Yup.object().shape({
        locality: Yup.string().max(255),
        country: Yup.string().max(255),
        dni_passport: Yup.string().max(255),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        name: Yup.string().max(255).required('Name is required'),
        surname: Yup.string().max(255).required('Surname is required'),
        phone: Yup.number(),
        prefix: Yup.number(),
        province: Yup.string(),
        document_number: Yup.number().required('Document Number is required'),
        postal_code: Yup.number(),
        address: Yup.string().max(255).required('Address is required')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // NOTE: Make API request
          await wait(200);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Profile updated', {
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
        setFieldValue,
        setFieldTouched,
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
                spacing={4}
              >
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.surname && errors.surname)}
                    fullWidth
                    helperText={touched.surname && errors.surname}
                    label="Surname"
                    name="surname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.surname}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                <KeyboardDatePicker
                    className={classes.datePicker}
                    label="Birthdate"
                    format="DD/MM/YYYY"
                    name="birthday"
                    fullWidth
                    inputVariant="outlined"
                    value={values.birthday}
                    onBlur={() => setFieldTouched('birthday')}
                    onClose={() => setFieldTouched('birthday')}
                    onAccept={() => setFieldTouched('birthday')}
                    onChange={(date) => setFieldValue('birthday', date)}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
										select
										required
										fullWidth
										name="dni_passport"
										label="DNI / PASSPORT"
										value={values.dni_passport}
										variant="outlined"
                    SelectProps={{ native: true }}
                    onChange={handleChange}
										error={Boolean(touched.dni_passport && !values.dni_passport)}
										helperText={
											(Boolean(touched.dni_passport && !values.dni_passport))
												? errors.dni_passport : ''
										}
									>
											<option key='1' value='1' >
												DNI
											</option>
                      <option key='2' value='2' >
												PASSPORT
											</option>
									</TextField>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.document_number && errors.document_number)}
                    fullWidth
                    helperText={touched.document_number && errors.document_number}
                    label="Document Number"
                    name="document_number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.document_number}
                    variant="outlined"
                    type="number"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <PhoneInput
                    inputStyle={{width:"100%"}}
                    country={'us'}
                    value={values.prefix}
                    onChange={handleChange} />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.address && errors.address)}
                    fullWidth
                    helperText={touched.address && errors.address}
                    label="Address"
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.locality && errors.locality)}
                    fullWidth
                    helperText={touched.locality && errors.locality}
                    label="Place"
                    name="locality"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.locality}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.postal_code && errors.postal_code)}
                    fullWidth
                    helperText={touched.postal_code && errors.postal_code}
                    label="Postal Code"
                    name="postal_code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.postal_code}
                    variant="outlined"
                    type="number"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.province && errors.province)}
                    fullWidth
                    helperText={touched.province && errors.province}
                    label="Province"
                    name="province"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.province}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Autocomplete
                    getOptionLabel={(option) => option.text}
                    options={countries}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        onChange={handleChange}
                        variant="outlined"
                        {...params}
                      />
                    )}
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

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
