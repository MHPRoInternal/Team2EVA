sap.ui.define(["sap/ui/core/mvc/Controller",
"sap/ui/core/routing/History"

], function(Controller, History) {
	"use strict";
	
	return Controller.extend("internshipinternship2018.controller.BaseController", {
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		onNavBack : function() {
		var sPreviousHash = History.getInstance().getPreviousHash();
		
		if(sPreviousHash !== undefined) {
			history.go(-1);
			
		}
		
		else {
			this.getRouter().navTo("dashBoard", {}, true);
		}
		
		}
	});
});