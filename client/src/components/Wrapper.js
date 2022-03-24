import React from 'react';
import { makeStyles } from '@mui/styles';
import Sidebar from './SidebarComponents/Sidebar';
import DataWrapper from './DataVisualizationComponents/DataWrapper';
import Container from '@mui/material/Container';
const Wrapper = () => {
    const classes = useStyles();

    return (
        <div className={classes.wrapperContainer}>
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
        height: '94vh !important',
        paddingLeft: '10px !important',
        paddingRight: '10px !important'
    }
}));

export default Wrapper;
