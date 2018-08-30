sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/m/Input',
	'sap/m/Label',
	'sap/m/Select',
	'sap/m/Button',
	'sap/m/MessageToast',
	'sap/ui/unified/FileUploader',
	'sap/ui/unified/FileUploaderParameter'
], function(BaseController, Input, Label, Select, Button, MessageToast, FileUploaderParameter) {
	"use strict";

	var QAstructList = [];
	var countAnswers = 3;
	var markers = [];
	var counterStruct = 0;

	return BaseController.extend("eventManagementEVA.controller.EventCreate", {

		onInit: function() {
			this.getRouter().getRoute("EventCreate").attachMatched(this._onRouteMatched, this);
			this.oView = this.getView();
		},

		onBeforeRendering: function(oEvent) {

		},

		onAfterRendering: function(oEvent) {
			var oView = this.getView();

			var latLng = new google.maps.LatLng(46.7649352, 23.606376100000034);
			var mapOptions = {
				center: latLng,
				zoom: 13,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			this.map = new google.maps.Map(oView.byId("map_canvas").getDomRef(),
				mapOptions);
		},

		onSelect: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			if (oView.byId("mailsCheckBox").getSelected() === true) {
				var oEventCreateModel = this.getView().getModel("eventModel");
				oEventCreateModel.setProperty("/Mails", "");

				var mailList = oEventCreateModel.getProperty("/Mails");
				oModel.read("/UserSet", {
					success: function(oCompletedEntry) {
						oCompletedEntry.results.forEach(function(item) {
							mailList += item.Mail + "; " + "\n";
						});

						oEventCreateModel.setProperty("/Mails", mailList);
					}.bind(this),
					error: function(oError) {

					}
				});
			} else {
				oView.byId("mailTxtArea").setValue();
			}
		},

		addInput: function() {
			var oView = this.getView();
			// var oInput1 = new sap.m.Input(oView.createId("inputId" + countAnswers));
			var oInput1 = new sap.m.Input(oView.createId("inputId" + countAnswers), {
				placeholder: "Question option..."
			});
			oInput1.setWidth("20rem");

			var delIcon = new sap.ui.core.Icon({
				src: "sap-icon://delete",
				press: this.onDeleteInput
			});
			var inputLayout = new sap.m.FlexBox({
				id: oView.createId("flexBox" + countAnswers),
				alignItems: "Center",
				justifyContent: "Start",
				items: [oInput1, delIcon]
			});
			this._oPnl.addContent(inputLayout);
			countAnswers += 1;

			oView.byId("eventCreateForm").getContents();
		},

		addQuestionPress: function() {

			var oView = this.getView();
			var QAstruct = {
				question_text: "",
				answer_text: [],
				QAstructId: 0
			};

			//for each la fiecare getitems() folosim stuff din sapui5
			console.log(countAnswers);
			var i = 0;
			for (i = 0; i < countAnswers; i++) {
				if (oView.byId("inputId" + i)) {
					if ((oView.byId("inputId" + i).getValue()) !== null && (oView.byId("inputId" + i).getValue()) !== "") {

						var k = oView.byId("inputId" + i).getValue();
						console.log(k);
						if (i === 0) {
							QAstruct.QAstructId = counterStruct;
							QAstruct.question_text = oView.byId("inputId" + i).getValue();

						} else {
							QAstruct.answer_text.push(oView.byId("inputId" + i).getValue());

						}
					} else {
						oView.byId("inputId" + i).setValueState(sap.ui.core.ValueState.Error);
						oView.byId("inputId" + i).setValueStateText("Input is required!");

						return;
					}
				}
			}
			QAstructList.push(QAstruct);

			//this deletes question input values
			for (i = 0; i < countAnswers; i++) {
				if (oView.byId("inputId" + i)) {
					if (i === 0) {
						oView.byId("inputId" + i).setValue();
						//oModel.create("/Question" );
					} else {
						oView.byId("inputId" + i).setValue();
						if (i >= 3) {
							oView.byId("flexBox" + i).destroy();
						}
					}
				}
			}
			//end of deleting values of inputs
			var oLabel = new sap.m.Label({
				text: QAstruct.question_text
			});
			var oSelect = new sap.m.Select({
				forceSelection: true
			});
			QAstruct.answer_text.forEach(function(item) {
				var newItem = new sap.ui.core.Item({
					key: item,
					text: item
				});
				console.log(item);
				oSelect.addItem(newItem);
			});
			var delIcon = new sap.ui.core.Icon({
				id: "Del" + counterStruct,
				src: "sap-icon://delete",
				press: this.onDeleteQuestion
			});
			var QALayout = new sap.m.FlexBox({
				alignItems: "Center",
				justifyContent: "Center",
				items: [oLabel, oSelect, delIcon]
			});
			QALayout.addStyleClass("sapUiSmallMarginBeginEnd");
			this.selectPanel.addItem(QALayout);
			countAnswers = 3;
			counterStruct++;
		}, //end of AddQuestion

		onDeleteInput: function(oEvent) {
			var rowItemContainer = oEvent.getSource().getParent();
			rowItemContainer.destroy();
		},

		onDeleteQuestion: function(oEvent) {
			var rowItemContainer = oEvent.getSource().getParent();
			var questionId = oEvent.getSource().getId().substring(3);
			var removeIndex = null;
			var index = 0;
			QAstructList.forEach(function(QAstruct) {
				if (QAstruct.QAstructId === parseInt(questionId)) {
					removeIndex = index;
				}
				index++;
			});
			if (removeIndex !== null) {
				QAstructList.splice(removeIndex, 1);
				rowItemContainer.destroy();
			}
		},

		changeValueState: function() {
			var formValidate = this.getView().getControlsByFieldGroupId("formInput");
			formValidate.forEach(function(input) {
				if (input.getValue() === "" || input.getValue() === null || input.getValue() === undefined) {
					input.setValueState(sap.ui.core.ValueState.Error);
					input.setValueStateText("Input is required!");
					return;
				} else {
					input.setValueState(sap.ui.core.ValueState.None);
				}
			});
		},

		actSearch: function() {
			var geocoder = new google.maps.Geocoder();
			var oView = this.getView();
			var latitude;
			var longitude;
			var map = this.map;
			var address = this.getView().byId("Location").getValue();
			markers.forEach(function(marker) {
				marker.setMap(null);
			});
			markers = [];
			geocoder.geocode({
				'address': address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
					markers.push(marker);
					latitude = results[0].geometry.location.lat();
					longitude = results[0].geometry.location.lng();
					oView.byId("Latitude").setValue(latitude);
					oView.byId("Longitude").setValue(longitude);
				} else {
					console.log('Geocode was not successful for the following reason: ' + status);
					new sap.m.MessageToast.show("Location could not be found. Please try again.");
				}
			});
		},

		onCreate: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var flag = true;
			var formValidate = this.getView().getControlsByFieldGroupId("formInput");
			var oEventCreateModel = oView.getModel("eventModel");
			var mailList = oEventCreateModel.getProperty("/Mails");

			formValidate.forEach(function(input) {
				if (input.getValue() === "" || input.getValue() === null || input.getValue() === undefined) {
					input.setValueState(sap.ui.core.ValueState.Error);
					input.setValueStateText("Input is required!");
					flag = false;
					MessageToast.show("A required input was left empty!", {
						animationDuration: 1200
					});
				} else {
					input.setValueState(sap.ui.core.ValueState.None);
				}
			});

			if (mailList === "") {
				oView.byId("mailTxtArea").setValueState(sap.ui.core.ValueState.Error);
				MessageToast.show("A required input was left empty!", {
					animationDuration: 1200
				});
				flag = false;
			} else {
				oView.byId("mailTxtArea").setValueState(sap.ui.core.ValueState.None);
			}

			if (flag === true) {

				oEventCreateModel.setProperty("/CreatedBy", this.adminEmail);
				oModel.refreshSecurityToken();
				var modifiedMailList = oEventCreateModel.getProperty("/Mails").replace(/\n/g, "");
				oEventCreateModel.setProperty("/Mails", modifiedMailList);

				oModel.create("/EventSet", oEventCreateModel.getData(), {
					success: function(oCompletedEntry) {
						this.eID = oCompletedEntry.IdEvent;
						var oFileUploader = oView.byId("oFileUploader");
						oFileUploader.setUploadOnChange(false);
						oFileUploader.setUseMultipart(false);
						oModel.refreshSecurityToken();
						oFileUploader.setSendXHR(true);
						var oHeaders = oModel.oHeaders;
						var sToken = oHeaders['x-csrf-token'];

						oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
							name: "x-csrf-token",
							value: sToken
						}));

						oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({
							name: "slug",
							value: oFileUploader.getValue()
						}));

						oFileUploader.setUploadUrl("/destinations/M38/sap/opu/odata/sap/ZTEAM2_SRV/EventSet('" + this.eID + "')/toPicture");
						oFileUploader.upload();
						this.questionCreate();

						console.log("Event ID-ul este: " + oCompletedEntry.IdEvent);

						//sap.m.URLHelper.triggerEmail(mailListString, "New MHP event invitation!", inviteText);
					}.bind(this),
					error: function(oError) {
						console.log("There has been an error creating the event! Please try again.");
					}
				});
			}
			counterStruct = 0;
		},

		questionCreate: function() {
			var oView = this.getView();
			var oModel = oView.getModel();
			var oQuestionData = "";
			var idEvent = this.eID;

			QAstructList.forEach(function(item) {
				oQuestionData = {
					IdEvent: idEvent,
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
									new sap.m.MessageToast.show("Event created successfully!");
									oModel.setUseBatch("false");

								},
								error: function(oError) {
									console.log("There has been an error creating the event! Please try again.");
								}
							});
						});
						//BaseController.prototype.onNavBack();
						//oView.reset();
						QAstructList = [];

					},

					error: function(oError) {
						console.log("There has been an error creating the event! Please try again.");
					}
				});
			});
		},

		showBusyIndicator: function(iDuration, iDelay) {
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

		hideBusyIndicator: function() {
			sap.ui.core.BusyIndicator.hide();
		},

		onNavBackFromCreateEvent: function() {

			this.viewID = this.getView().getId();
			var oView = sap.ui.getCore().byId(this.viewID);
			var oModel = oView.getModel();
			var selectPanel = oView.byId("selectDisplay");
			selectPanel.destroyItems();
			oModel.refresh(true);
			oView.byId("mailTxtArea").setValue();
			this.getRouter().navTo("EventDashboard", {
				userID: this.uID,
				uRole: this.userRole,
				adminEmailAddress: this.adminEmail,
				nameUser: this.usersName
			});
		},

		cancelEvent: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			oModel.refresh(true);
			var oEventCreateModel = oView.getModel("eventModel");
			oEventCreateModel.refresh(true);
			this.selectPanel.destroyItems();
			oView.byId("mailTxtArea").setValue();
		},

		_onRouteMatched: function(oEvent) {

			var oView = this.getView();
			this.adminEmail = oEvent.getParameter("arguments").adminEmailAddress;
			this.usersName = oEvent.getParameter("arguments").nameUser;
			this.userRole = oEvent.getParameter("arguments").uRole;
			this.uID = oEvent.getParameter("arguments").userID;
			console.log("Email pentru admin este: " + this.adminEmail);
			this.getView().byId("nameLabel").setText(this.usersName);

			countAnswers = 3;

			this._oPnl = this.byId("idPnl");
			this.selectPanel = this.byId("selectDisplay");
			this.byId("Date").setMinDate(new Date());

			var oEventCreateModel = new sap.ui.model.json.JSONModel({
				Title: "",
				Location: "",
				Latitude: "",
				Longitude: "",
				Data: "",
				Time: "",
				Dresscode: "",
				Mails: "",
				CreatedBy: ""
			});
			oEventCreateModel.setDefaultBindingMode("TwoWay");
			oView.setModel(oEventCreateModel, "eventModel");
			//this.createMap();
			//this.onAfterRendering();

		}

	});

});