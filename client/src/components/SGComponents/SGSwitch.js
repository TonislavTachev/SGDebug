import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const SGSwitch = () => {
    return (
        <FormControlLabel
            value='start'
            control={<Switch color='primary' />}
            label='Switch to charts'
            labelPlacement='start'
        />
    );
};

export default SGSwitch;
