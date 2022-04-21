import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ApiIcon from '@mui/icons-material/Api';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setField, fetchAllRequests } from '../../actions/actions';

const ChipNavigation = () => {
    const classes = useStyles();
    const [selectedChip, setSelected] = useState(0);
    const dispatch = useDispatch();

    const handleClick = (chipValue) => {
        const chipIDS = {
            swagger: 0,
            error: 1
        };
        dispatch(setField({ path: ['filters', 'types'], value: chipValue }));
        setSelected(chipIDS[chipValue]);
    };

    return (
        <div className={classes.chipNavigationWrapper}>
            <Typography>Select request type: </Typography>
            <div className={classes.chipWrapper}>
                <Chip
                    label='Swagger'
                    icon={<ApiIcon />}
                    color='primary'
                    sx={{ marginRight: '5px' }}
                    onClick={() => handleClick('swagger')}
                    variant={selectedChip === 0 ? 'filled' : 'outlined'}
                />
                <Chip
                    label='Error'
                    icon={<ReportGmailerrorredIcon />}
                    color='error'
                    onClick={() => handleClick('error')}
                    variant={selectedChip === 1 ? 'filled' : 'outlined'}
                />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    chipNavigationWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '15px',
        paddingLeft: '120px',
        width: '100%',
        [theme.breakpoints.up('xl')]: {
            paddingLeft: '79px'
        }
    },
    chipWrapper: {
        marginLeft: '20px',
        marginTop: '-3px'
    },
    chipSwagger: {
        marginRight: '5px'
    }
}));
export default ChipNavigation;
