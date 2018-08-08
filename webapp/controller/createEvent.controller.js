sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/m/Input',
	'sap/m/Button',
	'sap/m/MessageToast'
], function(BaseController, MessageToast, Button) {
	"use strict";

	var eID = null;

	return BaseController.extend("eventManagementEVA.controller.createEvent", {

		onInit: function() {
			this._oPnl = this.byId("idPnl");
			var updateBtn = this.getView().byId("eventUpdate");
			var deleteBtn = this.getView().byId("eventDelete");
			updateBtn.setVisible(false);
			deleteBtn.setVisible(false);
		},

		addInput: function() {
			var oView = this.getView();
			var oModel = oView.getModel();
			var oInput1 = new sap.m.Input();
			var delIcon = new sap.ui.core.Icon({
				src: "sap-icon://delete",
				press: this.onDeleteCcMail
			});
			var _oCcLayout = new sap.m.FlexBox({
				alignItems: "Center",
				justifyContent: "Start",
				items: [oInput1, delIcon]
			});
			this._oPnl.addContent(_oCcLayout);
		},

		onSwitchEditMode: function(oEvent) {
			var bState = oEvent.getSource().getState();
			var oInput = this.getView().byId("Title");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Location");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Latitude");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Longitude");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Date");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Time");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Dresscode");
			oInput.setEditable(bState);
			oInput = this.getView().byId("Picture");
			oInput.setEditable(bState);
		},

		addQuestionPress: function() {

			var qText = "";
			var answer_text = [];

			var pnlDom = this._oPnl.getDomRef();
			$(pnlDom).find('input').each(function(index, elem) {
				if (index === 0) {
					qText = $(elem)[0].value;
					//oModel.create("/Question" );
				} else {
					answer_text.push($(elem)[0].value);
					var QAjson = {
						questionText: qText,
						answerText: answer_text
					};
					console.log(answer_text);
				}
			});

			console.log(values);
		},
		onDeleteCcMail: function(oEvent) {
			var rowItemContainer = oEvent.getSource().getParent();
			rowItemContainer.destroy();
		},

		onUpdatePress: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var title = this.getView().byId("Title").getValue();
			var location = this.getView().byId("Location").getValue();
			var latitude = this.getView().byId("Latitude").getValue();
			var longitude = this.getView().byId("Longitude").getValue();
			//var date = this.getView().byId("Date").getValue();
			//	time = this.getView().byId("Time").getValue();
			var dressCode = this.getView().byId("Dresscode").getValue();
			var picture = this.getView().byId("Picture").getValue();
			var oData = {
				Title: title,
				Location: location,
				Latitude: latitude,
				Longitude: longitude,
				Dresscode: dressCode,
				Picture: picture
			};
			oModel.update("/EventSet(eID)", oData, {
				success: function() {

					MessageToast.show("Update successful for the event with ID: " + eID + "!", {

						animationDuration: 5000

					});
					console.log("SUCCESS?");
				},
				error: function(oError) {
					MessageToast.show("Changes could not be made! Please try again.");
					console.log("ERROR?");
				}
			});
			//var bState = oEvent.getSource().getState();
			var updateBtn = this.getView().byId("eventUpdate");
			var deleteBtn = this.getView().byId("eventDelete");
			var switchBtn = this.getView().byId("switchBtn");
			switchBtn.setState(false);
			updateBtn.setVisible(false);
			deleteBtn.setVisible(false);

			var oInput = this.getView().byId("eTitleInput");
			oInput.setEditable(false);
			oInput = this.getView().byId("eLocationInput");
			oInput.setEditable(false);
			oInput = this.getView().byId("eLatitudeInput");
			oInput.setEditable(false);
			oInput = this.getView().byId("eLongitudeInput");
			oInput.setEditable(false);
			oInput = this.getView().byId("eDataInput");
			oInput.setEditable(false);
			oInput = this.getView().byId("eDresscodeInput");
			oInput.setEditable(false);
			oInput = this.getView().byId("ePictureInput");
			oInput.setEditable(false);

		}

	});

});