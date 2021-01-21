import React, { useState } from 'react';
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
  CardMedia,
  makeStyles,
  Typography
} from '@material-ui/core';
import wait from 'src/utils/wait';
import ReactInputVerificationCode from 'react-input-verification-code';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '1rem'
  },
  media: {
    maxWidth: '250px'
  },
  textAlign: {
    textAlign: 'center'
  },
  alignSelf: {
    alignSelf: 'center'
  }
}));

const Settings = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [enable, setEnable] = useState(false);
  const [compound, setCompound] = useState("0");

  return (
    <Formik
      initialValues={{
        submit: null
      }}
      validationSchema={Yup.object().shape({
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
          enqueueSnackbar('Password updated', {
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
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <Box
                    p={2}
                    display="flex"
                    justifyContent="center"
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {setEnable(!enable)}}
                    >
                      {
                        enable ? "Disable 2 Factor" : "Enable 2 Factor"
                      }
                    </Button>
                  </Box>
                  <Box
                    p={2}
                    display="flex"
                    justifyContent="center"
                  >
                    <ReactInputVerificationCode 
                      length={6}
                      onChange={(val)=>{console.log(val)}}
                    />
                  </Box>
                  <Box
                    p={2}
                    display="flex"
                    justifyContent="center"
                  >
                    <Button
                      color="primary"
                      variant="contained"
                    >
                      Validate
                    </Button>
                  </Box>
                </Grid>
                <Grid
                  item
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <CardMedia
                    component='img'
                    className={classes.media}
                    title="QR CODE"
                    image={'/static/images/qr.png'}
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
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardContent>
              <Box
                p={2}
              >
                <Typography 
                  color="textPrimary" 
                  variant="h3" 
                  component="h3"
                  align="center"
                >
                  INTEREST COMPOUND
                </Typography>
              </Box>
              <Box
                p={3}
                justifyContent="center"
              >
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    sm={12}
                    xs={12}
                    className={classes.textAlign}
                  >
                    <ToggleButtonGroup
                      value={compound}
                      exclusive
                      onChange={(event, newVal) => setCompound(newVal)}
                    >
                      <ToggleButton value="0" aria-label="left aligned">
                        OFF
                      </ToggleButton>
                      <ToggleButton value="1" aria-label="centered">
                        ON
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    sm={12}
                    xs={12}
                    className={classes.alignSelf}
                  >
                    <Typography 
                      color="textPrimary" 
                      variant="h5" 
                      component="h5"
                      align="center"
                    >
                      ACTIVATE COMPOUND INTEREST 
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.alignSelf}
                  >
                    <Typography 
                      color="textPrimary" 
                      variant="h5" 
                      component="h5"
                      align="center"
                    >
                      Definition of compound interest
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.alignSelf}
                  >
                    <Typography 
                      color="textPrimary" 
                      variant="h5" 
                      component="h5"
                      align="left"
                    >
                      dfjasjdfajdsñfjañdsjfñadjsfñajdsñfajdsfñjañdsjfñadjfñajdsfñajdkdjflkasjdfljadlfkjalkdjflakjdfasdhfk
                      jasdjfhadjhfaldbvzbxnñjfnfkdjfaddjfañdjfakdjdajdlkjakdjfajdfalkjdfhadfhadhjfadfadfjadjhfasdjfah
                      dfñanxcudhfdsfhjdxfhidfhañdfadxufiadnxfñaddhjxfaoedfe9diufjewdñfncdixjf
                      ´ k d j f c q w o i d x u f c a w i d x u f j c q w o e i d k x f c q e d u f D L K F N ´ d x h v ñ a d f n S d h f 8 4 e r 3 0 f .
                      fSHDFasñdfAashfhÑHñhña
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

Settings.propTypes = {
  className: PropTypes.string
};

export default Settings;
