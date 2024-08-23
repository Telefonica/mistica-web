import * as React from 'react';
import Icon2GRegular from '../generated/mistica-icons/icon-2-g-regular';
import IconPlayFilled from '../generated/mistica-icons/icon-play-filled';
import {RowList, BoxedRowList, BoxedRow, Row} from '../list';

const v = true as boolean;

// @ts-expect-error - missing children
<RowList />;

// @ts-expect-error - missing children
<BoxedRowList />;

// This should be an error but required type checks are not implemented
<RowList>
    <BoxedRow title="basic" />
</RowList>;

// This should be an error but required type checks are not implemented
<BoxedRowList>
    <Row title="basic" />
</BoxedRowList>;

<RowList>
    {/* @ts-expect-error - missing props */}
    <Row />
    <Row title="with children">
        {/* @ts-expect-error - children not allowed */}
        <span>error</span>
    </Row>
    {/* OK - basic */}
    <Row title="basic" />
    {/* OK - to */}
    <Row title="to" to="/to" />
    <Row title="to" to="/to" trackingEvent={{name: 'something'}} />
    <Row title="to" to="/to" fullPageOnWebView />
    <Row title="to" to="/to" newTab />
    {/* OK - href */}
    <Row title="href" href="/href" />
    <Row title="href" href="/href" trackingEvent={{name: 'something'}} />
    <Row title="href" href="/href" newTab />
    {/* @ts-expect-error - fullPageOnWebView not allowed in href */}
    <Row title="href" href="/href" fullPageOnWebView />
    {/* OK - onPress */}
    <Row title="onPress" onPress={() => {}} />
    <Row title="onPress" onPress={() => {}} trackingEvent={{name: 'something'}} />
    {/* @ts-expect-error - fullPageOnWebView not allowed in onPress */}
    <Row title="onPress" onPress={() => {}} fullPageOnWebView />
    {/* OK - switch */}
    <Row title="switch" trackingEvent={{name: 'something'}} switch={{name: 'switch', value: true}} />
    <Row
        title="switch + onPress"
        trackingEvent={{name: 'something'}}
        switch={{name: 'switch', value: true}}
        onPress={() => {}}
    />
    {/* OK - checkbox */}
    <Row title="checkbox" trackingEvent={{name: 'something'}} checkbox={{name: 'checkbox', value: true}} />
    <Row
        title="checkbox + onPress"
        trackingEvent={{name: 'something'}}
        checkbox={{name: 'checkbox', value: true}}
        onPress={() => {}}
    />
    {/* OK - radio */}
    <Row title="radio" trackingEvent={{name: 'something'}} radioValue="radio" />
    <Row title="radio + onPress" trackingEvent={{name: 'something'}} radioValue="radio" onPress={() => {}} />
    {/* OK - iconButton */}
    <Row
        title="iconButton"
        trackingEvent={{name: 'something'}}
        iconButton={{
            'aria-label': 'do something',
            Icon: Icon2GRegular,
            onPress: () => {},
            trackingEvent: {name: 'something'},
        }}
    />
    <Row
        title="iconButton + onPress"
        onPress={() => {}}
        trackingEvent={{name: 'something'}}
        iconButton={{
            'aria-label': 'do something',
            Icon: Icon2GRegular,
            onPress: () => {},
            trackingEvent: {name: 'something'},
        }}
    />
    {/* @ts-expect-error - can't use trackingEvent without to/href/onPress */}
    <Row title="tracking event without to/href/onPress" trackingEvent={{name: 'something'}} />

    <Row title="conditional onPress" onPress={v ? () => {} : undefined} />
    <Row title="conditional href" href={v ? '' : undefined} />
    <Row title="conditional to" to={v ? '' : undefined} />
    <Row
        title="conditional iconButton"
        iconButton={v ? {Icon: IconPlayFilled, 'aria-label': 'label'} : undefined}
    />
    <Row title="danger" danger />
</RowList>;

