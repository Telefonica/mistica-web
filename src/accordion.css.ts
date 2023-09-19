import { style, styleVariants } from '@vanilla-extract/css';
import { sprinkles } from './sprinkles.css';
import { vars } from './skins/skin-contract.css';
import * as mq from './media-queries.css';


export const accordion = style([
    sprinkles({
        width: '100%',
    }),
    {
    },
]);

export const accordionSection = style([
    sprinkles({
    }),
    {
        border: '1px solid #ccc',
        margin: 10,
    },
]);

export const accordionHeader = style([
    sprinkles({
    }),
    {
        cursor: 'pointer',
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderBottom: '1px solid #ccc'
    },
]);

export const accordionHeaderActive = style([
    sprinkles({
    }),
    {
        backgroundColor: '#e0e0e0'
    },
]);

export const accordionContent = style([
    sprinkles({
    }),
    {
        maxHeight: 0,
        overflow: 'hidden',
       // height: 0,
       // opacity: 0,
        transition: 'max-height 50s ease-in-out',
    },
]);

export const accordionContentOpen = style([
    sprinkles({
    }),
    {
        opacity: 1,
    },
]);

export const containerBase = style([
    sprinkles({
        width: '100%',
       height: '100%'
        // borderRadius: 8,
    }),
    {
          // border: '1px solid red',
    },
]);

export const header = style([
    sprinkles({
        display: 'flex',
        width: '100%',
        padding: 16,

    }),
    {
        minHeight: 59,
        '@media': {
            [mq.tabletOrSmaller]: {
                minHeight: 56,
            },
            [mq.supportsHover]: {
                transition: 'background-color 0.1s ease-in-out',
                selectors: {
                    '&:hover': {
                        backgroundColor: vars.colors.backgroundContainerHover,
                    },
                    '&:focus-within': {
                        backgroundColor: vars.colors.backgroundContainerPressed,
                    },
                },
            },
        },
    },
]);

export const headerVariants = styleVariants({
    default: [
        header,
        sprinkles({
            background: 'transparent',
        }),
        {
        },
    ],
    inverse: [
        header,
        sprinkles({

            background: vars.colors.backgroundContainerBrand,
            color: vars.colors.textLinkDanger
        }),
    ],
});



export const rowBody = sprinkles({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});

export const touchable = style([
    sprinkles({
        display: 'flex',
        width: '100%',
        padding: 0,
        border: 'none',
        background: 'transparent',
    }),
    {
    },
]);



export const textAlign = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    }),
    {
    },
]);


export const textContent = style({
    textAlign: 'left',
    width: '100%',
    paddingLeft: 16,
});

export const asset = sprinkles({
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
});

export const icon = style([
    sprinkles({
        display: 'flex',
        alignItems: 'center',
        paddingRight: 16,

    }),
    {
       
        
    },
]);

export const iconVariants = styleVariants({
    default: [
        icon,
        sprinkles({
            background: 'transparent',
        }),
        {
        },
    ],
    inverse: [
        header,
        sprinkles({
            color: vars.colors.inverse
        }),
    ],
});



export const content = style([
    sprinkles({
        height: '100%',
        background: vars.colors.backgroundContainer,
        paddingX: 16,
        paddingBottom: 16,
    }),
    {
    },
]);

export const contentVariants = styleVariants({
    default: [
        content,
        sprinkles({
            background: vars.colors.backgroundContainer,
        }),
        {
            height: 0,
            overflow: 'hidden',
        },

    ],
    selected: [
        content,
        sprinkles({
            // paddingX: 16,
            //   paddingBottom: 16,
            color: vars.colors.textSecondary
        }),
        {
            transition: 'max-height 0.4s ease-in-out ',
        },
    ],

});

export const slot = style({
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: 500,
    backgroundColor: '#20FFB1',
    borderBottom: '1px solid #20E466',
});

export const center = sprinkles({
    display: 'flex',
    alignItems: 'center',
});

export const contentShow = style([
    sprinkles({
    }),
    {
      //  maxHeight: 0,
       // maxHeight: '100%',
        
        overflow: 'hidden',
        transition: 'max-height 2s ease-in-out',


    },
]);





// export const contentShowVariants = styleVariants({
//     default: [
//         contentShow,
//         sprinkles({

//         }),
//         {
//         },

//     ],
//     inverse: [
//         contentShow,
//         sprinkles({
//             height: 80,
//             background: vars.colors.error,
//         }),
//         {
//         },
//     ],

// });










