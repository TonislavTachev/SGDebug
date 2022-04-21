import React, { useState, useRef } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { makeStyles } from '@mui/styles';
import { Button, Fade, Typography, Zoom } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BodyDetailsComponent = ({ selectedRequest }) => {
    const classes = useStyles();
    const headerRef = useRef(null);

    const displayJSON = (jsonObj) => (
        <div>
            <pre>{JSON.stringify(jsonObj, null, 2)}</pre>
        </div>
    );

    return (
        <div className={classes.bodyWrapper}>
            {selectedRequest.mtid === 'request' ? (
                <>
                    <div className={classes.bodyDetails}>
                        <Typography sx={{ fontSize: 25 }}>Body</Typography>
                        <Zoom in>
                            <div className={classes.informationWrapper}>
                                {displayJSON(selectedRequest.body)}
                            </div>
                        </Zoom>
                    </div>
                    <div className={classes.bodyDetails}>
                        <Typography sx={{ fontSize: 25 }}>$Meta</Typography>
                        <Zoom in>
                            <div className={classes.informationWrapper}>
                                {displayJSON(selectedRequest.$meta)}
                            </div>
                        </Zoom>
                        <div className={classes.traceIdWrapper}>
                            <Typography sx={{ fontSize: 20, fontWeight: 800 }}>Trace Id</Typography>
                            <Typography>{selectedRequest.$meta.trace}</Typography>
                        </div>
                        <Button className={classes.traceButton}>Trace</Button>
                    </div>
                </>
            ) : (
                <div className={classes.errorWrapper}>
                    <div className={classes.errorDetails}>
                        <Typography sx={{ fontSize: 25 }}>Error</Typography>
                        <Zoom in>
                            <div className={classes.informationWrapper}>
                                {displayJSON(selectedRequest.error.stack)}
                            </div>
                        </Zoom>
                    </div>
                    <div className={classes.errorRow}>
                        <div className={classes.jsException}>
                            <Typography sx={{ fontSize: 25 }}>JS Exception</Typography>
                            <Zoom in>
                                <div className={classes.informationWrapper}>
                                    {displayJSON(selectedRequest.jsException)}
                                </div>
                            </Zoom>
                        </div>
                        <div className={classes.jsException}>
                            <Typography sx={{ fontSize: 25 }}>$Meta</Typography>
                            <Zoom in>
                                <div className={classes.informationWrapper}>
                                    {displayJSON(selectedRequest.$meta)}
                                </div>
                            </Zoom>
                        </div>
                    </div>
                    <div className={classes.collapsableWholeObject}>
                        <Accordion sx={{ marginBottom: '20px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel1a-content'
                                id='panel1a-header'
                            >
                                <Typography>Show whole json response</Typography>
                            </AccordionSummary>
                            <AccordionDetails>{displayJSON(selectedRequest)}</AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            )}
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
    errorWrapper: {
        display: 'flex',
        flexDirection: 'column',
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
    errorDetails: {
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;',
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        width: '100%',
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
    },
    jsException: {
        marginTop: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
        padding: '15px',
        width: '50%',
        '&:first-child': {
            marginRight: '10px'
        }
    },
    errorRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    collapsableWholeObject: {
        marginTop: '20px',
        marginBottom: '20px'
    }
}));

export default BodyDetailsComponent;
