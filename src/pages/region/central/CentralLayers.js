import React from 'react'
import { loadModules } from 'react-arcgis';


export default class CentralLayers extends React.Component {

    componentDidMount() {

        let map = this.props.map;
        //let view = this.props.view;

        loadModules(["esri/layers/FeatureLayer", "esri/layers/GroupLayer"
        ])
            .then(([FeatureLayer, GroupLayer]) => {
                let fiber = new FeatureLayer({
                    url: "http://172.16.152.68:6080/arcgis/rest/services/lahore/MapServer/7",
                    title: 'Fiber',
                    popupTemplate: {
                        title: "Fiber",
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
                            }, {
                                fieldName: "Capacity",
                                label: "Capacity",
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
                                fieldName: "Comments",
                                label: "Comments",
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

                let jointclosure = new FeatureLayer({
                    url: "http://172.16.152.68:6080/arcgis/rest/services/lahore/MapServer/2",
                    title: 'Joint Closure',
                    popupTemplate: {
                        title: "Joint Closure",
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
                                fieldName: "DC",
                                label: "DC",
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
                                fieldName: "Comments",
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
                    url: "http://172.16.152.68:6080/arcgis/rest/services/lahore/MapServer/4",
                    title: 'ODB/DC',
                    popupTemplate: {
                        title: "ODB/DC",
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
                                fieldName: "ID",
                                label: "ID",
                                format: {
                                    digitSeparator: false,
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
                                fieldName: "Comments",
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
                    url: "http://172.16.152.68:6080/arcgis/rest/services/lahore/MapServer/0",
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
                            },{
                                fieldName: "Comments",
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
                    url: "http://172.16.152.68:6080/arcgis/rest/services/lahore/MapServer/1",
                    title: 'HH',
                    popupTemplate: {
                        title: "POP",
                        content: [{
                            type: "fields",
                            fieldInfos: [{
                                fieldName: "Size",
                                label: "Size",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }, {
                                fieldName: "DC",
                                label: "DC",    
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
                            }]
                        }]
                    }

                });
                map.add(HH)


                let fat = new FeatureLayer({
                    url: "http://172.16.152.68:6080/arcgis/rest/services/lahore/MapServer/3",
                    title: "FAT",
                    popupTemplate: {
                        title: "FAT",
                        content: [{
                            type: "fields",
                            fieldInfos: [{
                                fieldName: "ID",
                                label: "ID",
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
                                        digitSeparator: true,
                                        places: 0
                                    }
                                }, {
                                    fieldName: "Comments",
                                    label: "Comments",
                                    format: {
                                        digitSeparator: true,
                                        places: 0
                                    }
                                }]
                        }]
                    }
                })
                map.add(fat)

            });


    }

    render() {
        return null

    }

}

