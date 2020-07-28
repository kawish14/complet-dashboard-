import React from 'react'
import { loadModules, setDefaultOptions } from 'esri-loader';
import './southlayer.css'
import SouthLayerDC from './SouthLayerDC';
import SouthLayerFAT from './SouthLayerFAT';
import SouthLayerFiber from './SouthLayerFiber';
import AttributeQuery from './AttributeQuery';

setDefaultOptions({ version: '4.14' })
export default class SouthLayers extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableRelateDC:[],
            tableRelateFAT: [],
            tableRelateFiber: [],
            labelsVisible:false,
            freeCore:[],
            showDC:false,
            dclayer:[],
            fatlayer:[],
            fiberLayer:[],
            parcelLayer:[],
            colors:[],
            display:'none'
    
        }
    }
    componentDidMount(){
        let _this = this
        let view = this.props.view
        let map = this.props.map


        loadModules(["esri/layers/FeatureLayer", "esri/layers/MapImageLayer", 'esri/widgets/Expand',
            'esri/widgets/LayerList',"esri/geometry/projection"],{ css: false })
            .then(([FeatureLayer, MapImageLayer, Expand, LayerList, projection]) =>{
              
            let { fatlayer, parcelLayer, dclayer} = _this.state
        
            projection.load()
              
            let basemap = new MapImageLayer({
                url: "http://localhost:6080/arcgis/rest/services/South_Region/South_Region_for_server/MapServer",
                listMode: "hide",
                legendEnabled: false,
                sublayers: [
                    {
                        id: 1,
                        visible: true
                    }
                ]
            });
            map.add(basemap);

             let labelClassRoad = {
                    // autocasts as new LabelClassFAT()
                    symbol: {
                        type: "text",  // autocasts as new TextSymbol()
                        color: "black",
                        haloColor: "white",
                        haloSize: 1,
                        font: {  // autocast as new Font()
                            family: "Arial",
                            size: 8,
                            weight: "bold"
                        }
                    },
                    labelPlacement: "above-center",
                    labelExpressionInfo: {
                        expression: "$feature.ROAD_NAME"
                    }
                }

            let road = new FeatureLayer({
                url:"http://localhost:6080/arcgis/rest/services/South_Region/Parcels/FeatureServer/0",
                title: "Roads",
                minScale: 18056,
                labelingInfo: [labelClassRoad],
                labelsVisible: false,
                legendEnabled: false,
            })
            map.add(road)

            let pop = new FeatureLayer({
                url:"http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/0",
                title: 'POP',
                minScale: 150000,
                popupTemplate: {
                    title: "POP",
                    content: [{
                        type: "fields",
                        fieldInfos: [{
                            fieldName: "Name",
                            label: "Name",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: "ID",
                            label: "ID",
                            format: {
                                digitSeparator: false,
                                places: 0
                            }
                        }, {
                            fieldName: "City",
                            label: "City",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: "Comment",
                            label: "Comment",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }]
                    }]
                }
            })
            map.add(pop)

            let joint = new FeatureLayer({
                url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/2",
                title: 'Joint Closure',
                minScale: 20000,
                popupTemplate: {
                    title: "Joint Closure",
                    content: [{
                        type: "fields",
                        fieldInfos: [{
                            fieldName: "OBJECTID",
                            label: "OBJECTID",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: "Joint_Type",
                            label: "Joint_Type",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: "City",
                            label: "City",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: "Network",
                            label: "Network",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: "Placement",
                            label: "Placement",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: "Comment",
                            label: "Comment",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }]
                    }]
                }
            })
            map.add(joint)

            let handholeAsBuild = new FeatureLayer({
                url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/3",
                title: 'HH AsBuild',
                minScale: 20000,
                popupTemplate: {
                    title: "POP",
                    content: [{
                        type: "fields",
                        fieldInfos: [{
                            fieldName: "ID",
                            label: "ID",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: "DC_ODB",
                            label: "DC/ODB",
                            format: {
                                digitSeparator: false,
                                places: 0
                            }
                        }, {
                            fieldName: "Attachment",
                            label: "Attachment",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: "Attachment_Cabel",
                            label: "Attachment Cabel",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                                fieldName: "Joint_Eclosure",
                                label: "Joint Eclosure",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        }, {
                                fieldName: "Joint_Type",
                                label: "Joint_Type",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        }, {
                                fieldName: "Joint_Cable",
                                label: "Joint Cable",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        }, {
                                fieldName: "No_of_Joint",
                                label: "No of Joint",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        }, {
                                fieldName: "No_of_Cable",
                                label: "No of Cable",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        }, {
                                fieldName: "Core_Cable",
                                label: "Core Cable",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        }, {
                                fieldName: "Loop",
                                label: "Loop",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        }, {
                                fieldName: "Size",
                                label: "Size",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        },{
                                fieldName: "Network",
                                label: "Network",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        }, {
                                fieldName: "Remarks",
                                label: "Remarks",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                        }]
                    }]
                }
            })
            map.add(handholeAsBuild)


            let handhole = new FeatureLayer({
                url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/4",
                title: 'HH',
                minScale: 20000
            })
            map.add(handhole)

             let layerlist = new Expand({
                    content: new LayerList({
                        view: view,
                        style: "classic",
                        statusIndicatorsVisible: false,
                        listItemCreatedFunction: function (event) {
                            let item = event.item
                     
                            if (item.title === "FAT") {

                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label FAT",
                                            className: "esri-icon-labels",
                                            id: "label-FAT"
                                        }
                                    ]
                                ]
                            }
                            if (item.title === "ODB/DC") {
                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label ODB-DC",
                                            className: "esri-icon-labels",
                                            id: "label-ODB"
                                        }
                                    ]
                                ]
                            }
                            if (item.title === "Parcels") {
                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label Parcels",
                                            className: "esri-icon-labels",
                                            id: "label-parcels"
                                        }
                                    ]
                                ]
                            }
                            if (item.title === "Roads") {
                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label Roads",
                                            className: "esri-icon-labels",
                                            id: "label-roads"
                                        }
                                    ]
                                ]
                            }

                        }
                    }),
                    view: view,
                    group: "bottom-right",
                    expanded: false,
                })


            view.ui.add(layerlist, 'top-right')      

            layerlist.content.on("trigger-action", function (event) {
                
                var id = event.action.id;

                if (id === "label-ODB") {
                
                    if (dclayer.labelsVisible === false) {
                       
                        dclayer.labelsVisible = true
 
                    }
                    else {
                        
                        dclayer.labelsVisible = false
                    }
                }

                if (id === "label-FAT") {
                    if (fatlayer.labelsVisible === false) {

                        fatlayer.labelsVisible = true
                    }
                    else {

                        fatlayer.labelsVisible = false
                    }
        
                }  

                if (id === "label-parcels") {
                    if (parcelLayer.labelsVisible === false) {

                        parcelLayer.labelsVisible = true
                    }
                    else {

                        parcelLayer.labelsVisible = false
                    }
                }
                
                if (id === "label-roads") {
                    if (road.labelsVisible === false) {
                        road.labelsVisible = true
                    }
                    else {
                        road.labelsVisible = false
                    }
                }
            })

        })

    }
    cancelTable = () => {
        this.props.height('91vh', '0vh')
        this.props.view.graphics.removeAll()
        this.setState({
            tableRelateDC: [],
            tableRelateFAT: [],
            tableRelateFiber: [],
            display:'none'
        })
       
    }

    tableRelatedDC = (dcRelate) =>{
        this.setState({
            tableRelateDC: dcRelate,
            showDC:true
        })
    }

    tableRelatedFAT = (fatRelate) => {
        this.setState({
            tableRelateFAT: fatRelate,
            showDC:false
        })
    }
    tableRelatedFiber = (tableRelatedFiber) =>{
        this.setState({
            tableRelateFiber: tableRelatedFiber,
            tableRelateDC: [],
            tableRelateFAT: [],
            showDC: false
        })
    }
    dclayer = (dclayer) =>{
        this.setState({ dclayer: dclayer})
    }

    fatlayer = (fatlayer) => {
        this.setState({ fatlayer: fatlayer})
    }

    fiberLayer = (fiberLayer) => {
        this.setState({
            fiberLayer: fiberLayer
        })
    }
    
    parcelLayer = (parcelLayer) =>{
        this.setState({
            parcelLayer: parcelLayer
        })
    }

    dclayerAttribute = (dclayerAttribute) => {
        this.setState({
            dclayer:dclayerAttribute
        })
    }
    fatlayerAttribute = (fatlayerAttribute) => {
        this.setState({
            fatlayer: fatlayerAttribute
        })
    }
    fiberlayerAttribute = (fiberlayerAttribute) => {
        this.setState({
            fiberLayer: fiberlayerAttribute
        })
    }
    tableDisplay = (display) => {
        this.setState({
            display: display
        })
    }

 

    render() {
        const { showDC, dclayer, fatlayer, fiberLayer, parcelLayer, display} = this.state    
        return (
            <div>
                <AttributeQuery 
                    fiberlayerwithExpression={this.fiberlayerAttribute} 
                    fatlayerwithExpression={this.fatlayerAttribute} 
                    fiberlayer={fiberLayer} 
                    fatlayer={fatlayer} 
                    dclayerwithExpression={this.dclayerAttribute} 
                    dclayer={dclayer} 
                    map={this.props.map} 
                    view={this.props.view} 
                    height={this.props.height} />
                <SouthLayerFiber
                    tableRelatedFiber={this.tableRelatedFiber}
                    fiberlayerwithExpression={fiberLayer} 
                    fiberlayer={this.fiberLayer}
                    parcelLayer={this.parcelLayer}
                    parcelLabel={parcelLayer.labelsVisible}
                    tableDisplay={this.tableDisplay}
                    map={this.props.map}
                    view={this.props.view}
                    height={this.props.height}
                  />           
                <SouthLayerDC 
                    dclayerwithExpression={dclayer}
                    dclayer={this.dclayer}
                    labelDC={dclayer.labelsVisible} 
                    tableRelatedDC={this.tableRelatedDC}
                    tableDisplay={this.tableDisplay}
                    map={this.props.map}
                    view={this.props.view}
                    height={this.props.height}
                 />
                <SouthLayerFAT 
                    fatlayerwithExpression={fatlayer} 
                    fatlayer={this.fatlayer} 
                    labelFAT={fatlayer.labelsVisible} 
                    tableRelatedFAT={this.tableRelatedFAT} 
                    map={this.props.map} view={this.props.view} 
                    height={this.props.height} /> 
               

                {
                    showDC ? <div className="tableResponsive" style={{display:display}}>
                        <table id="relateTableDC" className="table table-striped table-bordered" cellspacing="0" cellpadding="0">
                            <thead className="thead">
                                <tr>
                                    <th><strong>Name</strong></th>
                                    <th><strong>Splitter</strong></th>
                                    <th><strong>DC</strong></th>
                                    <th><strong>POP</strong></th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    this.state.tableRelateDC.map((item, index) => {
                                        return (
                                            <tr key={index} onClick={() => {
                                                let view = this.props.view
                                                loadModules(["esri/Graphic", "esri/geometry/projection",
                                                    "esri/geometry/SpatialReference"], { css: false }).then(([Graphic, projection, SpatialReference]) => {
                                                        view.when(() => {
                                                            var textSymbol = {  
                                                                type: "text",  // autocasts as new TextSymbol()
                                                                color: "white",
                                                                haloColor: "black",
                                                                haloSize: 2,
                                                                text: item.attributes.Name,
                                                                xoffset: 3,
                                                                yoffset: 3,
                                                                font: {  // autocasts as new Font()
                                                                    size: 8,
                                                                    family: "sans-serif",
                                                                    weight: "bold"
                                                                }
                                                            }

                                                            var point = {
                                                                type: "point",  // autocasts as new Point()
                                                                x: item.geometry.x,
                                                                y: item.geometry.y,
                                                                spatialReference: {
                                                                    wkid: 32642
                                                                }
                                                            }

                                                            let projectedPoint = projection.project(point, view.spatialReference);

                                                            let g = new Graphic({
                                                                geometry: projectedPoint,
                                                                attributes: item.attributes,
                                                                symbol: {
                                                                    type: "simple-marker",
                                                                    size: 7,
                                                                    color: [227, 241, 18],
                                                                    outline: null
                                                                },

                                                            })
                                                            console.log(point)
                                                            let graphicLabel = new Graphic({
                                                                geometry: point,
                                                                attributes: item.attributes,
                                                                symbol: textSymbol,

                                                            })

                                                            view.goTo({
                                                                target: g,
                                                                zoom: 18
                                                            });

                                                            view.graphics.add(g)
                                                            view.graphics.add(graphicLabel)
                                                        })
                                                    })

                                            }}>
                                                <td>{item.attributes.Name}</td>
                                                <td>{item.attributes.Splitter}</td>
                                                <td>{item.attributes.DC}</td>
                                                <td>{item.attributes.POP}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                            <tfoot className="tfoot">
                                <tr>
                                    <th className="relateClose"><strong>Records: {this.state.tableRelateDC.length}</strong></th>
                                    <th><strong></strong></th>
                                    <th><strong></strong></th>
                                    <th className="closeRelate" onClick={this.cancelTable}><img src="https://img.icons8.com/color/48/000000/delete-sign.png" style={{ height: 25 }} /></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div> 
                    :
                     <div className="tableResponsive" style={{display:display}}>
                            <table id="relateTableFAT" className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th><strong>Tube</strong></th>
                                        <th><strong>Core</strong></th>
                                        <th><strong>PON Port</strong></th>
                                        <th> <strong>DC/ODB</strong> </th>
                                        <th><strong>Splitter Port</strong></th>
                                        <th><strong>ODF Port</strong></th>
                                        <th><strong>FOC ID</strong></th>
                                        <th><strong>Splitter Type</strong></th>
                                        <th> <strong>Splitter Port Useable</strong></th>
                                        <th> <strong>Primary/Secondary</strong></th>
                                        <th> <strong>Length</strong> </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tableRelateFiber.map((item, index) => {
                                                            
                                            return (
                                                <tr key={index}  onClick={() => {
                                                    let view = this.props.view
                                                    loadModules(["esri/Graphic", "esri/geometry/projection",
                                                        "esri/geometry/SpatialReference"], { css: false }).then(([Graphic, projection, SpatialReference]) => {
                                                            view.when(() => {
                                                                var textSymbol = {
                                                                    type: "text",  // autocasts as new TextSymbol()
                                                                    color: "white",
                                                                    haloColor: "black",
                                                                    haloSize: 2,
                                                                    text: item.attributes.Name,
                                                                    xoffset: 3,
                                                                    yoffset: 3,
                                                                    font: {  // autocasts as new Font()
                                                                        size: 8,
                                                                        family: "sans-serif",
                                                                        weight: "bold"
                                                                    }
                                                                }

                                                                var point = {
                                                                    type: "point",  // autocasts as new Point()
                                                                    x: item.geometry.x,
                                                                    y: item.geometry.y,
                                                                    spatialReference: {
                                                                        wkid: 32642
                                                                    }
                                                                }

                                                                let projectedPoint = projection.project(point, view.spatialReference);

                                                                let g = new Graphic({
                                                                    geometry: projectedPoint,
                                                                    attributes: item.attributes,
                                                                    symbol: {
                                                                        type: "simple-marker",
                                                                        size: 7,
                                                                        color: [227, 241, 18],
                                                                        outline: null
                                                                    },

                                                                })

                                                                let graphicLabel = new Graphic({
                                                                    geometry: point,
                                                                    attributes: item.attributes,
                                                                    symbol: textSymbol,

                                                                })

                                                                view.goTo({
                                                                    target: g,
                                                                    zoom: 18
                                                                });

                                                                view.graphics.add(g)
                                                                view.graphics.add(graphicLabel)
                                                            })
                                                        })

                                                }} >
                                                    <td>{item.attributes.Tube}</td>
                                                    <td>{item.attributes.Core}</td>
                                                    <td>{item.attributes.PON_Port}</td>
                                                    <td>{item.attributes.DC_ODB}</td>
                                                    <td>{item.attributes.Splitter_Port}</td>
                                                    <td>{item.attributes.ODF_Port}</td>
                                                    <td>{item.attributes.FOC_ID}</td>
                                                    <td>{item.attributes.Splitter_Type}</td>
                                                    <td>{item.attributes.Splitter_Port_Useable}</td>
                                                    <td>{item.attributes.Primary_Secondary}</td>
                                                    <td>{item.attributes.Length}</td>
                                                    
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                                <tfoot className="tfoot">
                                    <tr>
                                        <th className="relateClose"><strong>Cable: {this.state.tableRelateFiber.length}F </strong></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>

                                        <th className="closeRelate" onClick={this.cancelTable}><img src="https://img.icons8.com/color/48/000000/delete-sign.png" style={{ height: 25 }} /></th>
                                    </tr>
                                </tfoot>
                                
                            </table>

                        </div>
                }
  
            </div>
        )

    }

}

