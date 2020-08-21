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
                    icon={<AvatarPlaceholder />}
                    iconSize={40}
                    title="Title"
                    description="Description"
                    onPress={() => {}}
                />

                <Row
                    icon={<AvatarPlaceholder />}
                    iconSize={40}
                    headline="Headline"
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    badge={9}
                    href="https://google.com"
                />

                <Row
                    icon={<AvatarPlaceholder />}
                    iconSize={40}
                    title="Title"
                    description="Description"
                    switch={{defaultValue: false}}
                />

                <Row
                    icon={<AvatarPlaceholder />}
                    iconSize={40}
                    title="Title"
                    description="Description"
                    checkbox={{defaultValue: true}}
                />
            </RowList>
        </NegativeBox>

        <SectionTitle>Boxed rows list</SectionTitle>
        <BoxedRowList>
            <BoxedRow
                icon={<AvatarPlaceholder />}
                iconSize={40}
                title="Title"
                description="Description"
                onPress={() => {}}
            />

            <BoxedRow
                icon={<AvatarPlaceholder />}
                iconSize={40}
                headline="Headline"
                title="Title"
                subtitle="Subtitle"
                description="Description"
                badge={9}
                href="https://google.com"
            />

            <BoxedRow
                icon={<AvatarPlaceholder />}
                iconSize={40}
                title="Title"
                description="Description"
                switch={{defaultValue: false}}
            />

            <BoxedRow
                icon={<AvatarPlaceholder />}
                iconSize={40}
                title="Title"
                description="Description"
                checkbox={{defaultValue: true}}
            />
        </BoxedRowList>
    </ResponsiveLayout>
);

export default ListTest;
