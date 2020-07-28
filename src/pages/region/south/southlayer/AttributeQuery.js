import React from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import Select from 'react-select';
import SweetAlert from 'sweetalert-react';
//import './attributequery.css'
import './southlayer.css'

setDefaultOptions({ version: '4.14' })
export default class AttributeQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dclayer:[],
            layerDefinitionExpression:[],
            layerDefinitionExpressionFAT: [],
            layerDefinitionExpressionFiber:[],
            fatlayer:[],
            fiberLayer:[],
            showWidget:false,
            loading: true,
            targetLayer:[],
            ODB: [],
            FAT:[],
            Fiber:[],
            uniqueValues:[],
            fiberuniqueValues:[],
            queryPrintFiberPOP:[],
            layerValueFiberPOP:[],
            layerValueFiberNetwork:[],
            queryForPrint:[],
            query:[]

        }
        this.infoDiv = React.createRef()
        this.popupDivdc = React.createRef()
    }

    componentDidMount() {
        let _this = this
        let map = this.props.map;
        let view = this.props.view;
        
        loadModules(["esri/tasks/support/Query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer", 'esri/widgets/Expand', "esri/layers/GraphicsLayer", "esri/geometry/geometryEngine",
            "esri/Graphic", "esri/geometry/support/webMercatorUtils", "esri/layers/GeoJSONLayer",
            "esri/geometry/Point", "esri/geometry/SpatialReference"
        ], { css: false })
            .then(([Query, QueryTask, FeatureLayer, Expand, GraphicsLayer, geometryEngine, Graphic, webMercatorUtils, GeoJSONLayer,
                Point, SpatialReference
            ]) => {

                view.ui.add(
                    [
                        new Expand({
                            view: view,
                            content: this.infoDiv.current,
                            group: "bottom-right",
                            expanded: false,
                            expandIconClass: "fas fa-table"
                        })
                    ],
                    "top-right"
                );
                
                // ***********  Query ***************
            
                let odburl = "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/1"
                let faturl = "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/5"
                let fiberurl = "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/7"

                let ODB = new FeatureLayer({
                    url: odburl,
                    title: 'ODB/DC',
                    minScale:71,
                    listMode: "hide",
                    legendEnabled: false,
                })
                map.add(ODB)

                let FAT = new FeatureLayer({
                    url: faturl,
                    title: 'FAT',
                    minScale: 71,
                    listMode: "hide",
                    legendEnabled: false,
                })

                map.add(FAT)

                let Fiber = new FeatureLayer({
                    url: fiberurl,
                    title: 'Fiber',
                    minScale: 71,
                    listMode: "hide",
                    legendEnabled: false,
                })

                map.add(Fiber)

                _this.setState({
                    ODB: ODB,
                    FAT: FAT,
                    Fiber: Fiber
                })

                var click = 0
                view.on("pointer-move", () => {
                    click += 1
                    if (click < 2) {

                        _this.setState({
                            dclayer: this.props.dclayer,
                            fatlayer: this.props.fatlayer,
                            fiberLayer: this.props.fiberlayer
                        })
                        console.log(this.state.dclayer)
                    }
                })
              
     
            })  

    }

    selectLayer = (e) => {

        this.setState({
            targetLayer: e.target.value
        })
  
        if (e.target.value === "DC_ODB" ) {
            this.setState({ 
                queryForPrint: "SELECT * FROM DC_ODB WHERE POP = ",
                uniqueValues: [],
                loading:true,
                showWidget:true
            })
         
         }
        else if (e.target.value === "FAT") {
            this.setState({ 
                queryForPrint: "SELECT * FROM FAT WHERE DC_ODB = ",
                uniqueValues: [],
                loading: true,
                showWidget:true
                })
         
        }
        else if (e.target.value === "Fiber") {
            this.setState({
                queryForPrint: "SELECT * FROM FIBER WHERE Network = ", 
                queryPrintFiberPOP:"SELECT * FROM FIBER WHERE POP = ",
                uniqueValues: [],
                fiberuniqueValues:[],
                loading:false,
                showWidget:true
            })
            
        }
        else if (e.target.value === "") {
            this.setState({
                showWidget:true
            })
           
        }  

    }
    GetUniqueValue = () => {

        let view = this.props.view
        let { ODB ,FAT, Fiber, targetLayer } = this.state

        if (targetLayer === "DC_ODB") {

            view.when(() => {
                return ODB.when(function () {
                    var query = ODB.createQuery();
                
                    return ODB.queryFeatures(query);
                })

            })
            .then(this.getValues)
            .then(this.getUniqueValues)

            this.getValues = (response) => {
                var features = response.features;
 
                var values = features.map((feature, index) => {
                    return feature.attributes.POP;
                });

                return values;
            }

            this.getUniqueValues = (values) => {
                var uniqueValues = [];

                values.map((item, i) => {
                    if (
                        (uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
                        item !== ""
                    ) {
                        uniqueValues.push(item);
                    }
                    return item
                });

                this.setState({
                    uniqueValues:uniqueValues
                })

                return uniqueValues;
            }

        }

        if (targetLayer === "FAT") {
            view.when(() => {
                return FAT.when(function () {
                    var query = FAT.createQuery();
                    return FAT.queryFeatures(query);
                })

            })
            .then(this.getValues)
            .then(this.getUniqueValues)

            this.getValues = (response) => {
                var features = response.features;
                var values = features.map((feature, index) => {
                    return feature.attributes.DC;
                });

                return values;
            }

            this.getUniqueValues = (values) => {
                var uniqueValues = [];

                values.map((item, i) => {
                    if (
                        (uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
                        item !== ""
                    ) {
                        uniqueValues.push(item);
                    }
                    return item
                });
                this.setState({
                    uniqueValues: uniqueValues
                })

                return uniqueValues;
            }

        }
        if (targetLayer === "Fiber") {
        
            view.when(() => {
             
                return Fiber.when(function () {
                    var query = Fiber.createQuery();
                    return Fiber.queryFeatures(query);
                })

            })
            .then(this.getValues)
            .then(this.getUniqueValues)

            this.getValues = (response) => {
                console.log(response)
                var features = response.features;
               
                var values = features.map((feature, index) => {
                    return feature.attributes.Network;
                });

                return values;
            }

            this.getUniqueValues = (values) => {
                var uniqueValues = [];

                values.map((item, i) => {
                    if (
                        (uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
                        item !== ""
                    ) {
                        uniqueValues.push(item);
                    }
                    return item
                });
                this.setState({
                    fiberuniqueValues: uniqueValues
                })

                return uniqueValues;
            }

            // Select Fiber from POP
             view.when(() => {
                return Fiber.when(function () {
                    var query = Fiber.createQuery();
                    return Fiber.queryFeatures(query);
                })

            })
                .then(this.getValues)
                .then(this.getUniqueValues)

            this.getValues = (response) => {
                var features = response.features;
                var values = features.map((feature, index) => {
                    return feature.attributes.POP;
                });

                return values;
            }

            this.getUniqueValues = (values) => {
                var uniqueValues = [];

                values.map((item, i) => {
                    if (
                        (uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
                        item !== ""
                    ) {
                        uniqueValues.push(item);
                    }
                    return item
                });
            
                this.setState({
                    uniqueValues: uniqueValues
                })

                return uniqueValues;
            } 
        }
      
    }

    layerValue = (e) => {
        let {targetLayer} = this.state

         if (targetLayer === "DC_ODB"){
            this.setState({
                queryForPrint: "SELECT * FROM DC_ODB WHERE POP = " +  e.target.value,
                layerDefinitionExpression: "POP = '" + e.target.value + "'"
            })
            
        }
        else if (targetLayer === "FAT"){
            this.setState({ 
                queryForPrint: "SELECT * FROM FAT WHERE DC_ODB = " + e.target.value,
                layerDefinitionExpressionFAT: "DC = '" + e.target.value + "'"
             })
         
           
        }
        else if (targetLayer === "Fiber") {
            this.setState({ 
                queryForPrint: "SELECT * FROM FIBER WHERE NETWORK = " + e.target.value,
                layerValueFiberNetwork:e.target.value,
                layerDefinitionExpressionFiber: "Network = '" + e.target.value + "'",
            })
           
        } 

    }

    layerValueFiber = (e) =>{ // POP 
        this.setState({
            queryPrintFiberPOP: "SELECT * FROM FIBER WHERE POP = " + e.target.value,
            layerValueFiberPOP:e.target.value,
            layerDefinitionExpressionFiber: "POP = '" + e.target.value + "'",
        })
       
       
    }

    queryClick = () => {
     
        let view = this.props.view
        let { dclayer, layerDefinitionExpression, layerDefinitionExpressionFAT, fatlayer, fiberLayer, layerDefinitionExpressionFiber,
            targetLayer, query, layerValueFiberPOP, layerValueFiberNetwork } = this.state

        dclayer.definitionExpression = layerDefinitionExpression
        this.props.dclayerwithExpression(dclayer)
  
        fatlayer.definitionExpression = layerDefinitionExpressionFAT
        this.props.fatlayerwithExpression(fatlayer)

      /*   fiberLayer.definitionExpression = layerDefinitionExpressionFiber
        this.props.fiberlayerwithExpression(fiberLayer) */
    

        if (targetLayer === "DC_ODB") {
            let queryDC = dclayer.createQuery();
            queryDC.outSpatialReference = { wkid: 4326 }
            queryDC.where = dclayer.definitionExpression
            dclayer.queryFeatures(queryDC).then(results => {
                let features = results.features;
                view.goTo({
                    target: [features[0].geometry],
                    zoom: 14
                });
            })
        }else if(targetLayer === "FAT"){
            let queryFAT = fatlayer.createQuery();
            queryFAT.outSpatialReference = { wkid: 4326 }
            queryFAT.where = fatlayer.definitionExpression
            fatlayer.queryFeatures(queryFAT).then(results => {
                let features = results.features;
                view.goTo({
                    target: [features[0].geometry],
                    zoom: 17
                }); 
            })
        }/* else if(targetLayer === "Fiber"){
            let queryFiber = fiberLayer.createQuery();
            queryFiber.outSpatialReference = { wkid: 4326 }
            queryFiber.where = fiberLayer.definitionExpression
            fiberLayer.queryFeatures(queryFiber).then(results => {
                let features = results.features;
                view.goTo({
                    target: [features[0].geometry],
                    zoom: 13
                });
            })
        } */
    }

    ClearQuery = () => {
        let view=this.props.view
        let { dclayer, fatlayer, fiberLayer } = this.state
        view.ui.remove(this.popupDivdc.current)
        dclayer.definitionExpression = '1=1';
        fatlayer.definitionExpression = '1=1';
        fiberLayer.definitionExpression = '1=1';
        this.props.dclayerwithExpression(dclayer)
        this.props.fatlayerwithExpression(fatlayer)
        this.props.fiberlayerwithExpression(fiberLayer)
        this.setState({
            uniqueValues:[],
            fiberuniqueValues:[],
            queryForPrint:[],
            queryPrintFiberPOP:[],
            layerDefinitionExpression: [],
            layerDefinitionExpressionFAT: [],
            layerDefinitionExpressionFiber: [],
        })
 
    }
    merge = () =>{
        let view = this.props.view
        let { targetLayer, fiberLayer, layerValueFiberNetwork, layerValueFiberPOP } = this.state
     
        fiberLayer.definitionExpression = "POP = '" + layerValueFiberPOP + "' AND Network = '" + layerValueFiberNetwork + "'";
        this.props.fiberlayerwithExpression(fiberLayer)
        if (targetLayer === "Fiber") {
            let queryFiber = fiberLayer.createQuery();
            queryFiber.outSpatialReference = { wkid: 4326 }
            queryFiber.where = fiberLayer.definitionExpression
            fiberLayer.queryFeatures(queryFiber).then(results => {
                let features = results.features;
                view.goTo({
                    target: [features[0].geometry],
                    zoom: 14
                });
            })
        }
      
    }

    nonMerge = () =>{

        let view = this.props.view
        let { fiberLayer, layerDefinitionExpressionFiber,
            targetLayer} = this.state

        fiberLayer.definitionExpression = layerDefinitionExpressionFiber
        this.props.fiberlayerwithExpression(fiberLayer)


        if (targetLayer === "Fiber") {
                let queryFiber = fiberLayer.createQuery();
                queryFiber.outSpatialReference = { wkid: 4326 }
                queryFiber.where = fiberLayer.definitionExpression
                fiberLayer.queryFeatures(queryFiber).then(results => {
                    let features = results.features;
                    view.goTo({
                        target: [features[0].geometry],
                        zoom: 13
                    });
                })
            }
    }

    render() {
        let { uniqueValues, fiberuniqueValues} = this.state
        return (
            <div>
                <div  className="infoDiv" ref={this.infoDiv} title="Query">
                    <span>Select Layer</span>
                    <select className="selectlayer" onChange={(e) => this.selectLayer(e)}>
                        <option value="" className="list-group-item" >Select Layer</option>
                        <option className="list-group-item" value="DC_ODB" >DC/ODB</option>
                        {/* <option className="list-group-item" value="FAT" >FAT</option> */}
                        <option className="list-group-item" value="Fiber" >Fiber</option>
                    </select><br />

                    <div ref={this.popupDivdc} >
                        {
                            this.state.loading ? <div className="FATODB">
                                <span> {this.state.queryForPrint} </span><br />
                                <button className="GetUniqueValue" onClick={this.GetUniqueValue}>Get Unique Value</button> <br />
                          
                           {/*      <Select styles={customStyles}
                                    options={
                                        uniqueValues.map((item, key) => {
                                           
                                            return {
                                                label: item,
                                                value: item
                                            }
                                        })
                                    }
                                    onChange={(e) => this.layerValue(e)}
                                    
                                /><br /> */}
                                 <select className="selectlayer" onChange={(e) => this.layerValue(e)}>
                                    <option value="" className="list-group-item" >Select Value</option>
                                    {
                                        uniqueValues.map((item, key) => {
                                            return <option key={key} className="list-group-item" value={item} >{item}</option>
                                        })
                                    }
                                </select> <br /> 
                                <button className="ClearQuery" onClick={this.queryClick}>Query</button>
           
                            </div>
                                : <div className="fiberDiv">
                                    <h5>Network</h5>
                                    <span>1 = Feeder</span>
                                    <span>2 = Distribution</span>
                                    <span>3 = Drop Cable</span> <br />
                                    <button className="GetUniqueValue" onClick={this.GetUniqueValue}>Get Unique Value</button> <br />
                                    <span>{this.state.queryForPrint}</span>
                                    <br />
                                    
                                    <div className="fiberSelect">
                                    
                                        <select className="selectlayer" onChange={(e) => this.layerValue(e)}>
                                            <option value="" className="list-group-item" >Select Network</option>
                                            {
                                                fiberuniqueValues.map((item, key) => {
                                                    return <option key={key} className="list-group-item" value={item} >{item}</option>
                                                })
                                            }
                                        </select>
                                        <br />
                                        <span>{this.state.queryPrintFiberPOP}</span>
                                        
                                       {/*  <Select styles={customStyles}
                                         options={
                                                uniqueValues.map((item, key) => {
                                                    return {
                                                        label:item,
                                                        value:item
                                                    }
                                                })
                                            }
                                        onChange={(e) => this.layerValueFiber(e)}
                                        />
                                        <br /> */}

                                        <select className="selectlayer" onChange={(e) => this.layerValueFiber(e)}>
                                            <option value="" className="list-group-item" >Select POP</option>
                                            {
                                                uniqueValues.map((item, key) => {
                                                    return <option key={key} className="list-group-item" value={item} >{item}</option>
                                                })
                                            }
                                        </select> <br />
                                    </div>
                                    <div className="fiberButtons">
                                        <button onClick={this.merge} className="mergeButton">Merge Query</button>
                                        <button className="ClearQuery" onClick={this.nonMerge}>Query</button>

                                    </div>

                                </div>
                        }

                    </div>
                    <button className="ClearQuery" onClick={this.ClearQuery}>Clear Query</button>
                </div>                  
                
            </div>
    
        )
    }
}

/* const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor:'black',
        borderBottom: '1px dotted white',
        color: state.isSelected ? 'red' : 'white',
        cursor:'pointer'
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
    }), 
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
} */