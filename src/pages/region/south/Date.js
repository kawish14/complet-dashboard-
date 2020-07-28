import React from 'react';
import { loadModules } from 'react-arcgis';
import './south.css'

export default class Date extends React.Component{
    componentDidMount(){
        let map = this.props.map;
        let view = this.props.view;


        loadModules(["esri/layers/FeatureLayer", "esri/widgets/Editor", "esri/tasks/support/Query",
            "esri/tasks/QueryTask", "esri/layers/GraphicsLayer", "esri/geometry/geometryEngine",
            "esri/Graphic", 'esri/widgets/Expand', "esri/geometry/Extent", "esri/widgets/Popup", "esri/PopupTemplate"
        ])
        .then(([FeatureLayer, Editor, Query, QueryTask, GraphicsLayer, geometryEngine, Graphic, Expand, Extent,
                Popup, PopupTemplate]) => {

            view.ui.add(
                [
                    new Expand({
                        view: view,
                        content: document.getElementById("infoDivDate"),
                        group: "bottom-right",
                        expanded: false,
                        expandIconClass: "fas fa-calendar-week",
                    })
                ],
                "top-right"
            );

            var pointDC =
                "https://localhost:6443/arcgis/rest/services/KarachiSDE/FeatureServer/1";

            let TownBuffer, districtGeometries, querytotal

            var district = document.getElementById("TownDate");
            let crimedrop1 = document.getElementById("dates1");
            let crimedrop2 = document.getElementById("dates2");
            let queryButton = document.getElementById("queryDate");
            var distanceSlider = document.getElementById("distance");
            let result = document.getElementById("total");
            let attribute = document.getElementById('attribute')

            var districtlayer1 = new FeatureLayer({
                url: "https://localhost:6443/arcgis/rest/services/South_Region/Crime_Street/MapServer/4",
                outFields: ["*"],
                visible: false
            });
            map.add(districtlayer1)

            var pointLayer = new FeatureLayer({
                url: pointDC,
                outFields: ["*"],
                visible: false,
            });
            map.add(pointLayer)

            let queryTaskDC1 = new QueryTask({
                url: pointDC
            });

            var resultsLayer = new GraphicsLayer({
                listMode: "hide"
            });
            map.add(resultsLayer)

            view.ui.add("infoDivDate", "top-left");

            view.when(function () {
                return districtlayer1.when(function () {
                    var query = districtlayer1.createQuery();
                    return districtlayer1.queryFeatures(query);
                });
            })
            .then(getValues)
            .then(getUniqueValues)
            .then(addToSelect)
            .then(createBuffer);

            function getValues(response) {
                var features = response.features;
                var values = features.map(function (feature) {
                    return feature.attributes.TOWN_NAME;
                });
                return values;
            }

            function getUniqueValues(values) {
                var uniqueValues = [];

                values.forEach(function (item, i) {
                    if (
                        (uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
                        item !== ""
                    ) {
                        uniqueValues.push(item);
                    }
                });
                return uniqueValues;
            }

            function addToSelect(values) {
                values.sort();
                values.map((value, index) => {
                    var option = document.createElement("option");
                    option.text = value;
                    district.add(option);

                });

                return setWellsDefinitionExpression(district.value);
            }

            function setWellsDefinitionExpression(newValue) {
                districtlayer1.definitionExpression = "TOWN_NAME = '" + newValue + "'";

                let queryodb = new Query({
                    returnGeometry: true,
                    outSpatialReference: { wkid: 4326 },
                    where: districtlayer1.definitionExpression

                });
                districtlayer1.queryFeatures(queryodb).then(function (results) {
                    const features = results.features;
                    view.goTo({
                        target: [features[0].geometry],
                        zoom: 12
                    });
                })

                if (!districtlayer1.visible) {
                    districtlayer1.visible = true;
                }

                return queryForWellGeometries();
            }

            function queryForWellGeometries() {
                var districtQuery = districtlayer1.createQuery();

                return districtlayer1.queryFeatures(districtQuery).then(function (response) {
                    districtGeometries = response.features.map(function (feature) {
                        return feature.geometry;
                    });

                    return districtGeometries;
                });
            }


            function createBuffer(Points) {
                var bufferDistance = parseInt(distanceSlider.value);
                var districtBuffer = geometryEngine.geodesicBuffer(
                    Points,
                    [bufferDistance],
                    "meters",
                    true
                );
                TownBuffer = districtBuffer[0];

                // add the buffer to the view as a graphic
                var bufferGraphic = new Graphic({
                    geometry: TownBuffer,
                    symbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        outline: {
                            width: 2.5,
                            color: [0, 255, 255, 0.5]
                        },
                        style: "none"
                    }
                });
                view.graphics.removeAll();
                view.graphics.add(bufferGraphic);
            }

            district.addEventListener("change", function (event) {
                let type = event.target.value;
                setWellsDefinitionExpression(type).then(createBuffer);

            });

            queryButton.addEventListener("click", () => {
                total().then(displayTotal)
                resultsLayer.removeAll()
            })

            function total() {

                querytotal = new Query({
                    returnGeometry: true,
                    geometry: TownBuffer,
                    outFields: ["Name", "ID", "POP", "Splitter", "Placement"],
                    where: "Date BETWEEN  (DATE' " + crimedrop1.value + "') AND (DATE' " + crimedrop2.value + "') ",
                    spatialRelationship: "intersects"
                });

                queryTaskDC1.executeForCount(querytotal).then(function (results) {
                    result.innerHTML = " Total:  " + results;
                });

                // Attribute Table
                queryTaskDC1.execute(querytotal).then(function (response) {

                    attribute.innerHTML = ""

                    var table = document.createElement("table");
                    var header = document.createElement("tr");
                    table.appendChild(header);

                    response.fields.forEach(element => {
                        var column = document.createElement("th");
                        column.textContent = element.alias;
                        header.appendChild(column);
                        //alert(element.fields.alias);
                    });

                    response.features.forEach(res => {
                        var row = document.createElement("tr");
                        table.appendChild(row);


                        response.fields.forEach(e => {
                            //console.log(response.fields[i])    
                            var columns = document.createElement("td");
                            columns.textContent = res.attributes[e.name];
                            row.appendChild(columns);

                        })

                    })
                    attribute.appendChild(table);

                });
                view.ui.add('attribute', "top-left")

                return pointLayer.queryFeatures(querytotal)
            }

            function displayTotal(results) {
                resultsLayer.removeAll();

                var features = results.features.map(function (graphic) {
                    graphic.symbol = {
                        type: "simple-marker",
                        size: 5,
                        color: [0, 255, 255],
                        outline: null
                    };

                    graphic.popupTemplate = new PopupTemplate({
                        title: "Crime",
                        content: [{
                            type: "fields",
                            fieldInfos: [
                                {
                                    fieldName: "Name",
                                    label: "Name",
                                    format: {
                                        digitSeparator: true
                                    }
                                },
                                {
                                    fieldName: "CATEGORY",
                                    label: "CATEGORY",
                                    format: {
                                        digitSeparator: true
                                    }
                                },
                                {
                                    fieldName: "BLOCK_PHASE_SECTOR",
                                    label: "BLOCK_PHASE_SECTOR",
                                    format: {
                                        digitSeparator: true
                                    }
                                },
                                {
                                    fieldName: "CITY_NAME",
                                    label: "CITY NAME",
                                    format: {
                                        digitSeparator: true
                                    }
                                },
                                {
                                    fieldName: "TYPE",
                                    label: "TYPE",
                                    format: {
                                        digitSeparator: true
                                    }
                                }
                            ]
                        }]
                    })
                    view.popup.features = graphic

                    return graphic;
                });

                resultsLayer.addMany(features);
            }

            let unselect = document.getElementById('unselect1');
            unselect.addEventListener('click', () => {
                return result.innerHTML = " ",
                    document.getElementById('motorbike').innerHTML = " ",
                    attribute.innerHTML = " ",
                    document.getElementById('motorbike').innerHTML = " ",
                    document.getElementById('car').innerHTML = " ",
                    document.getElementById('killing').innerHTML = " ",
                    document.getElementById('kidanapping').innerHTML = " ",
                    document.getElementById('robbery').innerHTML = " ",
                    document.getElementById('mobile').innerHTML = " ",

                    resultsLayer.removeAll();
            })
        })
    }

    render(){
        return(
            <div>
                <div id="infoDivDate">
                    Select Town
                    <select id="TownDate">
                        <option value=" ">...Uselect Result...</option>
                    </select><br />

                    Start Date<input type="date" id="dates1" /><br />
                    End Date<input type="date" id="dates2" /><br />

                    <input
                        id="distance"
                        type="range"
                        min="0"
                        max="0"
                        step="5"
                        value="100"
                    />

                    <div id="buttons">
                        <button id="queryDate">Apply Query</button><br />
                        <button id="unselect1">Cancel Query</button>
                    </div><br />

                    {/* <div id="results1">
                        
                    </div> */}
                    <div>
                        <div id="resultsDate">
                            <div id="total"></div>
                            <div id="robbery"></div>
                            <div id="mobile"></div>
                            <div id="motorbike"></div>
                            <div id="car"></div>
                            <div id="killing"></div>
                            <div id="kidanapping"></div>

                        </div>

                    </div>


                </div>
                <div id="attribute">

                </div>
            </div>
        )
    }
}