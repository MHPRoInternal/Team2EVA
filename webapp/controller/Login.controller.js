sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Popup',
	'sap/m/Button',
	'sap/m/MessageToast'

], function(BaseController, Popup, Button, MessageToast) {
	"use strict";

	var uid = "";
	var pasw = "";
	var oView = "";

	var oButton2 = new sap.m.Button("", {

			text: "Submit",
			press: function(oEvent) {
				console.log("Merge1!");
				var userName = sap.ui.getCore().byId("userName").getValue();
				var oldPass = sap.ui.getCore().byId("oldPass").getValue();
				var newPass = sap.ui.getCore().byId("newPass").getValue();
				var newPassConfirm = sap.ui.getCore().byId("newPassConfirm").getValue();
				var oModel = oView.getModel();
				var oData = {
					IdUser : userName
				}
					oModel.read("/UserSet(IdUser='" + userName + "',Password='" + oldPass + "')", {
						success: function(oCompleteEntry) {
							if (newPass === newPassConfirm) {
								console.log("Merge2!");
								oModel.update("/UserSet(IdUser='" + userName + "',Password='" + newPass + "')", oData, {

									success: function() {
										MessageToast.show("Password change successful for user" + userName + "!", {

											animationDuration: 5000

										});
										console.log("SUCCESS?");
									},
									error: function(oError) {
										MessageToast.show("Changes could not be made! Please try again.");
										console.log("ERROR?");
									}

								});
							}
						},
						error: function(oError) {
							MessageToast.show("Changes could not be made! Please try again.");
							console.log("ERROR?");
						}
					});
				}

	});

var oButton3 = new sap.m.Button("Cancel", {

	text: 'Cancel',
	press: function() {

		sap.ui.getCore().byId('Dialog1').close();

	}

});
var oDialog = new sap.m.Dialog('Dialog1', {

	title: "User password change",

	modal: true,

	contentWidth: "5em",

	buttons: [oButton2, oButton3],

	content: [

		new sap.m.Label({
			text: "Username"
		}),

		new sap.m.Input({

			maxLength: 20,

			id: "userName"

		}),

		new sap.m.Label({
			text: "Password"
		}),

		new sap.m.Input({

			maxLength: 20,
			
			type: "Password",

			id: "oldPass"

		}),

		new sap.m.Label({
			text: "New Password"
		}),

		new sap.m.Input({

			maxLength: 20,
			
			type : "Password",

			id: "newPass"

		}),
		new sap.m.Label({
			text: "Confirm new Password"
		}),

		new sap.m.Input({

			maxLength: 20,
			
			type : 'Password',

			id: "newPassConfirm"

		})

	]

});
return BaseController.extend("eventManagementEVA.controller.Login", {

	onLoginTap: function(oEvent) {

		var oView = this.getView();
		var oModel = oView.getModel();
		uid = this.getView().byId("uid").getValue();
		pasw = this.getView().byId("pasw").getValue();
		var route = this.getRouter();
		//var oListItem = oEvent.getSource();
		// var oBindingContext = oListItem.getBindingContext();
		// var userId = oBindingContext.getObject().IdUser;
		// var loginSuccess = "Login Successful! Welcome, " + uid + ".";

		// var oPopUp = new Popup({
		// 			modal: true,

		// 			content: new Text({
		// 				text: loginSuccess
		// 			}),

		// 			autoclose: true

		// 		});
		// oPopUp.open();

		oModel.read("/UserSet(IdUser='" + uid + "',Password='" + pasw + "')", {
			success: function(oCompleteEntry) {
				MessageToast.show("Login Successful! Welcome: " + uid + ".", {

					animationDuration: 5000

				});
				if (oCompleteEntry.Role === true) {

					route.navTo("aDashboard");

				} else if (oCompleteEntry.Role === false) {

					route.navTo("uDashboard", {

						userID: uid

					});

				}

			},
			error: function(oError) {
				MessageToast.show("Invalid credentials!");

			}

		});

	},
	// 	var oModel = new sap.ui.model.odata.v2.ODataModel({
	// 		serviceUrl: "http://services.odata.org/Northwind/Northwind.svc",
	// 		metadataUrlParams: {
	// 			ID_USER: "{uid}",
	// 			PASSWORD: "{pasw}"
	// 		}
	// 	});
	// 

	changePass: function() {
		oView = this.getView();
		sap.ui.getCore().byId('Dialog1').open();

	}

	// Cancel: function() {

	// 	sap.ui.getCore().byId('Dialog1').close();

	// }
});

});