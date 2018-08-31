sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Element',
	'sap/m/MessageToast',
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/m/Text',
	'eventManagementEVA/model/formatter' 
], function(BaseController, Element, MessageToast, Dialog, Button, Text, formatter) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.EventDashboard", {
		formatter : formatter,
		onInit: function(oEvent) {
			this.getRouter().getRoute("EventDashboard").attachMatched(this._onRouteMatched, this);
		},
		//sap.ui.controller("namespace.Controllername").method();

		setStatus: function(oEvent) {
			this.userStatus = this.oView.byId("status").getFooter();
			console.log("User status is: " + this.userStatus);
		},
		//this ENABLES the delete icons attached to each of the tiles' boxes
		enableDeleteBtns: function() {
			var oView = this.getView();
			// var view = sap.ui.getCore().byId(viewID);
			var deleteEventButton = oView.byId("deleteEventBtn");
			var tileBox = oView.byId("tileContainer").getItems();
			var menuItems = oView.byId("menuButton");
			menuItems.getItems()[1].setVisible(false);
			menuItems.getItems()[2].setVisible(true);
			deleteEventButton.setVisible(true);
			this.eventCreateBtn.setVisible(false);
			tileBox.forEach(function(item) {
				item.getItems()[1].setVisible(true);
			});

		},
		//this DISABLES the delete icons attached to each of the tiles' boxes
		disableDeleteBtns: function() {
			var oView = this.getView();
			var menuItems = oView.byId("menuButton");
			menuItems.getItems()[1].setVisible(true);
			menuItems.getItems()[2].setVisible(false);
			// var view = sap.ui.getCore().byId(viewID);
			var deleteEventButton = oView.byId("deleteEventBtn");
			var tileBox = oView.byId("tileContainer").getItems();
			this.eventCreateBtn.setVisible(true);
			deleteEventButton.setVisible(false);
			tileBox.forEach(function(item) {
				item.getItems()[1].setVisible(false);
			});
		},
		//function to execute when a tile is pressed
		handlePress: function(oEvent) {
			this.eID = oEvent.getSource().getBindingContext().getObject().IdEvent;
			var userConfirmation = oEvent.getSource().getBindingContext().getObject().Confirmation;
			console.log("Event ID-ul este : " + this.eID);
			console.log("User ID-ul este : " + this.uID);
			this.getRouter().navTo("EventDetails", {
				eventID: this.eID,
				userID: this.uID,
				uRole: this.userRole,
				nameUser: this.usersName,
				confirmation: userConfirmation
			});
		},

		deleteEvent: function(oEvent) {
			this.viewID = this.getView().getId();
			this.view = sap.ui.getCore().byId(this.viewID);
			
			console.log("Event ID-ul in BaseController este: " + this.eID);
			
			var oModel = this.view.getModel();

			oModel.remove("/EventSet('" + this.eID + "')", {
				method: "DELETE",
				success: function(data) {
					new MessageToast.show("Event has been successfully deleted.");
					// sap.ui.getCore().byId("EventDashboard").getModel().refresh(true);
				}.bind(this),
				error: function(e) {

				}
			});
			oModel.refresh(true);

		},

		onCreatePress: function(oEvent) {
			console.log("Email-ul adminului este : " + this.adminEmail);
			this.getRouter().navTo("EventCreate", {
				adminEmailAddress: this.adminEmail,
				nameUser: this.usersName,
				userID: this.uID,
				uRole: this.userRole
			});
		},
		
		onApproveDialog: function (oEvent) {
			this.eventTitle = oEvent.getSource().getBindingContext().getObject().Title;
			this.eID = oEvent.getSource().getBindingContext().getObject().IdEvent;
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({ text: "Are you sure you want to delete the event?" }),
				beginButton: new Button({
					text: 'Yes',
					press: function () {
						this.showBusyIndicator(1100, 0);
						this.deleteEvent();
						dialog.close();
					}.bind(this)
				}),
				endButton: new Button({
					text: 'No',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},

		showBusyIndicator : function (iDuration, iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);

			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					jQuery.sap.clearDelayedCall(this._sTimeoutId);
					this._sTimeoutId = null;
				}
				
				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function() {
					this.hideBusyIndicator();
				});
			}
		},
		
		hideBusyIndicator : function() {
			sap.ui.core.BusyIndicator.hide();
		},

		_onRouteMatched: function(oEvent) {
			this.oView = this.getView();
			this.oModel = this.oView.getModel();
			var oParameter = oEvent.getParameter("arguments");
			this.uID = oParameter.userID;
			this.usersName = oParameter.nameUser;
			this.userRole = oParameter.uRole;
			this.adminEmail = oParameter.adminEmailAddress;
			this.eventCreateBtn = this.oView.byId("EventCreateBtn");
			this.page = this.oView.byId("dashboardPage");
			this.oModel.refresh(true);
			if (this.userRole === "true") {
				this.eventCreateBtn.setVisible(true);
			} else {
				var menuItems = this.oView.byId("menuButton");
				menuItems.getItems()[1].setVisible(false);
				this.eventCreateBtn.setVisible(false);
			}
			this.oView.bindElement({
				path: "/UserSet('" + this.uID + "')",
				events: {
					dataReceived: function(oData) {
						this.userStatus = this.oView.byId("status");
						console.log("Confirmation is: " + this.userStatus);
					}.bind(this)
				}
			});

		}
	});
});