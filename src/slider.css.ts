import { sprinkles } from './sprinkles.css';
import { vars } from './skins/skin-contract.css';
import { style, keyframes } from '@vanilla-extract/css';
import { mq } from '.';

export const container = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        
        

    }),
    {
       
        width: 375,
        minHeight: 200,

    },

]);

export const rangeSlider = style([
    sprinkles({
        display: 'flex',
        position: 'relative',
        

    }),
    {
    },

]);

export const slider = style([
    rangeSlider,
    sprinkles({
        borderRadius: vars.borderRadii.bar,
        background: vars.colors.control,
    }),
    {
        'WebkitAppearance': 'none',
        width: 363,
        height: 4,
        outline: 'none',

        '::-webkit-slider-thumb': { 
            'WebkitAppearance': 'none',
            width: 20, 
            height: 20, 
            cursor: 'pointer',
            zIndex: 3,
            position: 'relative',
            
            
           
        },

        
        
    },
]);

export const sliderThumb = style([
    
    sprinkles({

        position: 'absolute',
        background: vars.colors.controlActivated,
    }),
    {
        width: 20,
        height: 20,
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',  
        zIndex: 1,
        
     
     
        
        //boxShadow: `0px 0px 1px 2px ${vars.colors.error}` ,
        
    },
]);

export const tooltip = style([
    sprinkles({
        position: 'absolute',
    }),
    {
        width: 44,
        height: 32,
        top: -32,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#ffd200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 35,
        color: '#fff',
        borderRadius: 3,
        ':before': {
            content: '',
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '10px solid #FFd200',
            bottom: -8,
            left: '50%',
            transform: 'translate(-50%)',
        }
    },
]);

export const progress = style([

    sprinkles({
        position: 'absolute',
        borderRadius: vars.borderRadii.bar,
        background: vars.colors.controlActivated,
    }),
    {
        width: '50%',
        height: 4,
        top: '50%',
        transform: 'translateY(-50%)',
        left: 0,
        pointerEvents: 'none',
    },
]);