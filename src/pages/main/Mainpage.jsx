import React from 'react';
import { Card, CardHeader, CardBody, Badge, Col, Row, } from 'reactstrap';
import { Map, loadModules } from 'react-arcgis';
import './mainpage.css';
import Axios from 'axios';
import South from './south/South';
import Central from './central/Central'
import Chart from 'react-google-charts';
import North from './north/North';

 class Mainpage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count:[],
            viewProperties: {
                center: [68.589073, 26.092168],
                zoom: 5,
                /*  popup: {
                     dockEnabled: true,
                     dockOptions: {
                        
                         buttonEnabled: false,
                     
                         breakpoint: false,
                         position: "bottom-left"
                     }
                 }, */
                ui: {
                    components: ["zoom", "compass", "attribution"]
                }

            },
            northtotal: null,
            northRetailer: null,
            northCorporate:null,
            northResidential:null,
            northCir:null
          
        }
        this.myCallback = this.myCallback
        this.retailer = this.retailer
        this.corporate = this.corporate
        this.residential = this.residential
        this.cir = this.cir
       
    }

    async componentDidMount() {
        let _this = this
        loadModules(["esri/tasks/support/Query", "esri/tasks/QueryTask"])
            .then(([Query, QueryTask]) => {
                let link = "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/5"

                let queryTask = new QueryTask({
                    url: link
                });

                let featuremap = new Query({
                    returnGeometry: true,
                    outFields: ["*"],
                    where: "1=1"
                })

                queryTask.executeForCount(featuremap).then((results) => {
                    //console.log(results)

                    let data = [
                        ['Task', 'Active customers'],
                        ['South', results],
                        ['central', 350],
                        ['North', 825]
                        
                    ]
                    _this.setState({
                        count: data
                    })

                });
            })
            
    }

    myCallback = (datafromChild) => {

        this.setState({ northtotal: datafromChild });
       // console.log(this.state.northtotal)
       
    }
    retailer =(ret) => {
        this.setState({ northRetailer: ret });
        
    }

    corporate = (ret) => {
        this.setState({ northCorporate: ret });

    }
    
    residential = (ret) => {
        this.setState({ northResidential: ret });

    }

    cir = (ret) => {
        this.setState({ northCir: ret });

    }


    render(){
        return(
            <div className="page-wrapper">

                <div className="container-fluid">
                    
                    <Row>
                        <South />
                        <Central />
                        <Col xs="12" sm="6" md="4">
                            <Card>
                                <CardHeader>
                                    North Region
                                    <div className="card-header-actions">
                                        <Badge pill color="success" className="float-right">{this.state.northtotal}</Badge>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="cardbody">
                                        <div className="cardbody-key">Corporate</div>
                                        <div className="cardbody-value" id="centralcor">{this.state.northCorporate}</div>
                                    </div>

                                    <div className="cardbody">
                                        <div className="cardbody-key">Retailer</div>
                                        <div className="cardbody-value" id="centralret">{this.state.northRetailer}</div>
                                    </div>

                                    <div className="cardbody">
                                        <div className="cardbody-key">Residential</div>
                                        <div className="cardbody-value" id="centralres">{this.state.northResidential}</div>
                                    </div>

                                    <div className="cardbody">
                                        <div className="cardbody-key">CIR</div>
                                        <div className="cardbody-value" id="centralcir">{this.state.cir}</div>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    
                    <Row>

                        <Col xs="12" sm="6" md="8">
                            <Map
                                className="scene__container"
                                style={{ height: '57vh', display: 'flex', flex: 1 }}
                                mapProperties={{ basemap: 'streets-night-vector' }}
                                viewProperties={this.state.viewProperties}

                            >
                                <North callbackFromParent={this.myCallback} retailer={this.retailer} corporate={this.corporate}
                                    residential={this.residential} cir={this.northCir}
                                />
                              
                            </Map>
                        </Col> 

                        <Col xs="12" sm="6" md="4" >
                           {/*  <Card style={{ height:'10vh'}}>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="bg-dark p-10 text-white text-center">
                                            <i class="fa fa-user"></i>
                                            <h5 class="m-b-0 m-t-5">2540</h5>
                                            <small class="font-light">Total Customers</small>
                                        </div>
                                    </div>

                                    <div class="col-6">
                                        <div class="bg-dark p-10 text-white text-center">
                                            <i class="fa fa-user-check"></i>
                                            <h5 class="m-b-0 m-t-5">120</h5>
                                            <small class="font-light">Active Customers</small>
                                        </div>
                                    </div>
                                </div>
                               
                            </Card>  */}               
                           
                            <Chart
                                width={'350px'}
                                height={'300px'}
                                chartType="ScatterChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.count}
                                options={{
                                    title: 'Active Customers',
                                    hartArea: {
                                        width: '90%'
                                    },
                                    hAxis: { title: 'Region', minValue: 0, maxValue: 15 },
                                    vAxis: { title: 'Count', minValue: 0, maxValue: 15 },
                                    legend: 'none',
                                    animation: {
                                        startup: true,
                                        easing: 'linear',
                                        duration: 2000,
                                    },
                                    enableInteractivity: false,
                                }}
                                chartEvents={[
                                    {
                                        eventName: 'animationfinish',
                                        callback: () => {
                                            console.log('Animation Finished')
                                        },
                                    },
                                ]}
                                rootProps={{ 'data-testid': '1' }}
                            /> 
                        </Col>
    
                    </Row>
                </div>
              


            </div>

        )
    }
}

export { Mainpage}