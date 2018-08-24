sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Element'
], function(BaseController) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.aDashboard", {

		onInit: function(oEvent) {
			this.getRouter().getRoute("aDashboard").attachMatched(this._onRouteMatched, this);
			//this.getRouter().getRoute("aDashboard").attachRequestCompleted(this.setStatus, this);
		},

		onAfterRendering: function() {

		},

		// onMetadataLoaded: function(){
		// this.userStatus = this.oView.byId("status").getFooter();
		// 	console.log("User status is: " + this.userStatus);
		// },
		
		setStatus: function(oEvent) {
			this.userStatus = this.oView.byId("status").getFooter();
			console.log("User status is: " + this.userStatus);
		},

		handlePress: function(oEvent) {
			this.eID = oEvent.getSource().getBindingContext().getObject().IdEvent;
			console.log("Event ID-ul este : " + this.eID);
			console.log("User ID-ul este : " + this.uID);
			this.getRouter().navTo("aEvent", {
				eventID: this.eID,
				userID: this.uID,
				uRole: this.userRole

			});
		},
		onCreatePress: function(oEvent) {
			console.log("Email-ul adminului este : " + this.adminEmail);
			this.getRouter().navTo("createEvent", {
				adminEmailAddress: this.adminEmail
			});
		},

		_onRouteMatched: function(oEvent) {
			this.oView = this.getView();
			this.oModel = this.oView.getModel();
			this.uID = oEvent.getParameter("arguments").userID;
			console.log(this.uID);
			this.userRole = oEvent.getParameter("arguments").uRole;
			this.adminEmail = oEvent.getParameter("arguments").adminEmailAddress;

			var createEventBtn = this.oView.byId("createEventBtn");
			
			if (this.userRole === "true") {
				createEventBtn.setVisible(true);
			}
			this.eventPic = this.oView.byId("eventPicture");
			this.oView.bindElement({
				path: "/UserSet('" + this.uID + "')",
				events: {
					dataReceived: function(oData) {
					this.userStatus = this.oView.byId("status");
					console.log("Confirmation is: " + this.userStatus);
					switch(oData.getParameters().data.Confirmation){
						
						case "P": this.userStatus.setValue("Pending");
						this.oView.byId("genericTile").setHeaderImage("sap-icon://alert");
						break;
						
						case "Y": this.userStatus.setValue("Accepted");
						break;
						
						case "N": this.userStatus.setValue("Declined");
						break;
					}
						

					}.bind(this)
				}
			});

			//switch()
			/*	if(this.userStatus.getValue() === "P"){
					this.userStatus.setValue("Pending");
				}
				else if(this.userStatus.getValue() === "Y"){
					this.userStatus.setValue("Accepted");
				}
				else if(this.userStatus.getValue() === "N"){
					this.userStatus.setValue("Declined");
				}*/
				
		}

	});
});