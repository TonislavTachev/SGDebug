import React, { useState, useRef } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { makeStyles } from '@mui/styles';
import { Fade, Typography, Zoom } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const BodyDetailsComponent = ({ isBodyOpened }) => {
    const classes = useStyles();
    const headerRef = useRef(null);

    const [isOpen, setOpen] = useState(isBodyOpened);

    var data = {
        employees: [
            { name: 'Shyam', email: 'shyamjaiswal@gmail.com' },
            { name: 'Bob', email: 'bob32@gmail.com' },
            { name: 'Jai', email: 'jai87@gmail.com' }
        ]
    };

    const determineStateOfDropdown = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <div className={classes.bodyWrapper} ref={headerRef}>
            <div className={classes.headerWrapper}>
                <Typography className={classes.dropdownTitle}>Body</Typography>
                {isOpen ? (
                    <div onClick={determineStateOfDropdown}>
                        <IconButton size='large'>
                            <ArrowDropUpOutlinedIcon fontSize='inherit' />
                        </IconButton>
                    </div>
                ) : (
                    <div onClick={determineStateOfDropdown}>
                        <IconButton size='large'>
                            <ArrowDropDownOutlinedIcon fontSize='inherit' />
                        </IconButton>
                    </div>
                )}
            </div>
            {isOpen && (
                <Zoom in={isOpen}>
                    <div className={classes.informationWrapper}>
                        <div>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    </div>
                </Zoom>
            )}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    bodyWrapper: {
        display: 'flex',
        flexDirection: 'column   '
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
    }
}));

export default BodyDetailsComponent;
