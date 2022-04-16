import React, { useState, useRef } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { makeStyles } from '@mui/styles';
import { Button, Fade, Typography, Zoom } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const BodyDetailsComponent = ({ selectedRequest }) => {
    const classes = useStyles();
    const headerRef = useRef(null);

    return (
        <div className={classes.bodyWrapper} ref={headerRef}>
            <div className={classes.bodyDetails}>
                <Typography sx={{ fontSize: 25 }}>Body</Typography>
                <Zoom in>
                    <div className={classes.informationWrapper}>
                        <div>
                            <pre>{JSON.stringify(selectedRequest.body, null, 2)}</pre>
                        </div>
                    </div>
                </Zoom>
            </div>
            <div className={classes.bodyDetails}>
                <Typography sx={{ fontSize: 25 }}>$Meta</Typography>
                <Zoom in>
                    <div className={classes.informationWrapper}>
                        <div>
                            <pre>{JSON.stringify(selectedRequest.$meta, null, 2)}</pre>
                        </div>
                    </div>
                </Zoom>
                <div className={classes.traceIdWrapper}>
                    <Typography sx={{ fontSize: 20, fontWeight: 800 }}>Trace Id</Typography>
                    <Typography>{selectedRequest.$meta.trace}</Typography>
                </div>
                <Button className={classes.traceButton}>Trace</Button>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    bodyWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: '100%'
    },
    bodyDetails: {
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;',
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        width: '40%',
        height: '400px',
        marginTop: '30px'
    },
    headerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        background: '#7eccff',
        padding: '10px',
        borderRadius: '16px'
    },
    dropdownTitle: {
        fontSize: '20px !important',
        marginTop: '10px !important',
        color: '#FFF'
    },
    informationWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: '#FFF',
        padding: '10px',
        borderRadius: '16px',
        marginTop: '20px'
    },
    traceIdWrapper: {
        marginLeft: '12px',
        padding: '15px',
        borderLeft: '5px solid #7eccff'
    },
    traceButton: {
        marginTop: '30px !important',
        background: '#32b332 !important',
        color: '#FFF !important',
        borderRadius: '6px !important'
    }
}));

export default BodyDetailsComponent;
