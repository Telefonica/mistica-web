import * as React from 'react';
import {RowList, BoxedRowList, BoxedRow, Row} from '../list';

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

    {/* OK - href */}
    <Row title="href" href="/href" />
    {/* @ts-expect-error - fullPageOnWebView not allowed in href */}
    <Row title="href" href="/href" fullPageOnWebView />

    {/* OK - href */}
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

    {/* OK - href */}
    <BoxedRow title="onPress" onPress={() => {}} />
    {/* @ts-expect-error - fullPageOnWebView not allowed in onPress */}
    <BoxedRow title="onPress" onPress={() => {}} fullPageOnWebView />

    {/* OK - switch */}
    <BoxedRow title="switch" switch={{name: 'switch', value: true}} />

    {/* OK - checkbox */}
    <BoxedRow title="checkbox" checkbox={{name: 'checkbox', value: true}} />

    {/* OK - radio */}
    <BoxedRow title="radio" radioValue="radio" />
</BoxedRowList>;
