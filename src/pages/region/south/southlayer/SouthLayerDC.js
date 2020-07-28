import React from 'react'
import { loadModules, setDefaultOptions } from 'esri-loader';
import { queryRelated } from '@esri/arcgis-rest-feature-layer';
import './southlayer.css'

setDefaultOptions({ version: '4.14' })
export default class SouthLayerDC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: [],
        }

    }
    componentDidMount() {
        let _this = this
        let view = this.props.view
        let map = this.props.map


        loadModules(["esri/layers/FeatureLayer", "esri/geometry/projection", 'esri/widgets/LayerList', 'esri/widgets/Expand'], { css: false })
            .then(([FeatureLayer, projection, LayerList, Expand]) => {

                projection.load()

                let labelClassDC = {
                    // autocasts as new LabelClassFAT()
                    symbol: {
                        type: "text",  // autocasts as new TextSymbol()
                        color: "white",
                        haloColor: "black",
                        haloSize: 2,
                        font: {  // autocast as new Font()
                            family: "Playfair Display",
                            size: 10,
                            weight: "bold"
                        }
                    },
                    labelPlacement: "above-center",
                    labelExpressionInfo: {
                        expression: `$feature.Name + " - " + $feature.ID`
                    }
                }

                var relatedTable = {
                    title: "Related Table",
                    id: "related-tableDC",
                    image:
                        "assets/images/table.png"
                };

                let dc = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/1",
                    title:"ODB/DC",
                    minScale: 150000,
                    labelingInfo: [labelClassDC],
                    labelsVisible: false,
                    refreshInterval: 0.1,
                    popupTemplate: {
                        title: "ODB/DC",
                        actions: [relatedTable],
                        content: [{
                            type: "fields",
                            fieldInfos: [{
                                fieldName: "Name",
                                visible: true,
                                label: "Name",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }, {
                                fieldName: "Splitter",
                                visible: true,
                                label: "Splitter",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }, {
                                fieldName: "ID",
                                visible: true,
                                label: "ID",
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }, {
                                fieldName: "POP",
                                visible: true,
                                label: "POP",
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }, {
                                fieldName: "Placement",
                                visible: true,
                                label: "Placement",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }, {
                                fieldName: "City",
                                visible: true,
                                label: "City",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }, {
                                fieldName: "Date",
                                visible: true,
                                label: "Date",
                                format: {
                                    dateFormat: "day-short-month-year"
                                }

                            }, {
                                fieldName: "Comment",
                                visible: true,
                                label: "Comment",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }]
                        }]
                    }
                })
           
                map.add(dc)
               
                this.props.dclayer(dc)

                dc.definitionExpression = this.props.dclayerwithExpression.definitionExpression
                
                 var click = 0;

                view.on("pointer-move", () => {
                    click += 1
                    if(click < 2 ){
                        
                        dc.labelsVisible = this.props.labelDC
                        
                    }
                })   
               
                // Working for related Table
                view.popup.on("trigger-action", function (event) {

                    if (event.action.id === "related-tableDC") {
                        //expand.expanded = true
                        _this.tableRelate()
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

                                return result.graphic.layer === dc;
                            })[0].graphic;

                            _this.setState({
                                id: graphic.attributes.OBJECTID
                            })

                        }

                    });

                });

                _this.tableRelate = () => {
                    queryRelated({
                        url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/1",
                        objectIds: _this.state.id,
                        relationshipId: 1,
                        returnGeometry: true,
                        outFields: ["Name", "Splitter", "DC", "POP"]

                    })
                        .then(response => {

                            response.relatedRecordGroups.map(item => {

                                this.props.tableRelatedDC(item.relatedRecords)
                            })

                        })
                  
                }
            })
    }

    render() {
        return null

    }

}

