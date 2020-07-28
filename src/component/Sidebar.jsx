import React from 'react'
import { Router, Route, NavLink } from 'react-router-dom';
import history from '../history'
import  Role  from '../role';
import { authenticationService } from '../_services/authentication';
import './header.css'


class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false,
            is_SouthDev: false,
            dahboard:false,
            south:false,
            table:false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin,
            is_SouthDev: x && x.role === Role.SouthDEV
        })
        );

    }

    logout = () => {
        authenticationService.logout();
        history.push('/login');
        this.setState({
            dashboard:false,
            south:false,
            table:false
        })
    }

    render() {
        const { currentUser, isAdmin, is_SouthDev, dashboard, south, table } = this.state;
        return (
            <Router history={history}>
                {
                    currentUser &&
                    <aside className="left-sidebar" data-sidebarbg="skin5">
                        <div className="scroll-sidebar">
                            <nav className="sidebar-nav"> 
                                 
                                    <ul id="sidebarnav" className="p-t-30">

                                        <li className="sidebar-item" onClick={() => this.setState({ 
                                                    dashboard:true,
                                                    south:false,
                                                    table:false
                                                }) 
                                            }>
                                            { dashboard ?
                                                <span style={{ backgroundColor: '#004845'}} 
                                                className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false"
                                                onClick={() => history.push("/")}>

                                                    <i className="mdi mdi-view-dashboard" />
                                                    <span className="hide-menu">Dashboard</span>
                                                </span>
                                            :
                                                <span style={{ backgroundColor: '#1f262d' }}
                                                className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false"
                                                onClick={() => history.push("/")}>

                                                    <i className="mdi mdi-view-dashboard" />
                                                    <span className="hide-menu">Dashboard</span>
                                                </span>
                                            }
                                        
                                        </li>
                                    </ul>
                                    
                                         
                                    { isAdmin &&
                                        <div>
                                            <ul id="sidebarnav" className="p-t-30">

                                                <li className="sidebar-item" onClick={() => this.setState({
                                                    south: true,
                                                    dashboard: false,
                                                    table:false
                                                })}>

                                                    {south ?
                                                        <span style={{ backgroundColor: '#004845', cursor: 'pointer' }} className="sidebar-link"
                                                            onClick={() => history.push("/south")}>

                                                            <i className="mdi mdi-layers" />
                                                            <span className="hide-menu">South</span>
                                                        </span>
                                                        :
                                                        <span style={{ backgroundColor: '#1f262d', cursor: 'pointer' }} className="sidebar-link"
                                                            onClick={() => history.push("/south")}>

                                                            <i className="mdi mdi-layers" />
                                                            <span className="hide-menu">South</span>
                                                        </span>

                                                    }

                                                </li>
                                            </ul>

                                            <ul id="sidebarnav" className="p-t-30">
                                                <li className="sidebar-item" onClick={() => this.setState({
                                                    south: false,
                                                    dashboard: false,
                                                    table:true
                                                })}>
                                                    {table ?
                                                        <a style={{ backgroundColor: '#004845', cursor: 'pointer' }} className="sidebar-link has-arrow waves-effect waves-dark" aria-expanded="false">
                                                            <i className="mdi mdi-table"></i>
                                                            <span className="hide-menu">Table </span>
                                                        </a>
                                                    :
                                                        <a style={{ backgroundColor: '#1f262d', cursor: 'pointer' }} className="sidebar-link has-arrow waves-effect waves-dark" aria-expanded="false">
                                                            <i className="mdi mdi-table"></i>
                                                            <span className="hide-menu">Table </span>
                                                        </a>
                                                    }
                                                    <ul aria-expanded="false" className="collapse  first-level">
                                                        <li style={{ cursor: 'pointer' }} className="sidebar-item">
                                                            <span className="sidebar-link" onClick={() => history.push("/customer-table")}>
                                                                <i className="mdi mdi-library-books"></i>
                                                                <span className="hide-menu">Customer Table </span>
                                                            </span>
                                                        </li>
                                                        <li style={{ cursor: 'pointer' }} className="sidebar-item">
                                                            <span className="sidebar-link" onClick={() => history.push("/Dc-table")}>
                                                                <i className="mdi mdi-library-books"></i>
                                                                <span className="hide-menu">DC Table </span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                   
                                                </li>


                                            </ul>
                                        </div>
                                   
                                    }

                                    {is_SouthDev &&
                                        <div>
                                            <ul id="sidebarnav" className="p-t-30">

                                                <li className="sidebar-item" onClick={(e) => this.setState({
                                                    south: true,
                                                    dashboard: false,
                                                    table: false
                                                })}>

                                                    {south ?
                                                        <span style={{ backgroundColor: '#004845', cursor: 'pointer' }} className="sidebar-link"
                                                            onClick={() => history.push("/south")}>

                                                            <i className="mdi mdi-layers" />
                                                            <span className="hide-menu">South</span>
                                                        </span>
                                                        :
                                                        <span style={{ backgroundColor: '#1f262d', cursor: 'pointer' }} className="sidebar-link"
                                                            onClick={() => history.push("/south")}>

                                                            <i className="mdi mdi-layers" />
                                                            <span className="hide-menu">South</span>
                                                        </span>

                                                    }

                                                </li>
                                            </ul>

                                            <ul id="sidebarnav" className="p-t-30">
                                                <li className="sidebar-item" onClick={(e) => this.setState({
                                                    south: false,
                                                    dashboard: false,
                                                    table: true
                                                })}>
                                                    {table ?
                                                        <a style={{ backgroundColor: '#004845', cursor: 'pointer' }} className="sidebar-link has-arrow waves-effect waves-dark" aria-expanded="false">
                                                            <i className="mdi mdi-table"></i>
                                                            <span className="hide-menu">Table </span>
                                                        </a>
                                                        :
                                                        <a style={{ backgroundColor: '#1f262d', cursor: 'pointer' }} className="sidebar-link has-arrow waves-effect waves-dark" aria-expanded="false">
                                                            <i className="mdi mdi-table"></i>
                                                            <span className="hide-menu">Table </span>
                                                        </a>
                                                    }
                                                    <ul aria-expanded="false" className="collapse  first-level">
                                                        <li style={{ cursor: 'pointer' }} className="sidebar-item">
                                                            <span className="sidebar-link" onClick={() => history.push("/customer-table")}>
                                                                <i className="mdi mdi-library-books"></i>
                                                                <span className="hide-menu">Customer Table </span>
                                                            </span>
                                                        </li>
                                                        <li style={{ cursor: 'pointer' }} className="sidebar-item">
                                                            <span className="sidebar-link" onClick={() => history.push("/Dc-table")}>
                                                                <i className="mdi mdi-library-books"></i>
                                                                <span className="hide-menu">DC Table </span>
                                                            </span>
                                                        </li>
                                                    </ul>

                                                </li>


                                            </ul>
                                        </div>

                                    }

                                       

                                        <hr className="sidebar-divider d-none d-md-block" />
                                        <div className="text-center">
                                            <i style={{ fontSize: '28px', padding: '16px', cursor: 'pointer', color:'#afafaf' }} 
                                            className="esri-icon-sign-out" onClick={this.logout} />
                                        </div>


                            </nav>
                        </div>
                    </aside>
                }
   

            </Router>
        )
    }
}
export {Sidebar}