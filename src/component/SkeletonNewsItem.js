import React, { useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import LoadingBar from 'react-top-loading-bar';

const SkeletonNewsItem = () => {
    const loadingBarRef = useRef(null);

    useEffect(() => {
        loadingBarRef.current.continuousStart();
        // Simulate loading completion
        const timer = setTimeout(() => {
            loadingBarRef.current.complete();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <LoadingBar color="#000000" ref={loadingBarRef} />
            <div className="card">
                <Skeleton height={180} />
                <div className="card-body">
                    <h5 className="card-title">
                        <Skeleton width={`80%`} />
                    </h5>
                    <p className="card-text">
                        <Skeleton count={3} />
                    </p>
                    <button className="btn btn-dark btn-sm disabled">
                        <Skeleton width={`60px`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkeletonNewsItem;
