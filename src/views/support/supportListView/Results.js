import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  makeStyles,
  CardContent,
  Grid,
  Button
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Formik } from 'formik';
import httpClient from 'src/utils/httpClient';
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
  menuDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  menuPoint: {
    marginRight: 5,
    fontSize: 25,
    color: '#333'
  },
  menuanswer: {
    marginLeft: '1rem'
  },
  menuquestion: {
    fontWeight: 'bold'
  },
  inputDiv: {
    marginTop: 15
  },
  btnDiv: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #333',
    borderRadius: 15,
    width: '100%',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#fff',
    marginTop: 15
  },
  ticketDisable: {
    display: 'none'
  },
  ticketActive: {
    display: 'initial',
  }
}));

const Results = ({
  faqs,
  className,
  intl
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [ticketflag, setTicketFlag] = React.useState(false)
  const [filename, setFileName] = React.useState('')
  const [file, setFile] = React.useState(null)
  const defaultError = 'El campo es requerido';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const serealizeData = (data, update = false) => {
    let formData = new FormData();

    if (update) {
      // update...
      // Logic that applies only when editing
    } else {
      // create...
      // Logic that applies only when creating
    }
    // Logic that applies both when creating and editing
    for (const input in data) {
      switch (input) {
        // this is used for when you want
        // to treat a field differently from the rest
        case 'custom_field':
          break;
        case 'publication_home':
        case 'publication_expire':
        case 'publication_publish':
          formData.append(input, (data[input]) ? 1 : 0);
          break;
        default:
          try {
            data[input] && formData.append(input, data[input]);
          } catch (err) {
            console.error(err)
          }
      }
    }

    return formData;
  }

  const getFilename = (e) => {
    var str = document.getElementById('btn_file').value;
    var len = str.length
    var filename = str.slice(12, len);
    setFileName(filename)
    let { name, files } = e.target;
    let file = files[0];
    setFile(file);
  }

  return (
    <Card className={clsx(classes.root, className)} >
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <div className={classes.titleDiv}>
              <div>{formatMessage(intl.frequent_questions)}</div>
            </div>
          </Grid>
          <Grid
            item
            xs={10}
            style={{ margin: 20 }}
          >
            {
              faqs.map((val, index) => {
                return (
                  <div key={index - 1} style={{ width: '100%' }}>
                    <div className={classes.menuDiv} key={index}>
                      <div className={classes.menuPoint} key={index + 1}>•</div>
                      <div key={index + 2} className={classes.menuquestion}>{val.question}</div>
                    </div>
                    <div key={index + 3} className={classes.menuanswer}>{val.answer}</div>
                  </div>
                )
              })
            }
          </Grid>
          <Grid
            item
            xs={12}
          >
            <div>
              <Button
                variant="contained"
                className={classes.titleDiv}
                style={{ backgroundColor: '#fff' }}
                onClick={() => { setTicketFlag(!ticketflag) }}
              >
                {formatMessage(intl.ticket_area)}
              </Button>
            </div>
          </Grid>
          <Formik
            initialValues={{
              topic: '',
              detail: '',
              attachment: file
            }}
            validationSchema={Yup.object().shape({
              topic: Yup.string().max(255),
              detail: Yup.string().max(255),
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

                  if (data.attachment) {
                    data.attachment = data.attachment;
                  } else {
                    delete data.attachment;
                  }

                  let url = 'api/ticket';
                  let response = await httpClient.postFile(url, serealizeData(data))
                    .then(({ data }) => {
                      if (data.success === true) {
                        enqueueSnackbar(
                          'successAddedTicket',
                          { variant: 'success' }
                        )
                        setIsSubmitting(false)
                        setFile(null)
                        setFileName('')
                        values.topic = ''
                        values.detail = ''
                        values.attachment = file
                      }
                    })
                    .catch((err) => {
                      enqueueSnackbar(
                        'failedAddedTicket',
                        { variant: 'error' }
                      )
                      setIsSubmitting(false);
                    })
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
                  <Grid container>
                    <Grid
                      item
                      sm={1}
                      xs={12}
                      className={ticketflag ? classes.ticketActive : classes.ticketDisable}
                    ></Grid>
                    <Grid
                      item
                      sm={4}
                      xs={12}
                      className={ticketflag ? classes.ticketActive : classes.ticketDisable}
                    >
                      <TextField
                        fullWidth
                        id="outlined-basic1"
                        label="NAME"
                        variant="outlined"
                        className={classes.inputDiv}
                        value={user.name}
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic2"
                        label="E-MAIL"
                        variant="outlined"
                        className={classes.inputDiv}
                        value={user.email}
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic3"
                        label=""
                        variant="outlined"
                        className={classes.inputDiv}
                        // value={filename}

                        required
                        name="attachment"
                        error={Boolean(touched.attachment && !values.attachment && !filename)}
                        helperText={
                          (Boolean(touched.attachment && !values.attachment && !filename))
                            ? defaultError : ''
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // touched={touched.attachment}
                        value={!filename ? '' : filename}
                      />
                      <Button
                        variant="contained"
                        className={classes.btnDiv}
                        onClick={() => { document.getElementById('btn_file').click(); }}
                      >
                        {formatMessage(intl.attach_files)}
                    </Button>
                      <input type="file" style={{ display: 'none' }} id="btn_file"
                        onChange={(e) => getFilename(e)}
                      />
                    </Grid>
                    <Grid
                      item
                      sm={1}
                      xs={12}
                      className={ticketflag ? classes.ticketActive : classes.ticketDisable}
                    ></Grid>
                    <Grid
                      item
                      sm={4}
                      xs={12}
                      className={ticketflag ? classes.ticketActive : classes.ticketDisable}
                    >
                      <TextField fullWidth
                        label="TOPIC"
                        className={classes.inputDiv}
                        fullWidth
                        required
                        variant="outlined"
                        type="text"
                        name="topic"
                        error={Boolean(touched.topic && !values.topic)}
                        helperText={
                          (Boolean(touched.topic && !values.topic))
                            ? defaultError : ''
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.topic}
                      />
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="TEXT"
                        variant="outlined"
                        className={classes.inputDiv}
                        required
                        type="text"
                        name="detail"
                        error={Boolean(touched.detail && !values.detail)}
                        helperText={
                          (Boolean(touched.detail && !values.detail))
                            ? defaultError : ''
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.detail}
                      />
                      <Button
                        variant="contained"
                        type="submit"
                        className={classes.btnDiv}
                        disabled={isSubmitting}
                      >                        
                        {formatMessage(intl.send)}
                    </Button>
                    </Grid>
                    <Grid
                      item
                      sm={1}
                      xs={12}
                      className={ticketflag ? classes.ticketActive : classes.ticketDisable}
                    ></Grid>
                  </Grid>
                </form>
              )
            }}
          </Formik>
        </Grid>
      </CardContent>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  faqs: PropTypes.array.isRequired
};

Results.defaultProps = {
  faqs: []
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
