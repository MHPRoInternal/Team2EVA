sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/m/Input',
	'sap/m/Label',
	'sap/m/Select',
	'sap/m/Button',
	'sap/m/MessageToast'
], function(BaseController, MessageToast, Button, Select, Label) {
	"use strict";

	var eID = null;
	var QAstructList = [];

	return BaseController.extend("eventManagementEVA.controller.createEvent", {

		onInit: function() {
			this.getRouter().getRoute("createEvent").attachMatched(this.onRouteMatched, this);
			this._oPnl = this.byId("idPnl");

		},
		onRouteMatched: function(oEvent) {
			eID = oEvent.getParameter("arguments").eventID;
			//id_event sau IdEvent
			console.log("S-a transmis event ID-ul : " + eID);

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

		addQuestionPress: function() {

			var QAstruct = {
				question_text: "",
				answer_text: []
			};
			
//for each la fiecare getitems() folosim stuff din sapui5

			var pnlDom = this._oPnl.getDomRef();
			$(pnlDom).find('input').each(function(index, elem) {
				if (index === 0) {
					QAstruct.question_text = $(elem)[0].value;
					//oModel.create("/Question" );
				} else {
					QAstruct.answer_text.push($(elem)[0].value);
				}
			});
			QAstructList.push(QAstruct);

//bagam chestii in items-ul Select-ului prin createEntry().

			var oView = this.getView();
			var oModel = oView.getModel();
			var oLabel = new sap.m.Label({
				text: QAstruct.question_text
			});
			
			var oSelect = new sap.m.Select({
				forceSelection: true,
				items: QAstruct.answer_text
			});
			
			// foreach(items in oSelect) {
			// 	oSelect.addItem(answer_text);
			// };

			oSelect.addItem(QAstruct.answer_text);
			var delIcon = new sap.ui.core.Icon({
				src: "sap-icon://delete",
				press: this.onDeleteQuestion
			});
			
			var _oCcLayout = new sap.m.FlexBox({
				alignItems: "Center",
				justifyContent: "Start",
				items: [oLabel, oSelect]
			});
			this._oPnl.addContent(_oCcLayout);

		}, //end of AddQuestion

		onDeleteCcMail: function(oEvent) {
			var rowItemContainer = oEvent.getSource().getParent();
			rowItemContainer.destroy();
		},

		onDeleteQuestion: function(oEvent) {
			var rowItemContainer = oEvent.getSource().getParent();
			rowItemContainer.destroy();
		},

		onCreate: function(oEvent) {

			var oView = this.getView();
			var oModel = oView.getModel();

			var title = this.getView().byId("Title").getValue();
			var location = this.getView().byId("Location").getValue();
			var latitude = this.getView().byId("Latitude").getValue();
			var longitude = this.getView().byId("Longitude").getValue();
			var date = this.getView().byId("Date").getValue();
			var time = this.getView().byId("Time").getValue();
			console.log(time);
			var dressCode = this.getView().byId("Dresscode").getValue();
			var picture = this.getView().byId("Picture").getValue();

			var oData = {
				Title: title,
				Location: location,
				Latitude: latitude,
				Longitude: longitude,
				Data: date,
				Time: time,
				Dresscode: dressCode,
				Picture: picture
			};

			var route = this.getRouter();
			oModel.setUseBatch("true");
			oModel.create("/EventSet", oData, {
				success: function(oCompletedEntry) {
					console.log("Event ID-ul este: " + oCompletedEntry.IdEvent);
					QAstructList.forEach(function(item) {
						var oQuestionData = {
							IdEvent: oCompletedEntry.IdEvent,
							QuestionText: item.question_text
						};

						oModel.create("/QuestionSet", oQuestionData, {
							success: function(oCompleteEntry) {
								item.answer_text.forEach(function(answer) {
									var oAnswerData = {
										IdQuestion: oCompleteEntry.IdQuestion,
										AnswerText: answer
									};

									oModel.create("/PAnswerSet", oAnswerData, {
										success: function(oCompletEntry) {
											MessageToast.show("Event has been created successfully.");

										},
										error: function(oError) {
											console.log("There has been an error creating the event! Please try again.")
										}
									});
								});
							},
							error: function(oError) {
								console.log("There has been an error creating the event! Please try again.")
							}
						});
					});
				},
				error: function(oError) {
					console.log("There has been an error creating the event! Please try again.")
				}
			});
		}

	});

});