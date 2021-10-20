import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import './Page.css';
import Main from './main/Main';
import DetailQlsv from './main/DetailQlsv';
import UpdateQlsv from './main/UpdateQlsv';
import AddQlsv from './main/AddQlsv';

const page = () => {
    return (
        <>
            <Header />
            <main>
                <Switch>
                    <Route path="/page" exact>
                        <Redirect to="/page/qlsv" />
                    </Route>
                    <Route path="/page/qlsv" exact>
                        <Main />
                    </Route>
                    <Route path="/page/qlsv/:qlsvId" exact>
                        <DetailQlsv />
                    </Route>
                    <Route path="/page/update/:updateId">
                        <UpdateQlsv />
                    </Route>
                    <Route path="/page/add-qlsv">
                        <AddQlsv />
                    </Route>
                </Switch>
            </main>
        </>
    );
};

export default page;