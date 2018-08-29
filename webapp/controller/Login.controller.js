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
			this.viewID = this.getView().getId();
			console.log("This view id is: " + this.viewID);
			this.oView = this.getView();
		},
		
		onLoginTap: function(oEvent) {
			var oView = this.getView();
			this.oModel = this.oView.getModel();
			this.uid = this.oView.byId("uid").getValue();
			this.pasw = this.oView.byId("pasw").getValue();
			this.route = this.getRouter();
			//var oListItem = oEvent.getSource();
			// var oBindingContext = oListItem.getBindingContext();
			// var userId = oBindingContext.getObject().IdUser;
			// var loginSuccess = "Login Successful! Welcome, " + uid + ".";
			this.oModel.read("/UserSet(IdUser='" + this.uid + "')", {
				success: function(oCompleteEntry) {
					console.log("User role is: " + oCompleteEntry.Role);
					var userRole = oCompleteEntry.Role;
					var adminEmail = oCompleteEntry.Mail;
					var usersName = oCompleteEntry.Name;
					
					console.log("Admin name is: " + oCompleteEntry.Name);
					if (oCompleteEntry.Password === this.pasw) {
						MessageToast.show(oView.getModel("i18n").getResourceBundle().getText("LoginSuccessMessage") + " " + this.uid + ".", {
							animationDuration: 5000
						});

						// var oUserModel = oThis.getOwnerComponent().getModel("userModel");
						// oUserModel.setProperty("/IdUser", oCompleteEntry.IdUser);
						// oUserModel.setProperty("/Password", oCompleteEntry.Password);
						this.route.navTo("EventDashboard", {
							userID: this.uid,
							uRole: userRole,
							adminEmailAddress: adminEmail,
							nameUser: usersName
							
						});
					} else {
						MessageToast.show(oView.getModel("i18n").getResourceBundle().getText("LoginFailedPassword"));
					}
				}.bind(this),
				error: function(oError) {
					MessageToast.show(oView.getModel("i18n").getResourceBundle().getText("LoginFailedMessage"));
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
			var oView = this.getView();
			var oDialog = new sap.m.Dialog("Dialog1", {
				title: oView.getModel("i18n").getResourceBundle().getText("DialogTitle"),
				type: "Message",
				modal: true,
				contentWidth: "5rem",
				content: [new sap.m.Label({
						text: oView.getModel("i18n").getResourceBundle().getText("DialogUserName")
					}),
					new sap.m.Input({
						maxLength: 20, 
						id: "userName"
					}),
					new sap.m.Label({
						text: oView.getModel("i18n").getResourceBundle().getText("DialogPassword")
					}),
					new sap.m.Input({
						maxLength: 20,
						type: "Password",
						id: "oldPass"
					}),
					new sap.m.Label({
						text: oView.getModel("i18n").getResourceBundle().getText("DialogNewPassword")
					}),
					new sap.m.Input({
						maxLength: 20,
						type: "Password",
						id: "newPass"
					}),
					new sap.m.Label({
						text: oView.getModel("i18n").getResourceBundle().getText("DialogConfirmPassword")
					}),
					new sap.m.Input({
						maxLength: 20,
						type: 'Password',
						id: "newPassConfirm",
						liveChange: function(oEvent) {
							var parent = oEvent.getSource().getParent();
							parent.getBeginButton().setEnabled(true);
						}
					})
				],

				beginButton: new Button({

					text: "Submit changes",
					enabled: false,
					press: function(oEvent) {
						console.log("Merge1!");
						
						this.view = sap.ui.getCore().byId(this.viewID);
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
											success: function(oCompletedEntry) {
												oDialog.close();
												MessageToast.show(oView.getModel("i18n").getResourceBundle().getText("ChangePasswordSucces") + userName + "!", {
													animationDuration: 6000
												});
												console.log("SUCCESS?");
											},
											error: function(oError) {
												MessageToast.show(oView.getModel("i18n").getResourceBundle().getText("ChangePasswordFailed"), {
													animationDuration: 6000
												});
												console.log("ERROR?");
											}
										});
									}
								} else {
									MessageToast.show(oView.getModel("i18n").getResourceBundle().getText("WrongPasswordDialog"), {
													animationDuration: 6000
												});
								}
							}.bind(this),
							error: function(oError) {
								MessageToast.show(oView.getModel("i18n").getResourceBundle().getText("WrongPasswordMatchDialog"), {
													animationDuration: 6000
												});
								console.log("ERROR?");
							}
						});
					}.bind(this)
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function() {
						oDialog.close();
					}
				}),
				afterClose: function() {
					oDialog.destroy();
				}
			});
			sap.ui.getCore().byId('Dialog1').open();
		}
	});

});