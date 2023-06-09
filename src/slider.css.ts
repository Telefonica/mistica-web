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
    //rangeSlider,
    sprinkles({
        borderRadius: vars.borderRadii.bar,
        background: vars.colors.control,
    }),
    {
        'WebkitAppearance': 'none',
        width: 363,
        height: 4,
        outline: 'none',
        margin: 0,
        //marginRight: -20,

        '::-webkit-slider-thumb': { 
            'WebkitAppearance': 'none',
            width: 20, 
            height: 20, 
            cursor: 'pointer',
            
            zIndex: 3,
            position: 'relative',
           
            borderRadius: vars.borderRadii.bar,
            
           
          
            
        
           
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
        top: '80%',
        transform: 'translateY(-50%)',
        left: 0,
        pointerEvents: 'none',
        
    },
]);


export const body = style([

    sprinkles({
        
    }),
    {
        background: '#26281c',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '2em'
        
    
        
        
    },
]);



export const rangeSliderP = style([

    sprinkles({
        
    }),
    {
     position: 'relative',
     justifyContent: 'center',
     alignItems: 'center',
     flexDirection: 'column',
     gap: '1em',
     color: '#fff',
     margin: '4em auto',
        
   
        
    },
]);

export const sliderContainerP = style([

    sprinkles({
        
    }),
    {
       position: 'relative',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       userSelect: 'none',
       width: '90vw',
       maxWidth: '30em' 
        
    },
]);

export const sliderP = style([

    sprinkles({
        
    }),
    {
        'WebkitAppearance': 'none',
        appearance: 'none',
        width: '100%',
        height: '0.5em',
        outline: 'none',
        borderRadius: 3,
        background: '#1f1f1f',
        boxShadow: 'inset 3px 3px 6px #000, 1px 1px 1px #909090',
        cursor: 'pointer',

        '::-webkit-slider-thumb': {
            width: 0,
            zIndex: 3,
            position: 'relative',
        }
        
    },
]);

export const progressP = style([

    sprinkles({
        
    }),
    {
       width: 0,
       height: '0.4em',
       borderRadius: 3,
       background: 'linear-gradiente(90deg, #55e0ff, #3193fc)',
       position: 'absolute',
       top: '50%',
       transform: 'trasnlateY(-50%)',
       left: 0,
       pointerEvents: 'none',
       transitionProperty: 'box-shadow',
       transitionDuration: '0.2s', 
        
    },
]);

export const timeLineP = style([

    sprinkles({
        
    }),
    {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',  
        
    },
]);

export const sliderThumbP = style([

    sprinkles({
        
    }),
    {
      position: 'absolute',
      width: '2em',
      height: '2em',
      background: '#fff',
      borderRadius: '50%',
      top: '50%',
      left: '-0.5em',
      transform: 'translateY(-50%)',
      zIndex: 2,
      pointerEvents: 'none',   
        
    },
]);

export const sliderValuesP = style([

    sprinkles({
        
    }),
    {
       margin: 0,
       width: '100%',
       display: 'flex',
       justifyContent: 'space-between',
       alignItems: 'center', 
        
    },
]);

export const numberInputP = style([

    sprinkles({
        
    }),
    {
      background: 'none',
      color: '#FFF',
      width: '4em',
      border: '1px solid #909090',
      borderRadius: 4  
        
    },
]);
