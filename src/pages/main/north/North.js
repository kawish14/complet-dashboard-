import React from 'react'
import { loadModules  } from 'esri-loader';
import { Card, CardHeader, CardBody, Badge, Col } from 'reactstrap';


export default class North extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: null,
            retailer: null,
            residential: null,
            corporate: null,
            cir: null,
            View:null
        }
   
    }

    componentDidMount() {
        let _this = this
        loadModules([ "esri/tasks/support/Query", "esri/tasks/QueryTask", 
            "esri/layers/FeatureLayer", "esri/geometry/geometryEngine"], { css: false })
            .then(([Query, QueryTask, FeatureLayer, geometryEngine]) => {

                //const lineLink = "http://localhost:6080/arcgis/rest/services/lahore/MapServer/6"

                const link = "http://localhost:6080/arcgis/rest/services/lahore/MapServer/5"

                const queryTask = new QueryTask({
                    url: link
                });

                // Total customers
                let querytotal = new Query({
                    returnGeometry: true,
                    outFields: ["*"],
                    where: "1=1"
                })
                queryTask.executeForCount(querytotal).then((results) => {

                    this.setState({
                        total: results
                    })
                    this.props.callbackFromParent(this.state.total) 
                })
                //Retailer
                let queryRetailer = new Query({
                    returnGeometry: true,
                    outFields: ["*"],
                    where: "Customer = 'Retailer'"
                })
                queryTask.executeForCount(queryRetailer).then((results) => {

                    this.setState({
                        retailer: results
                    })
                    
                    this.props.retailer(this.state.retailer)
                })
                // Residential
                let queryResidential = new Query({
                    returnGeometry: true,
                    outFields: ["*"],
                    where: "Customer = 'Residential'"
                })
                queryTask.executeForCount(queryResidential).then((results) => {

                    this.setState({
                        residential: results
                    })
                    this.props.residential(this.state.residential)
                })
                // Corporate
                let queryCorporate = new Query({
                    returnGeometry: true,
                    outFields: ["*"],
                    where: "Customer = 'Corporate'"
                })
                queryTask.executeForCount(queryCorporate).then((results) => {

                    this.setState({
                        corporate: results
                    })
                    this.props.corporate(this.state.corporate)
                })

                // CIR
                let queryCIR = new Query({
                    returnGeometry: true,
                    outFields: ["*"],
                    where: "Customer = 'CIR'"
                })
                queryTask.executeForCount(queryCIR).then((results) => {

                    this.setState({
                        cir: results
                    })
                    this.props.cir(this.state.cir)
                })
            })
   
    }


    render() {
        return null

    }

}

