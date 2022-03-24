import React, { useState } from 'react';
import { TextField } from '@mui/material';
import DatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import enLocale from 'date-fns/locale/en-GB';
import { makeStyles } from '@mui/styles';

const SGCalendar = () => {
    const [value, setValue] = useState(new Date());

    const classes = useStyles();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
            <DatePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
                renderInput={(params) => <TextField {...params} className={classes.root} />}
            />
        </LocalizationProvider>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            borderColor: '#707070',
            height: '40px'
        },
        width: '100%'
    }
}));

export default SGCalendar;
