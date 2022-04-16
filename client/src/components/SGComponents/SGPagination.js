import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SGPagination = () => {
    return (
        <Stack spacing={4} sx={{ marginLeft: '-30px', marginTop: '20px' }}>
            <Pagination
                count={15}
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
