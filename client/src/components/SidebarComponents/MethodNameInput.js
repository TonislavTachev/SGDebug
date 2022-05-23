import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Typography, InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { fetchDistinctRequestNamesByType, setField } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { fromJS } from 'immutable';

const MethodNameInput = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const selectedStateChip = useSelector(({ requestReducer }) =>
        requestReducer.getIn(['filters', 'types'])
    );
    const distinctMethodNames = useSelector(({ requestReducer }) =>
        requestReducer.get('distinctMethodNames')
    );

    const selectedMethodName = useSelector(({ requestReducer }) =>
        requestReducer.get('selectedDistinctName')
    );

    const loading = open && distinctMethodNames.size === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        if (active) {
            dispatch(fetchDistinctRequestNamesByType(selectedStateChip));
        }

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        dispatch(fetchDistinctRequestNamesByType(selectedStateChip));
    }, [selectedStateChip]);

    const handleSelectedMethodName = (value) => {
        if (value === null) {
            dispatch(
                setField({
                    path: ['selectedDistinctName'],
                    value: fromJS({ label: '', value: '' })
                })
            );
        } else {
            dispatch(setField({ path: ['selectedDistinctName'], value: fromJS(value) }));
        }
    };

    return (
        <div>
            <Autocomplete
                options={distinctMethodNames}
                sx={{ width: '200px' }}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                loading={loading}
                loadingText='Loading data'
                value={selectedMethodName.toJS().value !== '' ? selectedMethodName.toJS() : null}
                inputValue={selectedMethodName.toJS().value}
                onChange={(event, newValue) => handleSelectedMethodName(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder='Select method name'
                        variant='outlined'
                        className={classes.root}
                        sx={{ width: '250px' }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color='inherit'
                                            size={20}
                                            sx={{ marginTop: '-12px' }}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}
                    />
                )}
            />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            marginTop: '-4px',
            marginLeft: '10px',
            padding: '5px',
            height: '33px',
            '&:before': {
                borderBottom: 'none'
            }
        },
        '& .MuiInputLabel-root': {
            display: 'none'
        },
        '& .MuiInputBase-input': {
            marginTop: '-10px'
        },
        width: '100%'
    }
}));

export default MethodNameInput;
