sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.uDashboard", {

		onInit: function(oEvent) {
		this.getRouter().getRoute("aDashboard").attachMatched(this.onRouteMatched, this);
		},
		
		onRouteMatched: function(oEvent) {
			var uID = oEvent.getParameter("arguments").userID;
			console.log(uID);
			var oUserModel = this.getOwnerComponent().getModel("userModel");
			console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			this.getView().bindElement("/UserSet('" + uID + "')");

		},
		onCreatePress : function() {
			this.getRouter().navTo("createEvent");
		}

	});
});