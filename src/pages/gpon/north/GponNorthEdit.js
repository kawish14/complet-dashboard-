import React from 'react'
import { loadModules } from 'react-arcgis';


export default class GponNorthEdit extends React.Component {

    componentDidMount() {

        let map = this.props.map;
        let view = this.props.view

        loadModules(["esri/layers/FeatureLayer", "esri/widgets/Editor"
        ])
            .then(([FeatureLayer, Editor]) => {

                // DHA
                let jointclosure = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/2",
                    title: 'Joint Closure',

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

                });
                map.add(jointclosure)

                let ODB = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/1",
                    title: 'ODB/DC',
                    //definitionExpression: "ODB_ID= '2100102'",

                    popupTemplate: {
                        title: "ODB/DC",
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
                                fieldName: "Splitter",
                                label: "Splitter",
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
                                fieldName: "POP",
                                label: "POP",
                                format: {
                                    digitSeparator: false,
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
                map.add(ODB)

                let pop = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/0",
                    title: 'POP',

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

                let HH = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/3",
                    title: 'HH'

                });
                map.add(HH)

                let fat = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/4",
                    title: "FAT",
                    popupTemplate: {
                        title: "FAT",
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
                                    digitSeparator: true,
                                    places: 0
                                }
                            }]
                        }]
                    }
                })
                map.add(fat)

                let fiber = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/6",
                    title: 'Fiber',

                    popupTemplate: {
                        title: "Fiber",
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
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }, {
                                fieldName: "Comment",
                                label: "Comment",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }, {
                                fieldName: "Shape_Length",
                                label: "Length",
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }]
                        }]
                    }

                })
                map.add(fiber)

                view.when(function () {
                    view.popup.autoOpenEnabled = true; //disable popups

                    // Create the Editor
                    let editor = new Editor({
                        view: view,
                        allowedWorkflows: ["update", "create"], // allows only updates and no add
                        enabled: false, // default is true, set to false to disable editing functionality
                        addEnabled: false, // default is true, set to false to disable the ability to add a new feature
                        updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
                        deleteEnabled: false
                    });

                    // Add widget to top-right of the view
                    view.ui.add(editor, "top-right");
                });

            });


    }

    render() {
        return null

    }

}

