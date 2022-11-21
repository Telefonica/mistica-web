import {style, globalStyle} from '@vanilla-extract/css';

/* !
 * https://github.com/arqex/react-datetime
 */

export const reactDatePicker = style({});

globalStyle(`${reactDatePicker} td, ${reactDatePicker} th`, {verticalAlign: 'middle'});

globalStyle(`${reactDatePicker} .rdt`, {position: 'relative', userSelect: 'none'});

globalStyle(`${reactDatePicker} .rdtPicker`, {
    display: 'none',
    position: 'absolute',
    minWidth: 250,
    padding: 4,
    marginTop: 1,
    zIndex: '99999 !important',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,.1)',
    border: '1px solid #f9f9f9',
});
globalStyle(`${reactDatePicker} .rdtOpen .rdtPicker`, {
    display: 'block',
});
globalStyle(`${reactDatePicker} .rdtStatic .rdtPicker`, {boxShadow: 'none', position: 'static'});
globalStyle(`${reactDatePicker} .rdtPicker .rdtTimeToggle`, {textAlign: 'center'});
globalStyle(`${reactDatePicker} .rdtPicker table`, {width: '100%', margin: 0});
globalStyle(`${reactDatePicker} .rdtPicker td`, {textAlign: 'center', height: 28});
globalStyle(`${reactDatePicker} .rdtPicker th`, {textAlign: 'center', height: 28});
globalStyle(`${reactDatePicker} .rdtPicker td`, {cursor: 'pointer'});
globalStyle(
    `${reactDatePicker} .rdtPicker td.rdtDay:hover, ${reactDatePicker} .rdtPicker td.rdtHour:hover, ${reactDatePicker} .rdtPicker td.rdtMinute:hover, ${reactDatePicker} .rdtPicker td.rdtSecond:hover, ${reactDatePicker} .rdtPicker .rdtTimeToggle:hover`,
    {
        background: '#eeeeee',
        cursor: 'pointer',
    }
);
globalStyle(`${reactDatePicker} .rdtPicker td.rdtOld, ${reactDatePicker} .rdtPicker td.rdtNew`, {
    color: '#999999',
});
globalStyle(`${reactDatePicker} .rdtPicker td.rdtToday`, {position: 'relative'});
globalStyle(`${reactDatePicker} .rdtPicker td.rdtToday:before`, {
    content: '""',
    display: 'inline-block',
    borderLeft: '7px solid transparent',
    borderBottom: '7px solid #428bca',
    borderTopColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    bottom: 4,
    right: 4,
});

globalStyle(`${reactDatePicker} .rdtPicker td.rdtActive, ${reactDatePicker} .rdtPicker td.rdtActive:hover`, {
    backgroundColor: '#428bca',
    color: '#fff',
    textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
});
globalStyle(`${reactDatePicker} .rdtPicker td.rdtActive.rdtToday:before`, {borderBottomColor: '#fff'});
globalStyle(
    `${reactDatePicker} .rdtPicker td.rdtDisabled, ${reactDatePicker} .rdtPicker td.rdtDisabled:hover`,
    {background: 'none', color: '#999999', cursor: 'default'}
);
globalStyle(`${reactDatePicker} .rdtPicker td span.rdtOld`, {color: '#999999'});
globalStyle(
    `${reactDatePicker} .rdtPicker td span.rdtDisabled, ${reactDatePicker} .rdtPicker td span.rdtDisabled`,
    {
        background: 'none',
        color: '#999999',
        cursor: 'default',
    }
);
globalStyle(`${reactDatePicker} .rdtPicker th`, {borderBottom: '1px solid #f9f9f9', fontWeight: 'bold'});
globalStyle(`${reactDatePicker} .rdtPicker .dow`, {
    width: '14.2857%',
    borderBottom: 'none',
    cursor: 'default',
});
globalStyle(`${reactDatePicker} .rdtPicker th.rdtSwitch`, {width: 100});
globalStyle(`${reactDatePicker} .rdtPicker th.rdtNext, ${reactDatePicker} .rdtPicker th.rdtPrev`, {
    fontSize: 21,
    verticalAlign: 'top',
});
globalStyle(`${reactDatePicker} .rdtPrev span, ${reactDatePicker} .rdtNext span`, {
    display: 'block',
    userSelect: 'none',
});
globalStyle(
    `${reactDatePicker} .rdtPicker th.rdtDisabled, ${reactDatePicker} .rdtPicker th.rdtDisabled:hover`,
    {
        background: 'none',
        color: '#999999',
        cursor: 'default',
    }
);
globalStyle(`${reactDatePicker} .rdtPicker thead tr:first-of-type th`, {cursor: 'pointer'});
globalStyle(`${reactDatePicker} .rdtPicker thead tr:first-of-type th:hover`, {background: '#eeeeee'});
globalStyle(`${reactDatePicker} .rdtPicker tfoot`, {borderTop: '1px solid #f9f9f9'});
globalStyle(`${reactDatePicker} .rdtPicker button`, {border: 'none', background: 'none', cursor: 'pointer'});
globalStyle(`${reactDatePicker} .rdtPicker button:hover`, {backgroundColor: '#eee'});
globalStyle(`${reactDatePicker} .rdtPicker thead button`, {width: '100%', height: '100%'});
globalStyle(`${reactDatePicker} td.rdtMonth, ${reactDatePicker} td.rdtYear`, {
    height: 50,
    width: '25%',
    cursor: 'pointer',
});
globalStyle(`${reactDatePicker} td.rdtMonth:hover, ${reactDatePicker} td.rdtYear:hover`, {
    background: '#eee',
});
globalStyle(`${reactDatePicker} .rdtCounters`, {display: 'inline-block'});
globalStyle(`${reactDatePicker} .rdtCounters > div`, {float: 'left'});
globalStyle(`${reactDatePicker} .rdtCounter`, {height: 100, width: 40});
globalStyle(`${reactDatePicker} .rdtCounterSeparator`, {lineHeight: '100px'});
globalStyle(`${reactDatePicker} .rdtCounter .rdtBtn`, {
    height: '40%',
    lineHeight: '40px',
    cursor: 'pointer',
    display: 'block',
    userSelect: 'none',
});
globalStyle(`${reactDatePicker} .rdtCounter .rdtBtn:hover`, {background: '#eee'});
globalStyle(`${reactDatePicker} .rdtCounter .rdtCount`, {height: '20%', fontSize: '1.2em'});
globalStyle(`${reactDatePicker} .rdtMilli`, {verticalAlign: 'middle', paddingLeft: 8, width: 48});
globalStyle(`${reactDatePicker} .rdtMilli input`, {width: '100%', fontSize: '1.2em', marginTop: 37});
globalStyle(`${reactDatePicker} .rdtTime td`, {cursor: 'default'});
