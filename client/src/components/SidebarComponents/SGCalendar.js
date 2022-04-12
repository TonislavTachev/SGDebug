import React, { useState } from 'react';
import { TextField } from '@mui/material';
import DatePicker from '@mui/lab/DesktopDatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import enLocale from 'date-fns/locale/en-GB';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setField } from '../../actions/actions';
import { format, parseISO } from 'date-fns';
import { DATE_FORMAT } from '../../constants';
import { useEffect } from 'react';

const SGCalendar = () => {
    const startDate = useSelector(({ requestReducer }) => requestReducer.get('startDate'));
    const endDate = useSelector(({ requestReducer }) => requestReducer.get('endDate'));
    const DateRangeFilter = useSelector(({ requestReducer }) => requestReducer.get('filters'));

    const dispatch = useDispatch();

    const [value, setValue] = React.useState([
        DateRangeFilter.getIn(['range', 0]),
        DateRangeFilter.getIn(['range', 1])
    ]);

    const classes = useStyles();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
            <DateRangePicker
                calendars={1}
                value={value}
                startText='Select Date range'
                // minDate={startDate !== null && new Date(startDate)}
                // maxDate={endDate !== null && new Date(endDate)}
                onChange={(newValue) => {
                    dispatch(
                        setField({
                            path: ['filters', 'range'],
                            value: newValue
                        })
                    );
                }}
                renderInput={({ inputProps, ...startProps }, endProps) => {
                    delete inputProps.value;
                    return (
                        <TextField
                            {...startProps}
                            inputProps={inputProps}
                            variant='standard'
                            className={classes.root}
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                disableUnderline: true
                            }}
                            placeholder='Select Date'
                            value={
                                DateRangeFilter.get('range').every((item) => item === null)
                                    ? ''
                                    : `${format(
                                          new Date(DateRangeFilter.getIn(['range', 0])),
                                          DATE_FORMAT
                                      )} - ${format(
                                          new Date(DateRangeFilter.getIn(['range', 1])),
                                          DATE_FORMAT
                                      )}`
                            }
                        />
                    );
                }}
            />
        </LocalizationProvider>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiInput-root': {
            borderRadius: '8px',
            border: '1px solid #707070',
            padding: '5px',
            height: '40px',
            '&:before': {
                borderBottom: 'none'
            }
        },
        '& .MuiInputLabel-root': {
            display: 'none'
        },
        width: '100%'
    }
}));

export default SGCalendar;
