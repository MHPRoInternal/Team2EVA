sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Element'
], function(BaseController) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.aDashboard", {

		onInit: function(oEvent) {
			this.getRouter().getRoute("aDashboard").attachMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function(oEvent) {
			this.oView = this.getView();
			this.oModel = this.oView.getModel();
			this.uID = oEvent.getParameter("arguments").userID;
			console.log(this.uID);
			this.userRole = oEvent.getParameter("arguments").uRole;
			console.log("User role in aDashboard is: " + this.userRole);
			var createEventBtn = this.oView.byId("createEventBtn");
			if (this.userRole === "true") {
				createEventBtn.setVisible(true);
			}
			this.eventPic = this.oView.byId("eventPicture");
			this.oView.bindElement("/UserSet('" + this.uID + "')");
			
			this.eID = oEvent.IdEvent;
			
			console.log("User eID in aDashboard is: " + this.eID);
			this.eventPic.setSrc("/destinations/M38/sap/opu/odata/sap/ZTEAM2_SRV/EPictureSet('" + this.eID + "')/$value");
		},
		
		handlePress: function(oEvent) {
			this.eID = oEvent.getSource().getBindingContext().getObject().IdEvent;
			console.log("Event ID-ul este : " + this.eID);
			this.getRouter().navTo("aEvent", {
				eventID: this.eID,
				userID: this.uID,
				uRole: this.userRole
			});
		},
		onCreatePress: function(oEvent) {
			this.getRouter().navTo("createEvent");
		}

	});
});