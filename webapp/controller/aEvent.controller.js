sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/m/MessageToast'

], function(BaseController, MessageToast) {
	"use strict";

	var eID = null;

	return BaseController.extend("eventManagementEVA.controller.aEvent", {

		onInit: function(oEvent) {
			this.getRouter().getRoute("aEvent").attachMatched(this.onRouteMatched, this);
			var updateBtn = this.getView().byId("eventUpdate");
			var deleteBtn = this.getView().byId("eventDelete");
			updateBtn.setVisible(false);
			deleteBtn.setVisible(false);
			this.getView().byId("map_canvas").addStyleClass("myMap");
		},

		onAfterRendering: function() {
			if (!this.initialized) {

				var latitude = this.getView().byId("Latitude").getValue();
				var longitude = this.getView().byId("Longitude").getValue();

				var myLatlng = new google.maps.LatLng(latitude, longitude);
				var mapOptions = {
					zoom: 13,
					center: myLatlng
				};
				var map = new google.maps.Map(this.getView().byId("map_canvas").getDomRef(), mapOptions);

				var marker = new google.maps.Marker({
					position: myLatlng,
					title: "Hello World!"
				});

				// To add the marker to the map, call setMap();
				marker.setMap(map);
			}
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
			oInput = this.getView().byId("Longitude");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Date");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Time");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Dresscode");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Picture");
			oInput.setEditable(bState);

		},

		onRouteMatched: function(oEvent) {
			eID = oEvent.getParameter("arguments").eventID;
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

			this.getView().bindElement("/EventSet('" + eID + "')");
			var latitude = this.getView().byId("Latitude").getValue();
			var longitude = this.getView().byId("Longitude").getValue();
			console.log("Latitude is: " + latitude);
			console.log("Longitude is: " + longitude);
		},

		onUpdatePress: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var title = this.getView().byId("Title").getValue();
			var location = this.getView().byId("Location").getValue();
			var latitude = this.getView().byId("Latitude").getValue();
			var longitude = this.getView().byId("Longitude").getValue();
			var date = this.getView().byId("Date").getValue();
			var time = this.getView().byId("Time").getValue();
			var dressCode = this.getView().byId("Dresscode").getValue();
			var picture = this.getView().byId("Picture").getValue();
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