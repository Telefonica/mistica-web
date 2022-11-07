import * as React from 'react';
import {RowList, BoxedRowList, BoxedRow, Row} from '../list';

const v = true;

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
    <Row title="to" to="/to" fullPageOnWebView />
    {/* @ts-expect-error - newTab not allowed in to */}
    <Row title="to" to="/to" newTab />

    {/* OK - href */}
    <Row title="href" href="/href" />
    <Row title="href" href="/href" newTab />
    {/* @ts-expect-error - fullPageOnWebView not allowed in href */}
    <Row title="href" href="/href" fullPageOnWebView />

    {/* OK - onPress */}
    <Row title="onPress" onPress={() => {}} />
    {/* @ts-expect-error - fullPageOnWebView not allowed in onPress */}
    <Row title="onPress" onPress={() => {}} fullPageOnWebView />

    {/* OK - switch */}
    <Row title="switch" switch={{name: 'switch', value: true}} />

    {/* OK - checkbox */}
    <Row title="checkbox" checkbox={{name: 'checkbox', value: true}} />

    {/* OK - radio */}
    <Row title="radio" radioValue="radio" />
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

    {/* OK - radio */}
    <BoxedRow title="radio" radioValue="radio" />
</BoxedRowList>;
