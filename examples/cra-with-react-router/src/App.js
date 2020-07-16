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
    NegativeBox,
} from '@telefonica/mistica';
import {BrowserRouter as Router, Switch, Route, useRouteMatch, useParams, useHistory} from 'react-router-dom';

const Section = ({title, button, children}) => (
    <>
        <MainSectionHeaderLayout>
            <MainSectionHeader title={title} description={`Welcome to ${title} section`} button={button} />
        </MainSectionHeaderLayout>
        <ResponsiveLayout>{children}</ResponsiveLayout>
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

const About = () => <Section title="About" button={<ButtonPrimary to="/">Go home</ButtonPrimary>}></Section>;

const User = () => {
    const {name} = useParams();
    const history = useHistory();
    return (
        <>
            <SectionTitle>Hello, {name}</SectionTitle>
            <ButtonPrimary onPress={history.goBack}>Go back</ButtonPrimary>
        </>
    );
};

const Users = () => {
    const match = useRouteMatch();
    return (
        <Section title="Users" button={<ButtonPrimary to="/">Go home</ButtonPrimary>}>
            <Switch>
                <Route path={`${match.url}/:name`}>
                    <User />
                </Route>
                <Route path={match.url}>
                    <NegativeBox>
                        <RowList>
                            <Row to="/users/Juan" title="Juan" />
                            <Row to="/users/Luis" title="Luis" />
                        </RowList>
                    </NegativeBox>
                </Route>
            </Switch>
        </Section>
    );
};

const App = () => (
    <Router>
        <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/users">
                <Users />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    </Router>
);

export default App;
