sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Popup',
	'sap/m/Button',
	'sap/m/MessageToast'
], function(BaseController) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.createEvent", {
		
		onCreateTap: function(){
		var userName = sap.ui.getCore().byId("userName").getValue();
				var oldPass = sap.ui.getCore().byId("oldPass").getValue();
				var newPass = sap.ui.getCore().byId("newPass").getValue();
				var newPassConfirm = sap.ui.getCore().byId("newPassConfirm").getValue();
				var oModel = oView.getModel();
				var oData = {
					IdUser : userName
				}
					oModel.read("/UserSet(IdUser='" + userName + "',Password='" + oldPass + "',)", {
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
		
		
	});

