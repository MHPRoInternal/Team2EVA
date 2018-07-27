sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/core/Popup",
	"sap/m/Button",
	"sap/m/Image",
	"sap/m/MessageToast"
], function(BaseController, Button, Popup, Image, MessageToast) {
	"use strict";

	var uID = null;

	return BaseController.extend("eventManagementEVA.controller.uDashboard", {

		onInit: function(oEvent) {
			this.getRouter().getRoute("uDashboard").attachMatched(this.onRouteMatched, this);
			// var oPopUp = new Popup({
			// 				modal: true,

			// 				content: new Text({
			// 					text: loginSuccess
			// 				}),

			// 				autoclose: true

			// 			});
			// 			oPopUp.open();
		},

		onRouteMatched: function(oEvent) {
			uID = oEvent.getParameter("arguments").userID;
			//console.log(uID);
			var oView = this.getView();
			var oModel = oView.getModel();
			//MessageToast.show("Welcome, " + uID + ".");
		},

		handlePress: function() {
			this.getRouter().navTo("uEvent"

				, {
					
					userID : uID

				});
		console.log(Picture);
		}
		
	});
	
	
});