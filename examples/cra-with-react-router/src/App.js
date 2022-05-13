import React from 'react';
import {
    MainSectionHeaderLayout,
    MainSectionHeader,
    ResponsiveLayout,
    RowList,
    Row,
    ButtonLink,
    Stack,
    ButtonPrimary,
    SectionTitle,
    Box,
    NegativeBox,
} from '@telefonica/mistica';
import {BrowserRouter as Router, Routes, Route, useMatch, useParams, useNavigate} from 'react-router-dom';

const Section = ({title, button, children}) => (
    <>
        <MainSectionHeaderLayout>
            <MainSectionHeader title={title} description={`Welcome to ${title} section`} button={button} />
        </MainSectionHeaderLayout>
        <ResponsiveLayout>
            <Box paddingY={24}>{children}</Box>
        </ResponsiveLayout>
    </>
);

const Home = () => (
    <Section title="Home">
        <SectionTitle>Navigate to other sections:</SectionTitle>
        <Stack>
            <ButtonLink to="/about">About</ButtonLink>
            <ButtonLink to="/users">Users</ButtonLink>
        </Stack>
    </Section>
);

const About = () => (
    <Section title="About" button={<ButtonPrimary to="/">Go home</ButtonPrimary>}>
        About section
    </Section>
);

const User = () => {
    const {name} = useParams();
    const navigate = useNavigate();
    return (
        <Stack space={16}>
            <SectionTitle>Hello, {name}</SectionTitle>
            <ButtonPrimary onPress={() => navigate(-1)}>Go back</ButtonPrimary>
        </Stack>
    );
};

const Users = () => {
    return (
        <Section title="Users" button={<ButtonPrimary to="/">Go home</ButtonPrimary>}>
            <Routes>
                <Route path={`/:name`} element={<User />} />
                <Route
                    path={'/'}
                    element={
                        <NegativeBox>
                            <RowList>
                                <Row to="/users/Juan" title="Juan" />
                                <Row to="/users/Luis" title="Luis" />
                            </RowList>
                        </NegativeBox>
                    }
                />
            </Routes>
        </Section>
    );
};

const App = () => (
    <Router>
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
);

export default App;
