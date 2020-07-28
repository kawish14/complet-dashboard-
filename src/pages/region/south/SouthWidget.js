import React from 'react'
import { loadModules, setDefaultOptions } from 'esri-loader';
import './south.css'

setDefaultOptions({ version: '4.14' })
export default class SouthWidgets extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            draw: [],
            length:[]
        }
        this.polyline = React.createRef()
        this.deletes = React.createRef()
    }
  

    componentDidMount() {
        let view = this.props.view;
        //let map = this.props.map
        
        loadModules(["esri/widgets/Print","esri/views/draw/Draw","esri/widgets/Search", "esri/layers/FeatureLayer", 'esri/widgets/Expand', "esri/widgets/BasemapToggle",
            "esri/Graphic", "esri/widgets/Legend", "esri/geometry/geometryEngine", "esri/widgets/Home"
            
        ], { css: false })
            .then(([Print, Draw, Search, FeatureLayer, Expand, BasemapToggle, Graphic, Legend, geometryEngine, Home]) => {
                
            var basemapToggle = new BasemapToggle({
                view: view,  // The view that provides access to the map's "streets" basemap
                nextBasemap: "topo"  // Allows for toggling to the "hybrid" basemap
            });
            view.ui.add(basemapToggle, 'bottom-left')
      
            var homeWidget = new Home({
                view: view
            });

            // adds the home widget to the top left corner of the MapView
            view.ui.add(homeWidget, "top-left");

            var print = new Expand({
                content: new Print({
                    view: view,
                    printServiceUrl: "http://localhost:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
                }),
                view:view
            })
            view.ui.add(print, {
                position: "top-left"
            });
            
            let source = [
                {
                    layer: new FeatureLayer({
                        url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/0",
                        popupTemplate: { // autocasts as new popupTemplate()
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
                                }
                                ]
                            }]
                        }
                    }),
                    searchFields: ["ID", "Name"],
                    displayField: "Name",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "POP",
                    placeholder: "21001",
                    scale: 10,
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
                },
                {
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
                    scale: 10,
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
                },
                {
                    layer: new FeatureLayer({
                        url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/5",
                        popupTemplate: { // autocasts as new popupTemplate()
                            title: "FAT",
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
                                    fieldName: "Pop",
                                    label: "Pop",
                                    format: {
                                        digitSeparator: false,
                                        places: 0
                                    }
                                }
                               ]
                            }]
                        }
                    }),
                    searchFields: ["Name"],
                    displayField: "Name",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "FAT",
                    placeholder: "ODB Eaton FAT 05",
                    scale: 10,
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
                },
                {
                    layer: new FeatureLayer({
                        url: "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/6",
                        popupTemplate: { // autocasts as new popupTemplate()
                            title: "Customers",
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
                                    fieldName: "ID",
                                    label: "ID",
                                    format: {
                                        digitSeparator: true,
                                        places: 0
                                    }
                                }, {
                                    fieldName: "FAT",
                                    label: "FAT",
                                    format: {
                                        digitSeparator: false,
                                        places: 0
                                    }
                                },
                                {
                                    fieldName: "DC",
                                    label: "DC",
                                    format: {
                                        digitSeparator: false,
                                        places: 0
                                    }
                                },
                                {
                                    fieldName: "POP",
                                    label: "POP",
                                    format: {
                                        digitSeparator: false,
                                        places: 0
                                    }
                                },
                                {
                                    fieldName: "Type",
                                    label: "Type",
                                    format: {
                                        digitSeparator: false,
                                        places: 0
                                    }
                                },
                                {
                                    fieldName: "Comments",
                                    label: "Comments",
                                    format: {
                                        digitSeparator: false,
                                        places: 0
                                    }
                                }
                                ]
                            }]
                        }
                    }),
                    searchFields: ["Name", "ID"],
                    displayField: "Name",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "Customers",
                    placeholder: "210103276",
                    scale: 10,
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
                },  
                {
                    layer: new FeatureLayer({
                        url: "http://localhost:6080/arcgis/rest/services/South_Region/South_Region_for_server/MapServer/1",
                    }),
                    searchFields: ["TOWN_NAME"],
                    displayField: "TOWN_NAME",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "Town",
                    placeholder: "Clifton Cantonment",
                    zoom:12,
                    maxResults: 6,
                    maxSuggestions: 6,
                    minSuggestCharacters: 0,
                    resultSymbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        outline: {
                            width: 2,
                            color: [0, 255, 255, 1]
                        },
                        style: "none"
                    }
                   
                }
            ]

            var searchWidget = new Expand({
                content: new Search({
                    view: view,
                    popupEnabled: true,
                    includeDefaultSources: true,
                    searchAllEnabled: false,
                    sources: [],
                }),
                view: view,
                group: "bottom-right",
                expanded: false
            });
            view.ui.add(searchWidget, "top-right");
            searchWidget.content.sources = source

            let legend = new Expand({
                content: new Legend({
                    view: view
                }),
                view: view,
                group: "bottom-right",
                expanded: false,
            })
            view.ui.add(legend, 'top-left')

            //*** Add div element to show coordates ***//
            var coordsWidget = document.createElement("div");
            coordsWidget.id = "coordsWidget";
            coordsWidget.className = "esri-widget esri-component";
            coordsWidget.style.padding = "7px 15px 5px";
            view.ui.add(coordsWidget, "bottom-right");

            //*** Update lat, lon, zoom and scale ***//
            function showCoordinates(xy) {
                var coords = "Lat/Lon " + xy.latitude.toFixed(6) + " " + xy.longitude.toFixed(6) +
                    " | Scale 1:" + Math.round(view.scale * 1) / 1 +
                    " | Zoom " + view.zoom;
                coordsWidget.innerHTML = coords;
            }

            //*** Add event and show center coordinates after the view is finished moving e.g. zoom, pan ***//
            view.watch(["stationary"], function () {
                showCoordinates(view.center);
            });

            //*** Add event to show mouse coordinates on click and move ***//
            view.on(["pointer-down", "pointer-move"], function (evt) {
                showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
            });

            view.popup.autoOpenEnabled = true;

            view.on('click', ["Shift"], function (evt) {

                var lat = Math.round(evt.mapPoint.latitude * 1000000) / 1000000;
                var lon = Math.round(evt.mapPoint.longitude * 1000000) / 1000000;

                let graphic = new Graphic({
                    geometry: evt.mapPoint,
                    symbol: {
                        type: "simple-marker",
                        color: "blue",
                        size: 5,
                        outline: { // autocasts as new SimpleLineSymbol()
                            width: 0.5,
                            color: [0, 0, 0, 0.2]
                        }
                    },  popupTemplate: {
                            content: "Lat/Lon " + lat + ", " + lon,
                            location: evt.mapPoint
                        },
                    
                })
                view.graphics.removeAll()
                view.graphics.add(graphic);
                
                setTimeout(function () {
                    view.graphics.remove(graphic);
                }, 7000);

               /*  view.popup.open({
                    // Set the popup's title to the coordinates of the location
                    title: "Reverse geocode: [" + lon + ", " + lat + "]",
                    location: evt.mapPoint // Set the location of the popup to the clicked location
                }); */
            });

            const draw = new Draw({
                view: view
            });

            this.setState({
                draw:draw
            })

            view.ui.add(this.polyline.current, "top-right") 
            view.ui.add(this.deletes.current, "top-right")

        });

    }
    lineButton = () => {
        let view = this.props.view
        view.graphics.removeAll();

        // creates and returns an instance of PolyLineDrawAction
        const action = this.state.draw.create("polyline")

        // focus the view to activate keyboard shortcuts for sketching
        view.focus();

        // listen polylineDrawAction events to give immediate visual feedback
        // to users as the line is being drawn on the view.
        action.on(
            [
                "vertex-add",
                "vertex-remove",
                "cursor-update",
                "redo",
                "undo",
                "draw-complete"
            ],
            this.updateVertices
       
        );
    }

    updateVertices = (event) => {
        let result
        // create a polyline from returned vertices
        if (event.vertices.length > 1) {
            result = this.createGraphic(event);

            // if the last vertex is making the line intersects itself,
            // prevent the events from firing
          
        }

    }
    createGraphic = (event) => {
        let view = this.props.view
        loadModules(["esri/geometry/geometryEngine", "esri/Graphic"

        ], { css: false }).then(([geometryEngine, Graphic]) =>{
            const vertices = event.vertices;

            view.graphics.removeAll();

            let polyline = {
                type: "polyline",
                paths: vertices,
                spatialReference: view.spatialReference
            }
            // a graphic representing the polyline that is being drawn
            const graphic = new Graphic({
                geometry: polyline,
                symbol: {
                    type: "simple-line", // autocasts as new SimpleFillSymbol
                    color: "#EBEB00",
                    width: 2,
                    cap: "round",
                    join: "round"
                }
            });
            
            var polylineLength = geometryEngine.geodesicLength(graphic.geometry, "meters");
        /*     if (area < 0) {

                var simplifiedPolygon = geometryEngine.simplify(graphic.geometry);
                if (simplifiedPolygon) {
                    area = geometryEngine.geodesicLength(simplifiedPolygon, "meters");
                }
            } */
            this.setState({
                length:polylineLength.toFixed(3) + " meter"
            })
            graphic.popupTemplate = {
                title: "Length",
                content: this.state.length
            }

            let textSymbol = {
                type: "text",  // autocasts as new TextSymbol()
                color: "white",
                haloColor: "black",
                haloSize: 2,
                text: polylineLength.toFixed(3) + " meter",
                xoffset: 3,
                yoffset: 3,
                angle: -48,
                horizontalAlignment: "right",
                font: {  // autocasts as new Font()
                    size: 12,
                    family: "sans-serif",
                    weight: "bold"
                }
            }

            let graphicLabel = new Graphic({
                geometry: graphic.geometry.extent.center,
                //attributes: item.attributes,
                symbol: textSymbol,
                labelPlacement: "above-center",
            })
            view.graphics.add(graphicLabel)
            // labelAreas(graphic.geometry, area);
            // check if the polyline intersects itself.
            const intersectingSegment = this.getIntersectingSegment(graphic.geometry);

            // Add a new graphic for the intersecting segment.
            if (intersectingSegment) {
                view.graphics.addMany([graphic, intersectingSegment]);
            }
            // Just add the graphic representing the polyline if no intersection
            else {
                view.graphics.add(graphic);
            }

        
                    
        })
    }

    isSelfIntersecting = (polyline) => {
        loadModules(["esri/geometry/geometryEngine"

        ], { css: false }).then(([geometryEngine]) => {
            if (polyline.paths[0].length < 3) {
                return false;
            }
            const line = polyline.clone();

            //get the last segment from the polyline that is being drawn
            const lastSegment = this.getLastSegment(polyline);
            line.removePoint(0, line.paths[0].length - 1);

            // returns true if the line intersects itself, false otherwise
            return geometryEngine.crosses(lastSegment, line);
        })

    }
    getIntersectingSegment = (polyline) => {
        loadModules(["esri/Graphic"

        ], { css: false }).then(([Graphic]) => {
            if (this.isSelfIntersecting(polyline)) {
                return new Graphic({
                    geometry: this.getLastSegment(polyline),
                    symbol: {
                        type: "simple-line", // autocasts as new SimpleLineSymbol
                        style: "short-dot",
                        width: 3.5,
                        color: "yellow"
                    }
                });
            }
            return null;
        })
    
    }

    getLastSegment = (polyline) => {
        let view = this.props.view
        const line = polyline.clone();
        const lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
        const existingLineFinalPoint = line.getPoint(
            0,
            line.paths[0].length - 1
        );

        return {
            type: "polyline",
            spatialReference: view.spatialReference,
            hasZ: false,
            paths: [
                [
                    [existingLineFinalPoint.x, existingLineFinalPoint.y],
                    [lastXYPoint.x, lastXYPoint.y]
                ]
            ]
        };
    }
    deleted = (e) => {
        if(e.target){
            this.props.view.graphics.removeAll()
        }
    }
    render() {
        return (
            <div>
                <div 
                    ref={this.polyline}
                    onClick={(e) => this.lineButton(e)}
                    className="esri-widget esri-widget--button esri-interactive"
                    title="Draw polyline"
                >
                    <span className="esri-icon-polyline"></span>

                </div>

                <div
                    ref={this.deletes}
                    onClick={(e) => this.deleted(e)}
                    className="esri-widget esri-widget--button esri-interactive"
                    title="Delete"
                >
                    <span className="esri-icon-trash"></span>

                </div>

            </div>
          
        )

    }

}

