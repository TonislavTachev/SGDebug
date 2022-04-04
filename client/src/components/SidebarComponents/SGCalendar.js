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

const SGCalendar = () => {
    const startDate = useSelector(({ requestReducer }) => requestReducer.get('startDate'));
    const endDate = useSelector(({ requestReducer }) => requestReducer.get('endDate'));

    const dispatch = useDispatch();

    const [value, setValue] = React.useState([startDate, endDate]);

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
                    console.log(newValue);
                    dispatch(setField({ path: ['filters', 'range'], value: 123 }));
                    setValue(newValue);
                }}
                renderInput={({ inputProps, ...startProps }, endProps) => {
                    const startValue = inputProps.value;
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
                                value.every((item) => item === null)
                                    ? ''
                                    : `${startValue} - ${endProps.inputProps.value}`
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
