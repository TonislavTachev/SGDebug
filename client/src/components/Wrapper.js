import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Sidebar from './SidebarComponents/Sidebar';
import DataWrapper from './DataVisualizationComponents/DataWrapper';
import IsLoadingHoc from '../customHooks/LoaderHOC';
import { fetchAllRequests } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';

const Wrapper = ({ setLoading, isLoaded }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    return (
        <div className={classes.wrapperContainer}>
            <CssBaseline />
            <Sidebar />
            <DataWrapper />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapperContainer: {
        display: 'flex !important',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // height: '94vh !important',
        paddingLeft: '10px !important',
        paddingRight: '10px !important'
    }
}));

export default IsLoadingHoc(Wrapper, 'Loading');
