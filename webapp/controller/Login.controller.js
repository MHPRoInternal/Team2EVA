sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.Login", {

		adminDashboard: function() {
			this.getRouter().navTo("aDashboard");
		},
		userDashboard: function() {
			this.getRouter().navTo("uDashboard");
		}
	});

});