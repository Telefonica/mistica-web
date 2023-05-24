import {sprinkles} from './sprinkles.css';
import {vars} from './skins/skin-contract.css';

export const avatar = sprinkles({
    borderRadius: vars.borderRadii.avatar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
});

export const image = sprinkles({
    objectFit: 'cover',
});
