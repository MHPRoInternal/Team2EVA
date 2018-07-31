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
			// oModel.read("/UserEventSet(IdUser='" + uID + "')", {
			// 		success: function(oCompleteEntry) {
			// 	 //MessageToast.show("Login Successful! Welcome.");
			// 			if (oCompleteEntry.Role === true) {
						
						
							
			// 			} else if (oCompleteEntry.Role === false) {
							
			
							
			// 			}
						
						
			// 		},
			// 		error: function(oError) {
			// 			 MessageToast.show("Invalid credentials!");
						
			// 		}

			// 	});
		},

		handlePress: function() {
			this.getRouter().navTo("uEvent"

				, {
					
					userID : uID

				});

		},
		
		
		
	});
	
	
});