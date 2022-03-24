import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const TimeComponent = () => {
    const classes = useStyles();

    const [value, setValue] = useState(new Date());

    return (
        <div className={classes.timeWrapper}>
            <div className={classes.timeFrom}>
                <Typography sx={{ marginLeft: '4px', fontSize: '14px', fontWeight: 600 }}>
                    Time from
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        ampm={false}
                        disableOpenPicker
                        renderInput={(props) => (
                            <TextField
                                {...props}
                                className={classes.root}
                                placeholder='Time from'
                            />
                        )}
                    />
                </LocalizationProvider>
            </div>
            <div className={classes.line}></div>
            <div className={classes.timeTo}>
                <Typography sx={{ marginLeft: '4px', fontSize: '14px', fontWeight: 600 }}>
                    Time to
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        ampm={false}
                        laceholder=''
                        disableOpenPicker
                        renderInput={(params) => (
                            <TextField {...params} className={classes.root} placeholder='Time to' />
                        )}
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    timeWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            borderColor: '#707070',
            height: '40px',
            boxShadow: 'rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px'
        },
        width: '120px'
    },
    line: {
        height: '10px',
        width: '30px',
        marginTop: '30px',
        borderBottom: '2px solid #dedede'
    }
}));

export default TimeComponent;
