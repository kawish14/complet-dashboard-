import React from 'react'
import { loadModules, setDefaultOptions } from 'esri-loader';
import { queryRelated } from '@esri/arcgis-rest-feature-layer';
import './southlayer.css'

setDefaultOptions({ version: '4.14' })
export default class SouthLayerFAT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: [],
            tableRelatefat: [],
            FATLabel:[]
        }

    }

    componentDidMount() {
        let _this = this
        let view = this.props.view
        let map = this.props.map

        loadModules(["esri/layers/FeatureLayer", "esri/geometry/projection"], { css: false })
            .then(([FeatureLayer, projection]) => {
                let { labelsVisible} = this.state
                projection.load()

                let labelClassFAT = {
                    // autocasts as new LabelClassFAT()
                    symbol: {
                        type: "text",  // autocasts as new TextSymbol()
                        color: "black",
                        haloColor: "white",
                        haloSize: 2,
                        font: {  // autocast as new Font()
                            family: "Playfair Display",
                            size: 8,
                            weight: "bold"
                        }
                    },
                    labelPlacement: "above-center",
                    labelExpressionInfo: {
                        expression: "$feature.Name"
                    }
                }

                var relatedTable = {
                    title: "Related Table",
                    id: "related-table-FAT",
                    image:
                        "assets/images/table.png"
                };


                let fat = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/5",
                    title: "FAT",
                    minScale: 20000,
                    labelingInfo: [labelClassFAT],
                    labelsVisible:false,
                    refreshInterval: 0.1,
                    popupTemplate: {
                        title: "FAT",
                        actions: [relatedTable],
                        content: [{
                            type: "fields",
                            fieldInfos: [{
                                fieldName: "Name",
                                label: "Name",
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }, {
                                    fieldName: "DC",
                                    label: "DC",
                                    format: {
                                        digitSeparator: false,
                                        places: 0
                                    }
                            },
                            {
                                fieldName: "Splitter",
                                label: "Splitter",
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
                            }]
                        }]
                    }
                })
                map.add(fat)
              
                 this.props.fatlayer(fat);
                
                fat.definitionExpression = this.props.fatlayerwithExpression.definitionExpression

                var clicked = 0; 

                view.on("pointer-move", () => {
                    clicked += 1
                    if (clicked < 2) {
                      
                        fat.labelsVisible = this.props.labelFAT
                    }
                }) 


                // Working for related Table
          /*       view.popup.on("trigger-action", function (event) {

                    if (event.action.id === "related-table-FAT") {
                        //expand.expanded = true
                        _this.tableRelatefat()

                        return _this.props.height('60vh', '30vh')
                    }

                }); */

         /*        view.on("click", function (event) {
                    var screenPoint = {
                        x: event.x,
                        y: event.y
                    };

                    view.hitTest(screenPoint).then(function (response) {

                        if (response.results.length) {
                            var graphic = response.results.filter(function (result) {

                                return result.graphic.layer === fat;
                            })[0].graphic;

                            _this.setState({
                                id: graphic.attributes.OBJECTID
                            })

                        }

                    });

                }); */

          /*       _this.tableRelatefat = () => {
                    queryRelated({
                        url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/4",
                        objectIds: _this.state.id,
                        relationshipId: 1,
                        returnGeometry: true,
                        outFields: ["Name", "ID", "FAT", "DC", "POP", "Type", "Comments"]

                    })
                        .then(response => {

                            response.relatedRecordGroups.map(item => {

                                _this.setState({
                                    tableRelatefat: item.relatedRecords
                                })

                                this.props.tableRelatedFAT(this.state.tableRelatefat)
                            })

                        })

                } */
            })
    }

    render() {
        return null

    }

}

