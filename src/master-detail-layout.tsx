'use client';
import * as React from 'react';
import GridLayout from './grid-layout';
import {useScreenSize} from './hooks';
import ResponsiveLayout from './responsive-layout';

type Props = {
    isOpen: boolean;
    master: React.ReactNode;
    detail?: React.ReactNode;
    children?: void;
};

const MasterDetailLayout = ({isOpen, master, detail}: Props): JSX.Element => {
    const {isTabletOrSmaller} = useScreenSize();

    if (isTabletOrSmaller) {
        return <ResponsiveLayout>{isOpen ? detail : master}</ResponsiveLayout>;
    }

    return (
        <ResponsiveLayout>
            <GridLayout template="4+6" left={master} right={detail} />
        </ResponsiveLayout>
    );
};

export default MasterDetailLayout;
