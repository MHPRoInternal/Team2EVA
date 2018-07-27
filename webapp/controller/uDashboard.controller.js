sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Popup',
	'sap/m/Button'
], function(BaseController, Button, Popup) {
	"use strict";

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
			var uID = oEvent.getParameter("arguments").userID;
			console.log(uID);
			var oView = this.getView();
			var oModel = oView.getModel();
			
			
		}
		
		
		
		
	});
});