sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.uDashboard", {

		onInit: function(oEvent) {
	//		this.getRouter().getRoute("uDashboard").attachMatched(this.onRouteMatched, this);
		},
		
		onCreatePress : function() {
			this.getRouter().navTo("createEvent");
		}

	});
});