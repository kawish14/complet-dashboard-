import React from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import { authenticationService} from '../_services/authentication'
import Role from '../role'
import history from '../history'
import routes from '../routes'
import './header.css'

class Header extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false,
            is_SouthDev: false,
        };
    }

    componentDidMount() {

        authenticationService.currentUser.subscribe(x => {
            this.setState({
                currentUser: x,
                isAdmin: x && x.role === Role.Admin,
                is_SouthDev: x && x.role === Role.SouthDEV
            })
        });
        console.log(authenticationService.currentUser.source._value)
    }   
    render(){
        const { currentUser, isAdmin, is_SouthDev } = this.state;

        return(
            <Router history={history}>
                {
                    currentUser &&
                    <header className="topbar" data-navbarbg="skin5">
                        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                            <div className="navbar-header" data-logobg="skin5">

                                <button className="nav-toggler waves-effect waves-light d-block d-md-none" ><i className="ti-menu ti-close" /></button>

                                <button className="navbar-brand" >

                                    <b className="logo-icon p-l-10">

                                        <img src="assets/images/logo-icon.png" alt="homepage" className="light-logo" />
                                    </b>

                                    <span className="logo-text" style={{ color: '#ffffff', paddingLeft: 5 }}>

                                        Transworld
                            </span>

                                </button>

                                <button className="topbartoggler d-block d-md-none waves-effect waves-light" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more" /></button>
                            </div>

                            <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">

                                <ul className="navbar-nav float-left mr-auto">
                                    <li className="nav-item d-none d-md-block"><span className="nav-link sidebartoggler waves-effect waves-light" data-sidebartype="mini-sidebar"><i className="mdi mdi-menu font-24" /></span></li>
                                        <Switch>
                                            {routes.map((route) => (
                                                <Route
                                                    key={route.path}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    component={route.head}
                                                />
                                            ))}
                                        </Switch>
                                

                                    {/*  <li className="nav-item search-box"> <a className="nav-link waves-effect waves-dark" href="javascript:void(0)"><i className="ti-search" /></a>
                                <form className="app-search position-absolute">
                                    <input type="text" className="form-control" placeholder="Search & enter" /> <a className="srh-btn"><i className="ti-close" /></a>
                                </form>
                            </li> */}
                                </ul>

                                <ul className="navbar-nav float-right">
                                    <li style={{ color: '#9a9c9c', marginRight:5}} >
                                        <i className="far fa-user" style={{ color:'#c1c1c1', marginRight: 5 }} />
                                        <span style={{marginRight:4}}>
                                            {authenticationService.currentUser.source._value.firstName}
                                        </span>
                                        <span>
                                            {authenticationService.currentUser.source._value.lastName}
                                        </span>
                                        
                                    </li>
                                  
                                </ul>
                               
                            </div>
                        </nav>
                    </header>
                }
            </Router>

        )
    }
}

export {Header}