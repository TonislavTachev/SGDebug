import React, { useState } from 'react';
import Loader from '../components/SGComponents/SGLoader';

const IsLoadingHoc = (WrappedComponent, loadingMessage) => {
    function HOC(props) {
        const [isLoading, setLoading] = useState(false);

        const setLoadingState = (isComponentLoading) => {
            setLoading(isComponentLoading);
        };

        return (
            <>
                {isLoading && <Loader shouldOpen={isLoading} loadingMessage={loadingMessage} />}
                <WrappedComponent {...props} setLoading={setLoadingState} isLoaded={isLoading} />
            </>
        );
    }
    return HOC;
};

export default IsLoadingHoc;
