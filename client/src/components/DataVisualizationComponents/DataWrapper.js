import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import EndpointItem from './EndpointItem';
import { Typography } from '@mui/material';
import BodyDetailsComponent from './BodyDetailsComponent';
import { fetchAllRequests } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const DataWrapper = () => {
    const items = [
        {
            time: '11:11',
            date: '11.02',
            endpointName: 'insurance.customer.updateStatus',
            endpointType: 'impl-generali-insurance'
        },
        {
            time: '11:35',
            date: '11.02',
            endpointName: 'insurance.person.lookup',
            endpointType: 'impl-generali',
            isError: true
        },
        {
            time: '11:55',
            date: '11.02',
            endpointName: 'insurance.policy.get',
            endpointType: 'impl-generali-insurance'
        },
        {
            time: '14:30',
            date: '11.02',
            endpointName: 'insurance.customer.login',
            endpointType: 'impl-generali-insurance'
        }
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllRequests());
    }, []);

    const classes = useStyles();

    const fetchedRequests = useSelector(({ requestReducer }) => requestReducer.get('requests'));

    return (
        <div className={classes.wrapperContainer}>
            <div className={classes.endpointContainer}>
                <Typography
                    sx={{
                        marginTop: '5px',
                        marginLeft: '5px',
                        marginBottom: '10px',
                        fontWeight: 600
                    }}
                >
                    Requests
                </Typography>
                {items.map((item, index) => {
                    return (
                        <EndpointItem
                            endpointName={item.endpointName}
                            time={item.time}
                            date={item.date}
                            endpointType={item.endpointType}
                            isError={item.isError}
                        />
                    );
                })}
            </div>
            <div className={classes.detailsContainer}>
                <Typography
                    sx={{
                        marginTop: '5px',
                        marginLeft: '5px',
                        marginBottom: '10px',
                        fontWeight: 600
                    }}
                >
                    Details
                </Typography>
                <BodyDetailsComponent />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapperContainer: {
        display: 'flex',
        flex: '4',
        flexDirection: 'row',
        background: '#f4f4f4',
        height: '100%',
        padding: '20px'
    },
    endpointContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    detailsContainer: {
        marginLeft: '30px',
        marginRight: '30px',
        width: '100%'
    }
}));

export default DataWrapper;
