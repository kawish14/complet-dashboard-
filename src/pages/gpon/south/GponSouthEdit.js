import React from 'react'
import { loadModules } from 'react-arcgis';


export default class GponSouthEdit extends React.Component {

    componentDidMount() {

        let map = this.props.map;
        let view = this.props.view


        loadModules(["esri/widgets/Search", "esri/widgets/Search/SearchViewModel",'esri/widgets/Expand', "esri/layers/FeatureLayer", "esri/widgets/Editor", "esri/widgets/LayerList",
            "esri/widgets/Legend", "esri/widgets/CoordinateConversion",
        ])
            .then(([Search, SearchViewModel, Expand, FeatureLayer, Editor, LayerList, Legend, CoordinateConversion]) => {

                let source = [
                    {
                        layer: new FeatureLayer({
                            url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/5",
                            popupTemplate: { // autocasts as new popupTemplate()
                                title: "Customer",
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
                                            fieldName: "Type",
                                            label: "Type",
                                            format: {
                                                digitSeparator: false,
                                                places: 0
                                            }
                                        }, {
                                            fieldName: "Address",
                                            label: "Address",
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
                                            fieldName: "POP",
                                            label: "POP",
                                            format: {
                                                digitSeparator: false,
                                                places: 0
                                            }
                                        }, {
                                            fieldName: "FAT",
                                            label: "FAT",
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
                                        fieldName: "Comments",
                                        label: "Location",
                                        format: {
                                            digitSeparator: false,
                                            places: 0
                                        }
                                    }
                                    ]
                                }]
                            }
                        }),
                        searchFields: ["ID", "Name"],
                        displayField: "Name",
                        exactMatch: false,
                        outFields: ["*"],
                        name: "Customer",
                        placeholder: "210103276",
                        zoomScale: 500000,
                        maxResults: 6,
                        maxSuggestions: 6,
                        minSuggestCharacters: 0,
                        resultSymbol: {
                            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                            color: [239, 25, 25],
                            size: 10,
                            width: 30,
                            height: 30,
                            xoffset: 0,
                            yoffset: 0
                        }
                    },{
                        layer: new FeatureLayer({
                            url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/1",
                            popupTemplate: { // autocasts as new popupTemplate()
                                title: "ODB/DC",
                                dockEnabled: true,
                                dockOptions: {
                                    // Disables the dock button from the popup
                                    buttonEnabled: false,
                                    // Ignore the default sizes that trigger responsive docking
                                    breakpoint: false,
                                    position: "bottom-left"
                                },
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
                                        fieldName: "Pop",
                                        label: "Pop",
                                        format: {
                                            digitSeparator: false,
                                            places: 0
                                        }
                                    }, {
                                        fieldName: "City",
                                        label: "City",
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
                                        fieldName: "Comment",
                                        label: "Comment",
                                        format: {
                                            digitSeparator: true,
                                            places: 0
                                        }
                                    }
                                    ]
                                }]
                            }
                        }),
                        searchFields: ["ID", "Name"],
                        displayField: "Name",
                        exactMatch: false,
                        outFields: ["*"],
                        name: "ODB/DC",
                        placeholder: "2100101",
                        zoomScale: 500000,
                        maxResults: 6,
                        maxSuggestions: 6,
                        minSuggestCharacters: 0,
                        resultSymbol: {
                            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                            color: [239, 25, 25],
                            size: 10,
                            width: 30,
                            height: 30,
                            xoffset: 0,
                            yoffset: 0
                        }
                    }]

                var searchWidget = new Expand({
                    content: new Search({
                        view: view,
                        popupEnabled: true,
                        includeDefaultSources: false,
                        searchAllEnabled: false,
                        sources: [],
                    }),
                    view: view,
                    group: "bottom-right",
                    expanded: false
                });
                view.ui.add(searchWidget, "top-left");
                searchWidget.content.sources = source
              
                searchWidget.content.viewModel.on("suggest-start", function (event) {
                    alert("suggest-start", event);
                });

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
                            }, /* {
                                fieldName: "Comment",
                                label: "Comment",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }, */ {
                                fieldName: "Length",
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


                var trailheadsRenderer = {
                    "type": "simple",
                    "symbol": {
                        "type": "picture-marker",
                        "url": "assets/boy.png",
                        "contentType": "image/png",
                        "width": 8.5,
                        "height": 8.5
                    }
                }

                let customer = new FeatureLayer({
                    url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/5",
                    title: 'customer',
                    renderer: trailheadsRenderer,
                    popupTemplate: {
                        title: "Customer",
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
                                fieldName: "Type",
                                label: "Type",
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }, {
                                fieldName: "Address",
                                label: "Address",
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
                                fieldName: "POP",
                                label: "POP",
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }, {
                                fieldName: "FAT",
                                label: "FAT",
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
                                fieldName: "Comments",
                                label: "Location",
                                format: {
                                    digitSeparator: true,
                                    places: 0
                                }
                            }
                            ]
                        }]
                    }

                });
                map.add(customer)

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

                let layerlist = new Expand({
                    content: new LayerList({
                        view: view,
                        style: "classic", //  styles include 'card' and 'classic'
                        listItemCreatedFunction: function (event) {
                            let item = event.item
                            if (item.title !== "South Region")
                                item.panel = {
                                    content: "legend",
                                    open: false
                                };
                        }
                    }),
                    view: view,
                    group: "bottom-right",
                    expanded: false
                })
                view.ui.add(layerlist, 'top-left')

                var ccWidget = new CoordinateConversion({
                    view: view
                });

                view.ui.add(ccWidget, "bottom-left");

            });


    }

    render() {
        return null

    }

}

