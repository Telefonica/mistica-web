import * as React from 'react';
import {
    ResponsiveLayout,
    SectionTitle,
    NegativeBox,
    RowList,
    Row,
    AvatarPlaceholder,
    BoxedRowList,
    BoxedRow,
} from '../..';

const ListTest: React.FC = () => (
    <ResponsiveLayout>
        <SectionTitle>Simple list</SectionTitle>
        <NegativeBox>
            <RowList>
                <Row
                    asset={<AvatarPlaceholder size={40} />}
                    title="Title"
                    description="Description"
                    onPress={() => {}}
                />

                <Row
                    asset={<AvatarPlaceholder size={40} />}
                    headline="Headline"
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    badge={9}
                    href="https://google.com"
                />

                <Row
                    asset={<AvatarPlaceholder size={40} />}
                    title="Title"
                    description="Description"
                    switch={{defaultValue: false}}
                />

                <Row
                    asset={<AvatarPlaceholder size={40} />}
                    title="Title"
                    description="Description"
                    checkbox={{defaultValue: true}}
                />
            </RowList>
        </NegativeBox>

        <SectionTitle>Boxed rows list</SectionTitle>
        <BoxedRowList>
            <BoxedRow
                asset={<AvatarPlaceholder size={40} />}
                title="Title"
                description="Description"
                onPress={() => {}}
            />

            <BoxedRow
                asset={<AvatarPlaceholder size={40} />}
                headline="Headline"
                title="Title"
                subtitle="Subtitle"
                description="Description"
                badge={9}
                href="https://google.com"
            />

            <BoxedRow
                asset={<AvatarPlaceholder size={40} />}
                title="Title"
                description="Description"
                switch={{defaultValue: false}}
            />

            <BoxedRow
                asset={<AvatarPlaceholder size={40} />}
                title="Title"
                description="Description"
                checkbox={{defaultValue: true}}
            />
        </BoxedRowList>
    </ResponsiveLayout>
);

export default ListTest;
