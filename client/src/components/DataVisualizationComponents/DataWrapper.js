import React from 'react';
import { makeStyles } from '@mui/styles';
import EndpointItem from './EndpointItem';
import { Typography } from '@mui/material';

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
            endpointType: 'impl-generali'
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

    const classes = useStyles();
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
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapperContainer: {
        display: 'flex',
        flex: '3',
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
        marginLeft: '30px'
    }
}));

export default DataWrapper;
