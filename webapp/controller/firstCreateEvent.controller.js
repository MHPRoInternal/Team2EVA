sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/TimePicker"
], function(BaseController, MessageToast, TimePicker) {
	"use strict";

	var uID = null;

	return BaseController.extend("eventManagementEVA.controller.firstCreateEvent", {

		// onInit: function(oEvent) {
		// this.getRouter().getRoute("firstCreateEvent").attachMatched(this.onRouteMatched, this);

		// },

		// onRouteMatched: function(oEvent) {
		// 	uID = oEvent.getParameter("arguments").userID;
		// 	//id_event sau IdEvent
		// 	console.log("1 " + uID);

		// },
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf eventManagementEVA.view.firstCreateEvent
		 */
		//	onExit: function() {
		//
		//	}
		// onCancel: function(oEvent) {
		// 	this.getRouter().navTo("aDashboard"

		// 		, {

		// 			userID : uID

		// 		});
		// },
		onCreate: function(oEvent) {

			var oView = this.getView();
			var oModel = oView.getModel();

			var title = this.getView().byId("Title").getValue();
			var location = this.getView().byId("Location").getValue();
			var latitude = this.getView().byId("Latitude").getValue();
			var longitude = this.getView().byId("Longitude").getValue();
			var date = this.getView().byId("Date").getValue();
			var time = this.getView().byId("Time").getValue();
			console.log(time);
			var dressCode = this.getView().byId("Dresscode").getValue();
			var picture = this.getView().byId("Picture").getValue();

			//add seconds to the picker

			//to be converted to PT13H31M00S

			var oData = {
				Title: title,
				Location: location,
				Latitude: latitude,
				Longitude: longitude,
				Data: date,
				Time: time,
				Dresscode: dressCode,
				Picture: picture
			};

			var route = this.getRouter();
			oModel.create("/EventSet", oData, {
				success: function(oCompletedEntry) {
					console.log("Event ID-ul este: " + oCompletedEntry.IdEvent);
					route.navTo("createEvent", {
							eventID: oCompletedEntry.IdEvent
						}

					);

				},
				error: function(oError) {
					console.log("There has been an error creating the event! Please try again.")
				}
			});
		}

	});

});