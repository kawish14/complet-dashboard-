import React from 'react'
import Role from './role';
import { Mainpage } from './pages/main';
import { SouthRegion } from './pages/region/south';
import { CustomerTable, DCTable } from './pages/table'

let routes = [

    {
        component: Mainpage,
        path: "/",
        exact: true,
        head: () => <div className="page-breadcrumb" style={styles.crumb}>Dashboard</div>

    },
    {
        component: SouthRegion,
        path: "/south",
        exact: false,
        roles: [Role.Admin, Role.SouthDEV],
        head: () => <div className="page-breadcrumb" style={styles.crumb} >Region
                <i style={{ fontSize: '13px' }} className="esri-icon-right" />South Region</div>
    },
    {
        component: CustomerTable,
        path: "/customer-table",
        exact: false,
        roles: [Role.Admin, Role.SouthDEV],
        head: () => <div className="page-breadcrumb" style={styles.crumb} >Table
                <i style={{ fontSize: '13px' }} className="esri-icon-right" />Customer Table</div>
    },
    {
        component: DCTable,
        path: "/Dc-table",
        exact: false,
        roles: [Role.Admin, Role.SouthDEV],
        head: () => <div className="page-breadcrumb" style={styles.crumb} >Table
                <i style={{ fontSize: '13px' }} className="esri-icon-right" />DC/ODB Table</div>
    }

]

let rgb = [110, 110, 110]

let styles = {
    crumb: {
        color: `rgb(${rgb})`,
        fontSize: '14px'
    }
}

export default routes