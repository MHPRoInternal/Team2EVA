sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Element',
	'sap/m/MessageToast'

], function(BaseController, Element, MessageToast) {
	"use strict";

	var eID = null;
	var uID = null;
	var userRole = null;
	var acceptBtn = null;
	var declineBtn = null;
	var updateBtn = null;
	var deleteBtn = null;
	var selectDisplay = null;

	return BaseController.extend("eventManagementEVA.controller.aEvent", {

		onInit: function(oEvent) {
			var oView = this.getView();
			this.getRouter().getRoute("aEvent").attachMatched(this._onRouteMatched, this);
			this.getView().byId("map_canvas").addStyleClass("myMap");
			updateBtn = oView.byId("eventUpdate");
			deleteBtn = oView.byId("eventDelete");
			selectDisplay = oView.byId("questionDisplay");
			this.createdByLabel = oView.byId("createdBy");
		},
		onAfterRendering: function() {
			if (!this.initialized) {
				this.initialized = true;
				this.geocoder = new google.maps.Geocoder();
				var mapOptions = {
					center: new google.maps.LatLng(46.7649352, 23.606376100000034),
					zoom: 13,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				this.map = new google.maps.Map(this.getView().byId("map_canvas").getDomRef(),
					mapOptions);
			}
		},

		actSearch: function() {

			var oView = this.getView();
			var markers = [];
			var latitude;
			var longitude;
			var map = this.map;
			var address = this.getView().byId("Location").getValue();
			markers.forEach(function(marker) {
				marker.setMap(null);
			});
			markers = [];
			this.geocoder.geocode({
				'address': address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
					markers.push(marker);
					latitude = results[0].geometry.location.lat();
					longitude = results[0].geometry.location.lng();
					oView.byId("Latitude").setValue(latitude);
					oView.byId("Longitude").setValue(longitude);

				} else {
					console.log('Geocode was not successful for the following reason: ' + status);
					new sap.m.MessageToast.show("Location could not be found. Please try again.");
				}
			});
		},

		onSwitchEditMode: function(oEvent) {
			var oView = this.getView();
			var bState = oEvent.getSource().getState();
			var switchBtn = oView.byId("switchBtn");
			var searchBtn = oView.byId("bntSearch");
			var state = switchBtn.getState();
			updateBtn.setVisible(state);
			deleteBtn.setVisible(state);
			searchBtn.setVisible(state);
			this.latitude = oView.byId("Latitude").getValue();
			this.longitude = oView.byId("Longitude").getValue();

			var oInput = oView.byId("Title");
			oInput.setEditable(bState);
			oInput = oView.byId("Location");
			oInput.setEditable(bState);
			oInput = oView.byId("Latitude");
			oInput.setEditable(bState);
			oInput = oView.byId("Longitude");
			oInput.setEditable(bState);
			oInput = oView.byId("Date");
			oInput.setEditable(bState);
			oInput = oView.byId("Time");
			oInput.setEditable(bState);
			oInput = oView.byId("Dresscode");
			oInput.setEditable(bState);
		},

		onAcceptTap: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var confirmation = "Y";
			var oData = {
				Confirmation: confirmation
			};
			oModel.update("/UserEventSet(IdUser='" + uID + "', IdEvent='" + eID + "'", oData, {
				success: function(oCompletedEntry) {
					oView.byId("acceptBtn").setEnabled(false);
					oView.byId("acceptBtn").setVisible(false);
					oView.byId("declineBtn").setEnabled(true);
					oView.byId("declineBtn").setVisible(true);
					MessageToast.show("Event attendance confirmed for user " + uID + "!", {

						animationDuration: 5000

					});
					console.log("SUCCESS?");
				},
				error: function(oError) {
					MessageToast.show("Changes could not be made! Please try again.");
					console.log("ERROR?");
				}
			});
		},
		onDeclineTap: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var confirmation = "N";
			var oData = {
				Confirmation: confirmation
			};
			oModel.update("/UserEventSet(IdUser='" + uID + "', IdEvent='" + eID + "'", oData, {
				success: function(oCompletedEntry) {
					oView.byId("declineBtn").setEnabled(false);
					oView.byId("declineBtn").setVisible(false);
					oView.byId("acceptBtn").setEnabled(true);
					oView.byId("acceptBtn").setVisible(true);
					MessageToast.show("Event attendance confirmed for user " + uID + "!", {

						animationDuration: 5000

					});
					console.log("SUCCESS?");
				},
				error: function(oError) {
					MessageToast.show("Changes could not be made! Please try again.");
					console.log("ERROR?");
				}
			});
		},

		onUpdatePress: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var title = oView.byId("Title").getValue();
			var location = oView.byId("Location").getValue();
			var latitude = oView.byId("Latitude").getValue();
			var longitude = oView.byId("Longitude").getValue();
			var date = oView.byId("Date").getValue();
			var time = oView.byId("Time").getValue();
			var dressCode = oView.byId("Dresscode").getValue();
			var oData = {
				Title: title,
				Location: location,
				Latitude: latitude,
				Longitude: longitude,
				Data: date,
				Time: time,
				Dresscode: dressCode
			};

			// oModel.update("/EventSet(IdEvent='" + eID + "'", oData, {
			// 	success: function(oCompletedEntry) {

			// 		MessageToast.show("Update successful for the event with ID: " + eID + "!", {

			// 			animationDuration: 5000

			// 		});
			// 		console.log("SUCCESS?");
			// 	},
			// 	error: function(oError) {
			// 		MessageToast.show("Changes could not be made! Please try again.");
			// 		console.log("ERROR?");
			// 	}
			// });
			//var bState = oEvent.getSource().getState();
			var oInput = oView.byId("Title");
			oInput.setEditable(false);
			oInput = oView.byId("Location");
			oInput.setEditable(false);
			oInput = oView.byId("Latitude");
			oInput.setEditable(false);
			oInput = oView.byId("Longitude");
			oInput.setEditable(false);
			oInput = oView.byId("Date");
			oInput.setEditable(false);
			oInput = oView.byId("Time");
			oInput.setEditable(false);
			oInput = oView.byId("Dresscode");
			oInput.setEditable(false);
			oInput = oView.byId("Picture");
			oInput.setEditable(false);

			// var updateBtn = this.getView().byId("eventUpdate");
			// var deleteBtn = this.getView().byId("eventDelete");
			// var switchBtn = this.getView().byId("switchBtn");
			// switchBtn.setState(false);
			// updateBtn.setVisible(false);
			// deleteBtn.setVisible(false);
			// oModel.setUseBatch("true");
			// oModel.submitChanges({
			// 	success: jQuery.proxy(function() {
			// 		new sap.m.MessageToast.show("Changes successfully saved!");
			// 	}, this),
			// 	error: jQuery.proxy(function() {
			// 		oModel.setUseBatch(false);
			// 		new sap.m.MessageToast.show("Error saving changes!");

			// 	}, this)
			// });
		},
		_onRouteMatched: function(oEvent) {
			var oView = this.getView();
			eID = oEvent.getParameter("arguments").eventID;
			uID = oEvent.getParameter("arguments").userID;
			var createdByText = "Event created by - " + uID;
			userRole = oEvent.getParameter("arguments").uRole;
			this.createdByLabel.setText(createdByText);
			acceptBtn = oView.byId("acceptBtn");
			declineBtn = oView.byId("declineBtn");
			var switchBtn = oView.byId("switchBtn");
			var questionBox = oView.byId("questionBox");
			var selectAnswer = oView.byId("answerSelect");

			var qID = null;
			var state = switchBtn.getState();
			updateBtn.setVisible(state);
			deleteBtn.setVisible(state);

			if (userRole === "true") {
				acceptBtn.setVisible(false);
				declineBtn.setVisible(false);
				switchBtn.setState(false);

				/*	va model = new sap.ui.model.JSON.JsonModel();
					var Data ={
						visible: false
					}
					model.setData(Data);
					view.setModel(model, "modelLocal")*/
			} else if (userRole === "false") {
				switchBtn.setVisible(false);
				switchBtn.setEnabled(false);
				updateBtn.setVisible(false);
				deleteBtn.setVisible(false);
			}

			console.log("1 " + eID);
			//	var oUserModel = this.getOwnerComponent().getModel("userModel");
			//console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			var oModel = oView.getModel();
			console.log("3 " + eID);

			questionBox.bindElement("/EventSet('" + eID + "')", {
				events: {
					dataReceived: function(oCompleteEntry) {
						qID = oCompleteEntry.IdQuestion;
						console.log("Question ID-ul este: " + qID);
					}
				}
			});

			oView.bindElement({
				path: "/EventSet('" + eID + "')",
				events: {
					dataReceived: function(oData) {

						var myLatlng = new google.maps.LatLng(oData.getParameters().data.Latitude, oData.getParameters().data.Longitude);
						var mapOptions = {
							zoom: 15,
							center: myLatlng
						};
						var map = new google.maps.Map(oView.byId("map_canvas").getDomRef(), mapOptions);

						var marker = new google.maps.Marker({
							position: myLatlng,
							title: "Event location"
						});

						// To add the marker to the map, call setMap();
						marker.setMap(map);
					}.bind(this)
				}
			});
		}

	});

});