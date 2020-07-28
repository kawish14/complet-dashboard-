import React from 'react'
import { loadModules } from 'esri-loader';
import {Card, CardHeader, CardBody, Badge, Col} from 'reactstrap';


export default class South extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            total: null,
            retailer: null,
            residential: null,
            corporate: null,
            cir: null
        }
    
    }

    componentDidMount(){

        loadModules(["esri/tasks/support/Query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer", "esri/geometry/geometryEngine"], { css: false })
            .then(([Query, QueryTask, FeatureLayer, geometryEngine]) => {
            //const lineLink = "http://localhost:6080/arcgis/rest/services/lahore/MapServer/6"

            const link = "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/6"

            const queryTask = new QueryTask({
                url: link
            });

            // Total customers
            let querytotal = new Query({
                returnGeometry: true,
                outFields: ["*"],
                where: "1=1"
            })
            queryTask.executeForCount(querytotal).then( (results) =>{
                
                this.setState({
                    total:results
                })
             
            })
            //Retailer
            let queryRetailer = new Query({
                returnGeometry: true,
                outFields: ["*"],
                where: "Type = 'Retailer'"
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
                where: "Type = 'Residential'"
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
                where: "Type = 'Corporate'"
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
                where: "Type = 'CIR'"
            })
            queryTask.executeForCount(queryCIR).then((results) => {

                this.setState({
                    cir: results
                })

            })
            
        })
       
    }
    northChild = () => {
        console.log(this.state.total)

    }
    render() {
        return (
            
                <Col xs="12" sm="6" md="4">
                    <Card>
                        <CardHeader>
                            <span className="south" >South Region</span>
                           {/*  <button id="remove" style={{ marginRight: 150, cursor: 'pointer' }}><i className="fas fa-minus-circle"></i></button> */}
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

