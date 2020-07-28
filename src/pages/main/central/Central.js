import React from 'react'
import { loadModules, setDefaultOptions } from 'esri-loader';
import { Card, CardHeader, CardBody, Badge, Col } from 'reactstrap';

setDefaultOptions({ version: '4.12' })
export default class Central extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: null,
            retailer: null,
            residential: null,
            corporate: null,
            cir: null
        }
     
    }

    componentDidMount() {

        loadModules(["esri/tasks/support/Query", "esri/tasks/QueryTask"], { css: false })
            .then(([Query, QueryTask]) => {

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

                })

            })

    }

    render() {
        return (

            <Col xs="12" sm="6" md="4">
                <Card>
                    <CardHeader>
                        <span className="south">Central Region</span>
                        {/* <button id="remove" style={{ marginRight: 150, cursor: 'pointer' }}><i className="fas fa-minus-circle"></i></button> */}
                        <div className="card-header-actions">
                            <Badge pill color="success" className="float-right">{this.state.total}</Badge>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="cardbody">
                            <div className="cardbody-key" >Corporate</div>
                            <div className="cardbody-value">{this.state.corporate}</div>
                        </div>

                        <div className="cardbody">
                            <div className="cardbody-key">Retailer</div>
                            <div className="cardbody-value" >{this.state.retailer}</div>
                        </div>

                        <div className="cardbody">
                            <div className="cardbody-key">Residential</div>
                            <div className="cardbody-value">{this.state.residential}</div>
                        </div>

                        <div className="cardbody">
                            <div className="cardbody-key">CIR</div>
                            <div className="cardbody-value">{this.state.cir}</div>
                        </div>

                    </CardBody>
                </Card>
            </Col>


        )


    }

}

