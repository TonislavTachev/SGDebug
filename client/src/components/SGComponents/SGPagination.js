import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector, useDispatch } from 'react-redux';
import { setField } from '../../actions/actions';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const SGPagination = () => {
    const totalPages = useSelector(({ requestReducer }) =>
        requestReducer.getIn(['pagination', 'totalPages'])
    );

    const currentPage = useSelector(({ requestReducer }) =>
        requestReducer.getIn(['pagination', 'page'])
    );

    const classes = useStyles();

    const dispatch = useDispatch();

    const handlePageChange = (event, value) => {
        dispatch(setField({ path: ['pagination', 'page'], value: value }));
    };

    const handleInputPageChange = ({ target }) => {
        dispatch(setField({ path: ['pagination', 'page'], value: parseInt(target.value) }));
    };
    return (
        <Stack spacing={4} sx={{ marginLeft: '-30px', flexDirection: 'row' }}>
            <TextField
                variant='outlined'
                type='number'
                value={currentPage}
                className={classes.root}
                onChange={handleInputPageChange}
            />
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                boundaryCount={2}
                renderItem={(item) => (
                    <PaginationItem
                        components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}
            />
        </Stack>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            borderColor: '#707070',
            height: '40px',
            boxShadow: 'rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px',
            marginTop: '28px'
        },
        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none'
        },
        '& input[type=number]': {
            MozAppearance: 'textfield'
        },
        width: '100px'
    }
}));

export default SGPagination;
