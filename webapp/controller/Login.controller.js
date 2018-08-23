sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Popup',
	'sap/ui/core/Element',
	'sap/m/Button',
	'sap/m/MessageToast'

], function(BaseController, Popup, Element, Button, MessageToast) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.Login", {

		onInit: function() {
			this.oView = this.getView();
		},
		// onAfterRendering: function(oEvent){
		// 	// var loginButton = this.getView().byId("loginBtn");
			
		// 	// loginButton.getFocusDomRef();
		// 	// loginButton.focus();
		// 	var loginButton = this.getView().byId("loginBtn");
		// 	loginButton.attachBrowserEvent("keydown", function(event) {
		// 		this.onLoginTap();
  //  });
		// },

		// onsapenter: function(oEvent) {
		// 	var loginButton = this.getView().byId("loginBtn");
		// 	loginButton.onkeydown(event);
		// 	if (event.key === 13) {
		// 		this.onLoginTap();
		// 	}

		// },
		onLoginTap: function(oEvent) {

			this.oModel = this.oView.getModel();
			this.uid = this.oView.byId("uid").getValue();
			this.pasw = this.oView.byId("pasw").getValue();
			this.route = this.getRouter();
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

			this.oModel.read("/UserSet(IdUser='" + this.uid + "')", {
				success: function(oCompleteEntry) {
					console.log("User role is: " + oCompleteEntry.Role);
					var userRole = oCompleteEntry.Role;
					var adminEmail = oCompleteEntry.Mail;
					console.log("Admin email is: " + oCompleteEntry.Mail);
					if (oCompleteEntry.Password === this.pasw) {
						MessageToast.show("Login Successful! Welcome: " + this.uid + ".", {

							animationDuration: 5000

						});

						// var oUserModel = oThis.getOwnerComponent().getModel("userModel");
						// oUserModel.setProperty("/IdUser", oCompleteEntry.IdUser);
						// oUserModel.setProperty("/Password", oCompleteEntry.Password);

						this.route.navTo("aDashboard", {

							userID: this.uid,
							uRole: userRole,
							adminEmailAddress: adminEmail
						});

					} else {
						MessageToast.show("Invalid password! Please try again or contact your local administrator.");
					}
				}.bind(this),
				error: function(oError) {
					MessageToast.show("Invalid credentials! Please try again or contact your local administrator.");

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
			
		var submitChangePasswordBtn = new sap.m.Button("Submit", {

		text: "Submit changes",
		press: function(oEvent) {
			console.log("Merge1!");
			this.view = this.getView();
			var userName = sap.ui.getCore().byId("userName").getValue();
			var oldPass = sap.ui.getCore().byId("oldPass").getValue();
			var newPass = sap.ui.getCore().byId("newPass").getValue();
			var newPassConfirm = sap.ui.getCore().byId("newPassConfirm").getValue();
			var oModel = this.view.getModel();
			var oData = {
				IdUser: userName,
				Password: newPass
			};
			oModel.read("/UserSet(IdUser='" + userName + "')", {
				success: function(oCompleteEntry) {
					if (oCompleteEntry.Password === oldPass) {
						if (newPass === newPassConfirm) {
							console.log("Merge2!");
							oModel.update("/UserSet(IdUser='" + userName + "')", oData, {
								success: function() {
									sap.ui.getCore().byId('Dialog1').close();
									sap.ui.getCore().byId("userName").setValue();
									sap.ui.getCore().byId("oldPass").setValue();
									sap.ui.getCore().byId("newPass").setValue();
									sap.ui.getCore().byId("newPassConfirm").setValue();
									MessageToast.show("Password change successful for user " + userName + "!", {

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
					} else {
						MessageToast.show("Invalid username or password! Please try again.");
					}

				}.bind(this),
				error: function(oError) {
					MessageToast.show("Invalid username or password! Please try again.");
					console.log("ERROR?");
				}
			});
		}.bind(this)

	});

	var cancelChangePasswordBtn = new sap.m.Button("Cancel", {

		text: 'Cancel',
		press: function() {

			sap.ui.getCore().byId('Dialog1').close();
			sap.ui.getCore().byId("userName").setValue();
			sap.ui.getCore().byId("oldPass").setValue();
			sap.ui.getCore().byId("newPass").setValue();
			sap.ui.getCore().byId("newPassConfirm").setValue();
		}

	});
	var oDialog = new sap.m.Dialog('Dialog1', {

		title: "User password change",

		modal: true,

		contentWidth: "5em",

		buttons: [submitChangePasswordBtn, cancelChangePasswordBtn],

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

				type: "Password",

				id: "newPass"

			}),
			new sap.m.Label({
				text: "Confirm new Password"
			}),

			new sap.m.Input({

				maxLength: 20,

				type: 'Password',

				id: "newPassConfirm"

			})
		]
	});
			
			sap.ui.getCore().byId('Dialog1').open();
		}
	});

});