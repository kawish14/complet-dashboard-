import React from 'react'

import { Router, Route, Link, Switch } from 'react-router-dom';
import  {PrivateRoute}  from './PrivateRoute'
import history from '../history'
import Role from '../role';
import routes from '../routes'
import {Mainpage} from '../pages/main';
import {CustomerTable, DCTable} from '../pages/table'
import {SouthRegion}  from '../pages/region/south';
import { LoginPage } from '../LoginPage';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAdmin: false,
            is_SouthDev: false
        }
    }
    render() {


        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <React.Fragment>
                            {
                                routes.map((route, index) => {
                                    return <PrivateRoute key={index} {...route} />
                                })
                            }
                            
                        </React.Fragment>
                    </Switch>
{/*                     <PrivateRoute exact path="/" component={Mainpage} />
                    <PrivateRoute path="/south" roles={[Role.Admin, Role.SouthDev]} component={SouthRegion} />
                    <PrivateRoute path="/customer-table" roles={[Role.Admin, Role.SouthDev]} component={CustomerTable} /> */}
                    <Route path="/login" component={LoginPage} />
                </div>
            </Router>

        )
    }
}
export { Dashboard}