<BoxedRowList>
    {/* @ts-expect-error - missing props */}
    <BoxedRow />

    <BoxedRow title="with children">
        {/* @ts-expect-error - children not allowed */}
        <span>error</span>
    </BoxedRow>

    {/* OK - basic */}
    <BoxedRow title="basic" />

    {/* OK - to */}
    <BoxedRow title="to" to="/to" />
    <BoxedRow title="to" to="/to" fullPageOnWebView />

    {/* OK - href */}
    <BoxedRow title="href" href="/href" />
    {/* @ts-expect-error - fullPageOnWebView not allowed in href */}
    <BoxedRow title="href" href="/href" fullPageOnWebView />

    {/* OK - onPress */}
    <BoxedRow title="onPress" onPress={() => {}} />
    {/* @ts-expect-error - fullPageOnWebView not allowed in onPress */}
    <BoxedRow title="onPress" onPress={() => {}} fullPageOnWebView />

    {/* OK - switch */}
    <BoxedRow title="switch" switch={{name: 'switch', value: true}} />

    {/* OK - switch */}
    <BoxedRow
        title="with conditional switch"
        switch={v ? {name: 'switch', value: true} : undefined}
        onPress={() => {}}
    />

    {/* OK - switch */}
    <BoxedRow title="with switch" switch={v ? {name: 'switch', value: true} : undefined} />

    {/* OK - checkbox */}
    <BoxedRow title="checkbox" checkbox={{name: 'checkbox', value: true}} />

    {/* OK - checkbox */}
    <BoxedRow
        title="with conditional checkbox"
        checkbox={v ? {name: 'checkbox', value: true} : undefined}
        onPress={() => {}}
    />

    {/* OK - checkbox */}
    <BoxedRow title="with checkbox" checkbox={v ? {name: 'checkbox', value: true} : undefined} />

    {/* OK - iconButton */}
    <BoxedRow
        title="iconButton"
        iconButton={{
            'aria-label': 'do something',
            Icon: Icon2GRegular,
            onPress: () => {},
            trackingEvent: {name: 'something'},
        }}
    />
    <BoxedRow
        title="iconButton + onPress"
        onPress={() => {}}
        trackingEvent={{name: 'something'}}
        iconButton={{
            'aria-label': 'do something',
            Icon: Icon2GRegular,
            onPress: () => {},
            trackingEvent: {name: 'something'},
        }}
    />

    {/* @ts-expect-error - both checkbox and switch cannot be defined at the same time */}
    <BoxedRow
        title="both switch and checkbox"
        onPress={() => {}}
        checkbox={v ? {defaultValue: true, onChange: () => {}} : undefined}
        switch={v ? {defaultValue: true, onChange: () => {}} : undefined}
    />

    {/* OK - radio */}
    <BoxedRow title="radio" radioValue="radio" />

    <BoxedRow title="danger" danger />

    <BoxedRow title="inverse" isInverse />

    {/* @ts-expect-error - danger+inverse is forbbiden */}
    <BoxedRow title="danger inverse is forbbiden" danger isInverse />

    {/* @ts-expect-error - danger+inverse is forbbiden and v can be true here */}
    <BoxedRow title="maybe inverse danger" isInverse={v} danger />
    {/* @ts-expect-error - danger+inverse is forbbiden and v can be true here */}
    <BoxedRow title="inverse and maybe danger" isInverse danger={v} />
    {/* @ts-expect-error - danger+inverse is forbbiden and v can be true here */}
    <BoxedRow title="maybe inverse and maybe danger" isInverse={v} danger={v} />

    <BoxedRow title="maybe inverse no danger" isInverse={v} />
    <BoxedRow title="maybe danger no inverse" danger={v} />

    {/* OK - controls with right content */}
    <BoxedRow title="radio + right" radioValue="radio" right={<Icon2GRegular />} />
    <BoxedRow title="checkbox + right" checkbox={{name: 'checkbox', value: true}} right={<Icon2GRegular />} />
    <BoxedRow title="switch + right" switch={{name: 'switch', value: true}} right={<Icon2GRegular />} />
    <BoxedRow
        title="iconButton + right"
        iconButton={{Icon: Icon2GRegular, 'aria-label': 'do something'}}
        right={<Icon2GRegular />}
    />

    {/* OK - force chevron */}
    <BoxedRow title="basic with chevron" withChevron />

    {/* OK - disable chevron in interactive rows */}
    <BoxedRow title="basic" onPress={() => {}} withChevron={false} />
    <BoxedRow title="basic" href="#" withChevron={false} />
    <BoxedRow title="basic" to="#" withChevron={false} />
</BoxedRowList>;
