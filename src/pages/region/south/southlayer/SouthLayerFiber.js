import React from 'react'
import { loadModules, setDefaultOptions } from 'esri-loader';
import { queryRelated } from '@esri/arcgis-rest-feature-layer';
import './southlayer.css'
import AttributeQuery from './AttributeQuery';

setDefaultOptions({ version: '4.14' })
export default class SouthLayerFiber extends React.Component {
    state = {
        parcel:[],
        parcelLabel:[],
        id: [],
       
    }
    componentDidMount() {
        let _this = this
        let map = this.props.map
        let view = this.props.view
        
        loadModules(["esri/layers/FeatureLayer"], { css: false })
            .then(([FeatureLayer]) => {
                

           /*      let parcel = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/South_Region/Parcels/FeatureServer/1",
                    title: "Parcels",
                    minScale: 9028,
                    labelsVisible: false

                })
                map.add(parcel)
                this.props.parcelLayer(parcel)

                var click = 0
                view.on("pointer-move", () => {
                    click += 1
                    if (click < 2) {

                        parcel.labelsVisible = this.props.parcelLabel
                    }
                }) */
                

                var relatedTable = {
                    title: "Related Table",
                    id: "related-table",
                    image:
                        "assets/images/table.png"
                };

                let fiber = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/7",
                    title: 'Fiber',
                    minScale: 150000,
                    popupTemplate: {
                        title: "Fiber",
                        actions: [relatedTable],
                        content: [{
                            type: "fields",
                            fieldInfos: [{
                                fieldName: "Capacity",
                                label: "Capacity",
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }, {
                                fieldName: "POP",
                                label: "POP",
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
                                fieldName: "Placement",
                                label: "Placement",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }, {
                                fieldName: "Network",
                                label: "Network",
                            }, {
                                fieldName: ["Length"],
                                label: "Length in Meter",
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }]
                        }]
                    }
                })
                map.add(fiber)
                this.props.fiberlayer(fiber)
                fiber.definitionExpression = this.props.fiberlayerwithExpression.definitionExpression

                // Working for related Table
                view.popup.on("trigger-action", function (event) {

                    if (event.action.id === "related-table") {
                        //expand.expanded = true
                        _this.tableRelate()
                        _this.tableRelate12F()
                        _this.props.tableDisplay('flex')
                       
                        return _this.props.height('61vh', '30vh')
                    }

                });

                view.on("click", function (event) {
                    var screenPoint = {
                        x: event.x,
                        y: event.y
                    };

                    view.hitTest(screenPoint).then(function (response) {

                        if (response.results.length) {
                            var graphic = response.results.filter(function (result) {

                                return result.graphic.layer === fiber;
                            })[0].graphic;

                            _this.setState({
                                id: graphic.attributes.OBJECTID
                            })

                        }

                    });

                });
                
                _this.tableRelate = () => {
                
                    queryRelated({
                        url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/7",
                        objectIds: _this.state.id,
                        relationshipId: 1,
                        returnGeometry: false,
                        outFields: ["Tube", "Core", "PON_Port", "Splitter_Port", "ODF_Port", "FOC_ID", "Splitter_Type", "Splitter_Port_Useable", "Primary_Secondary", "Length", "DC_ODB"]

                    })
                    .then(response => {

                        response.relatedRecordGroups.map(item => {

                            _this.setState({
                                tableRelate: item.relatedRecords
                            })
                            this.props.tableRelatedFiber(this.state.tableRelate)
                            
                        })
                        
                    })
                }
                _this.tableRelate12F = () => {

                    queryRelated({
                        url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/7",
                        objectIds: _this.state.id,
                        relationshipId: 2,
                        returnGeometry: true,
                        outFields: ["Tube", "Core", "PON_Port", "Splitter_Port", "ODF_Port", "FOC_ID", "Splitter_Type", "Splitter_Port_Useable", "Primary_Secondary", "Length", "DC_ODB"]

                    })
                        .then(response => {

                            response.relatedRecordGroups.map(item => {

                                this.props.tableRelatedFiber(item.relatedRecords)

                            })

                        })
                }
            })
    
    }

    render() {
        return null

    }

}

