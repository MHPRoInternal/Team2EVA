sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/odata/ODataMetadata",
	'sap/m/MessageToast'

], function(Controller, History, ODataMetadata, MessageToast) {
	"use strict";

	return Controller.extend("eventManagementEVA.controller.BaseController", {
		onInit: function() {
			var oView = this.getView();
			var oModel = oView.getModel();
		},
		
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		
		onNavBack: function() {
			var oHistory = sap.ui.core.routing.History.getInstance();
        	var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}
		} 

		
		
		
	});
});