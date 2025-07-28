import React from 'react';
import Layout from '@theme-original/Layout';
import WIPBanner from '../../components/WIPBanner';

export default function LayoutWrapper(props) {
    return (
        <>
            <WIPBanner/>
            <Layout {...props} />
        </>
    );
}
