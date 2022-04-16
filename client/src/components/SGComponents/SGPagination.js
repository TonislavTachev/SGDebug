import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector, useDispatch } from 'react-redux';
import { setField } from '../../actions/actions';

const SGPagination = () => {
    const totalPages = useSelector(({ requestReducer }) =>
        requestReducer.getIn(['pagination', 'totalPages'])
    );

    const dispatch = useDispatch();

    const handlePageChange = (event, value) => {
        dispatch(setField({ path: ['pagination', 'page'], value: value }));
    };
    return (
        <Stack spacing={4} sx={{ marginLeft: '-30px', marginTop: '20px' }}>
            <Pagination
                count={totalPages}
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

export default SGPagination;
