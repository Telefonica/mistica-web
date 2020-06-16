// @flow
import * as React from 'react';

type AvatarPlaceholderProps = {size?: string | number};
type PlaceholderProps = {width?: string | number; height?: string | number};

export const AvatarPlaceholder = ({size = 40}: AvatarPlaceholderProps): React.ReactElement<'div'> => (
    <div style={{width: size, height: size, borderRadius: '50%', background: 'gray'}} />
);

const Placeholder = ({width = 'auto', height = 120}: PlaceholderProps): React.ReactElement<'div'> => (
    <div
        style={{
            height,
            width,
            background: 'rgba(51,51,51,0.08)',
            border: '2px solid rgba(51,51,51,0.3)',
            position: 'relative',
        }}
    >
        <svg width="full" height="full">
            <line style={{strokeWith: 2, stroke: 'rgba(51,51,51,.1)'}} x1={0} y1={0} x2="100%" y2="100%" />
            <line style={{strokeWith: 2, stroke: 'rgba(51,51,51,.1)'}} x1="100%" y1={0} x2={0} y2="100%" />
        </svg>
    </div>
);

export default Placeholder;
