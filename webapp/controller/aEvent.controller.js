sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/m/MessageToast',

], function(BaseController, MessageToast) {
	"use strict";

	var eID = null;
	var uID = "";
	var userRole = null;
	var acceptBtn = null;
	var declineBtn = null;
	var updateBtn = null;
	var deleteBtn = null;

	return BaseController.extend("eventManagementEVA.controller.aEvent", {

		onInit: function(oEvent) {
			var oView = this.getView();
			this.getRouter().getRoute("aEvent").attachMatched(this.onRouteMatched, this);
			oView.byId("map_canvas").addStyleClass("myMap");
			updateBtn = oView.byId("eventUpdate");
			deleteBtn = oView.byId("eventDelete");
			// oModel.read("/EventSet", {
			// 	success: function(oCompletedEntry) {
			// 		oCompletedEntry.results.forEach(function(item) {

			// 		});

			// 	},
			// 	error: function(oError) {

			// 	}
			// });
		},

		onRouteMatched: function(oEvent) {
			var oView = this.getView();
			eID = oEvent.getParameter("arguments").eventID;
			uID = oEvent.getParameter("arguments").userID;
			userRole = oEvent.getParameter("arguments").uRole;
			acceptBtn = oView.byId("acceptBtn");
			declineBtn = oView.byId("declineBtn");
			var switchBtn = oView.byId("switchBtn");
			var state = switchBtn.getState();
			updateBtn.setVisible(state);
			deleteBtn.setVisible(state);

			if (userRole === "true") {
				acceptBtn.setVisible(false);
				declineBtn.setVisible(false);
				switchBtn.setState(false);
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

			// oModel.read("/EventSet(IdEvent='" + eID + "')", {
			// 	success: function(oCompleteEntry) {
			// 		console.log(oCompleteEntry);
			// 	},
			// 	error: function(oError){
			// 	console.log("ERROR!");
			// 	}
			// });
			// oModel.metadataLoaded().then(function(){
			// 		//trimit request la server
			// 		oView.bindElement("/EventSet(" + eID + " ) ");
			// 		console.log("3 " + eID);
			// 	}); 

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
					}
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

			var oInput = oView.byId("Title");
			oInput.setEditable(bState);
			oInput = oView.byId("Location");
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
			var confirmation = "true";
			var oData = {
				Confirmation: confirmation
			};
			oModel.update("/UserEventSet(IdUser='" + uID + "', IdEvent='" + eID + "'", oData, {
				success: function(oCompletedEntry) {
					oView.byId("acceptBtn").setEnabled(false);
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
		}

	});

});