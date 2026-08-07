'use client';

import * as React from 'react';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import Badge from '../../../badge';

export default {
    title: 'Components/SidenavBar/Bar',
    parameters: {
        fullScreen: true,
    },
};

export const DifferentAssets = (): React.JSX.Element => (
    <div style={{height: '100vh'}}>
        <SidenavBar aria-label="Different assets example">
            <SidenavSection>
                <SidenavItem id="icon-asset" label="With icon" asset={IconHomeRegular} href="#icon-asset" />
            </SidenavSection>
            <SidenavSection title="Alternative assets" dividerTop>
                <SidenavItem
                    id="badge-asset"
                    label="With badge"
                    asset={<Badge value={5} />}
                    href="#badge-asset"
                />
                <SidenavItem
                    id="avatar-asset"
                    label="With avatar"
                    asset={
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: '#FF6B35',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                        >
                            AB
                        </div>
                    }
                    href="#avatar-asset"
                />
                <SidenavItem
                    id="image-asset"
                    label="With image"
                    asset={
                        <img
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Crect fill='%23E8E8E8' width='20' height='20'/%3E%3Ctext x='10' y='15' font-size='12' text-anchor='middle' fill='%23666'%3E📷%3C/text%3E%3C/svg%3E"
                            alt=""
                            style={{width: 20, height: 20}}
                        />
                    }
                    href="#image-asset"
                />
                <SidenavItem
                    id="emoji-asset"
                    label="With emoji"
                    asset={<span style={{fontSize: 20, lineHeight: 1}}>⭐</span>}
                    href="#emoji-asset"
                />
                <SidenavItem
                    id="custom-box-asset"
                    label="With custom box"
                    asset={
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: '#00BCD4',
                                borderRadius: 4,
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            +
                        </div>
                    }
                    href="#custom-box-asset"
                />
                <SidenavItem
                    id="radio-asset"
                    label="With custom component"
                    asset={
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: '2px solid #999',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxSizing: 'border-box',
                            }}
                        >
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#0066CC',
                                }}
                            />
                        </div>
                    }
                    href="#radio-asset"
                />
            </SidenavSection>
        </SidenavBar>
    </div>
);

DifferentAssets.storyName = 'Different assets';
