sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/m/MessageToast',

], function(BaseController, MessageToast) {
	"use strict";

	var eID = null;
	var uID = "";

	return BaseController.extend("eventManagementEVA.controller.aEvent", {

		onInit: function(oEvent) {
			this.getRouter().getRoute("aEvent").attachMatched(this.onRouteMatched, this);
			var updateBtn = this.getView().byId("eventUpdate");
			var deleteBtn = this.getView().byId("eventDelete");
			updateBtn.setVisible(false);
			deleteBtn.setVisible(false);
			this.getView().byId("map_canvas").addStyleClass("myMap");
		},

		onSwitchEditMode: function(oEvent) {
			var bState = oEvent.getSource().getState();
			var updateBtn = this.getView().byId("eventUpdate");
			var deleteBtn = this.getView().byId("eventDelete");
			var switchBtn = this.getView().byId("switchBtn");
			var state = switchBtn.getState();
			updateBtn.setVisible(state);
			deleteBtn.setVisible(state);

			var oInput = this.getView().byId("Title");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Location");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Latitude");
			oInput.setEditable(bState);
			oInput.setVisible(bState);
			oInput = this.getView().byId("Longitude");
			oInput.setVisible(bState);
			oInput.setEditable(bState);
			oInput = this.getView().byId("Date");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Time");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Dresscode");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Picture");
			oInput.setEditable(bState);
			oInput.setVisible(bState);

		},

		onRouteMatched: function(oEvent) {
			eID = oEvent.getParameter("arguments").eventID;
			var uID = oEvent.getParameter("arguments").userID;
			//id_event sau IdEvent
			console.log("1 " + eID);
			//	var oUserModel = this.getOwnerComponent().getModel("userModel");
			//console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			var oView = this.getView();
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
							zoom: 13,
							center: myLatlng
						};
						var map = new google.maps.Map(oView.byId("map_canvas").getDomRef(), mapOptions);

						var marker = new google.maps.Marker({
							position: myLatlng,
							title: "Hello World!"
						});

						// To add the marker to the map, call setMap();
						marker.setMap(map);
					}
				}
			});
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
			var picture = oView.byId("Picture").getValue();
			console.log(latitude);
			console.log(longitude);
			var oData = {
				Title: title,
				Location: location,
				Latitude: latitude,
				Data: date,
				Time: time,
				Longitude: longitude,
				Dresscode: dressCode,
				Picture: picture
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
			var oInput = this.getView().byId("Title");
			oInput.setEditable(false);
			oInput = this.getView().byId("Location");
			oInput.setEditable(false);
			oInput = this.getView().byId("Latitude");
			oInput.setEditable(false);
			oInput = this.getView().byId("Longitude");
			oInput.setEditable(false);
			oInput = this.getView().byId("Date");
			oInput.setEditable(false);
			oInput = this.getView().byId("Time");
			oInput.setEditable(false);
			oInput = this.getView().byId("Dresscode");
			oInput.setEditable(false);
			oInput = this.getView().byId("Picture");
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