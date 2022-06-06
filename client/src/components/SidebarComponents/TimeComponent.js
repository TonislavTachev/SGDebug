import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useSelector, useDispatch } from 'react-redux';
import { setField } from '../../actions/actions';
import { format } from 'date-fns';
import { TIME_FORMAT } from '../../constants';

const TimeComponent = () => {
    const classes = useStyles();

    const timeRangeFilter = useSelector(({ requestReducer }) => requestReducer.get('filters'));
    const [isDateSelected, setSelectDate] = useState(false);
    const timePickerFromRef = useRef();
    const timePickerToRef = useRef();
    const allNull = useMemo(
        () => timeRangeFilter.get('range').some((item) => item === null),
        [timeRangeFilter]
    );

    const dispatch = useDispatch();

    useEffect(() => {
        let someValid = timeRangeFilter.get('range').some((item) => item !== null);
        if (someValid) {
            setSelectDate(true);
        } else {
            setSelectDate(false);
        }
    }, [timeRangeFilter]);

    useEffect(() => {
        if (allNull) {
            if (timePickerFromRef.current !== undefined && timePickerToRef !== undefined) {
                // timePickerFromRef.current.input.value = '';
                // timePickerToRef.current.input.value = '';
                console.log(timePickerFromRef.current.input);
            }
        }
    }, [allNull]);

    const setTimeRange = (time, key) => {
        const timeToSave = {
            from: {
                action: (timeToTransform) =>
                    dispatch(
                        setField({
                            path: ['filters', 'time', 'from'],
                            value: timeToTransform.toISOString()
                        })
                    )
            },
            to: {
                action: (timeToTransform) =>
                    dispatch(
                        setField({
                            path: ['filters', 'time', 'to'],
                            value: timeToTransform.toISOString()
                        })
                    )
            }
        };

        let isDateValid =
            new Date(time) !== 'Invalid Date' && !isNaN(new Date(time)) && time !== null;

        if (isDateValid) {
            timeToSave[key].action(time);
        }
    };

    return (
        <div className={classes.timeWrapper}>
            <div className={classes.timeFrom}>
                <Typography sx={{ marginLeft: '4px', fontSize: '14px', fontWeight: 600 }}>
                    Time from
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        value={timeRangeFilter.getIn(['time', 'from'])}
                        onChange={(newValue) => setTimeRange(newValue, 'from')}
                        ampm={false}
                        disableOpenPicker
                        renderInput={(props) => (
                            <TextField
                                {...props}
                                className={classes.root}
                                inputRef={timePickerFromRef}
                                placeholder='Time from'
                            />
                        )}
                        disabled={!isDateSelected}
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
                        value={timeRangeFilter.getIn(['time', 'to'])}
                        onChange={(newValue) => setTimeRange(newValue, 'to')}
                        ampm={false}
                        placeholder=''
                        disableOpenPicker
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                inputRef={timePickerToRef}
                                className={classes.root}
                                placeholder='Time to'
                            />
                        )}
                        disabled={!isDateSelected}
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
