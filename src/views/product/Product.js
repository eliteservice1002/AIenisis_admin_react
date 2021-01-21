import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  makeStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import wait from 'src/utils/wait';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "20px"
  },
  media: {
    maxWidth: '300px',
    height: "300px",
    float: "right"
  },
  quantity: {
    alignSelf: 'center',
    marginRight: '20px'
  },
  total: {
    alignSelf: 'center',
    marginRight: '60px'
  },
  description: {
    paddingLeft: "40px",
    paddingRight: "40px"
  },
  buyButton: {
    width: "200px",
    borderRadius: "20px"
  },
  operatorButton: {
    borderRadius: '0px',
  },
  quantityButton: {
    maxWidth: '100px',
    '& .MuiOutlinedInput-input': {
      textAlign: 'center',
      padding: '14px 10px'
    },
  }
}));

const Product = ({ className, data,  ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: data.name || '',
        description: data.description || '',
        quantity: data.quantity || 0,
        price: data.price || 0,
        termCheck: data.termCheck || false,
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
          enqueueSnackbar('Operation successed!', {
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
                spacing={10}
              >
                <Grid
                  item
                  md={5}
                  sm={5}
                  xs={5}
                >
                  <Box justifyContent="center" >
                    <CardMedia
                      component='img'
                      className={classes.media}
                      title="Product Image"
                      image={'/static/images/post_1.png'}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  md={7}
                  sm={7}
                  xs={7}
                >
                  <Box mt={3} justifyContent="center">
                    <Typography color="textPrimary" variant="h3" align="center" gutterBottom>
                      {values.name}
                    </Typography>
                    <Typography color="textSecondary" variant="body2" className={classes.description}>
                      {values.description}
                    </Typography>
                  </Box>
                  <Box mt={3} justifyContent="center" display="flex">
                    <Typography color="textSecondary" variant="h5" align="center" className={classes.quantity}>
                      Quantity
                    </Typography>
                    <div>
                      <IconButton
                        color="primary" 
                        component="span"
                        className={classes.operatorButton}
                        onClick={() => {
                          setFieldValue('quantity', (values.quantity+1))
                        }}>
                          <AddIcon />
                      </IconButton>
                      <TextField
                        type='number'
                        name="quantity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.quantity}
                        variant="outlined"
                        className={classes.quantityButton}
                      />
                      <IconButton
                        color="primary" 
                        component="span"
                        className={classes.operatorButton}
                        onClick={() => {
                          if(values.quantity)
                            setFieldValue('quantity', (values.quantity-1))
                        }}
                        >
                          <RemoveIcon />
                      </IconButton>
                    </div>
                  </Box>
                  <Box mt={2} justifyContent="center" display="flex">
                    <Typography color="textSecondary" variant="h5" align="center" className={classes.total}>
                      Total
                    </Typography>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                      <Button disabled>{values.quantity*values.price}</Button>
                    </ButtonGroup>
                  </Box>
                  <Box mt={3} justifyContent="center" textAlign="center">
                    <Button
                      className={classes.buyButton}
                      color="secondary"
                      variant="contained"
                    >
                      Buy
                    </Button>
                  </Box>
                  <Box mt={1} justifyContent="center" textAlign="center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.termCheck}
                          onChange={handleChange}
                          name="termCheck"
                          color="primary"
                        />
                      }
                      label="I accept terms"
                    />
                  </Box>
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
          </Card>
        </form>
      )}
    </Formik>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired
};

export default Product;
