sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/m/Input',
	'sap/m/Label',
	'sap/m/Select',
	'sap/m/Button',
	'sap/m/MessageToast',
	'sap/ui/unified/FileUploader',
	'sap/ui/unified/FileUploaderParameter',
	"sap/m/UploadCollection"
], function(BaseController, MessageToast, Button, Select, Label) {

	"use strict";

	var eID = null;
	var QAstructList = [];
	var countAnswers = 3;
	var markers = [];
	var counterStruct = 0;
	var oUploadCollection = null;
	var mailList = "";

	return BaseController.extend("eventManagementEVA.controller.createEvent", {

		onInit: function() {
			this.getRouter().getRoute("createEvent").attachMatched(this.onRouteMatched, this);
			countAnswers = 3;
			this.getView().byId("map_canvas").addStyleClass("myMap");
			oUploadCollection = this.byId("UploadCollection");
			this._oPnl = this.byId("idPnl");
			this.selectPanel = this.byId("qDisplayPanel");
		},
		onRouteMatched: function(oEvent) {
			var oView = this.getView();
			//sap.ui.getCore().getModel().refreshSecurityToken();
			// oFileUploader = new sap.ui.unified.FileUploader({
			//         uploadUrl : "/EventSet('"+ eID +"')/toPicture",
			//         name: "simpleUploader",
			//         uploadOnChange: false,
			//         sendXHR: true,
			//         useMultipart: false,
			//         headerParameters: [
			//             new sap.ui.unified.FileUploaderParameter({name: "x-csrf-token", value: oView.getModel().getHeaders()['x-csrf-token'] })   
			//         ],
			//         uploadComplete: function (oEvent) {
			//             var sResponse = oEvent.getParameter("response");
			//             if (sResponse) {
			//                 oUploadDialog.close();
			//                 sap.ui.commons.MessageBox.show("Return Code: " + sResponse, "Response", "Response");
			//             }
			//         }                   
			//     });
		},

		onSelect: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			// var bState = oEvent.getSource().getState();
			// var selectBox = oView.byId("mailTxtArea");

			mailList = oView.byId("mailTxtArea").getValue();
			oModel.read("/UserSet", {
				success: function(oCompletedEntry) {
					oCompletedEntry.results.forEach(function(item) {
						mailList += item.Mail + "; ";
					});

					oView.byId("mailTxtArea").setValue(mailList);
				},
				error: function(oError) {

				}
			});
			// if(bState === true){
			// 	selectBox = 
			// }
		},

		addInput: function() {
			var oView = this.getView();
			var oInput1 = new sap.m.Input(oView.createId("inputId" + countAnswers));
			oInput1.setWidth("15.5em");

			var delIcon = new sap.ui.core.Icon({
				src: "sap-icon://delete",
				press: this.onDeleteInput
			});
			var _oCcLayout = new sap.m.FlexBox({
				id: oView.createId("flexBox" + countAnswers),
				alignItems: "Center",
				justifyContent: "Start",
				items: [oInput1, delIcon]
			});
			this._oPnl.addContent(_oCcLayout);
			countAnswers += 1;
		},

		addQuestionPress: function() {

			var oView = this.getView();
			var oModel = oView.getModel();
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
					var k = oView.byId("inputId" + i).getValue();
					console.log(k);
					if (i === 0) {
						QAstruct.QAstructId = counterStruct;
						QAstruct.question_text = oView.byId("inputId" + i).getValue();
						//oModel.create("/Question" );
					} else {
						QAstruct.answer_text.push(oView.byId("inputId" + i).getValue());
					}
				}
			}
			QAstructList.push(QAstruct);
			counterStruct++;
			//this deletes stuff
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

			//bagam chestii in items-ul Select-ului prin createEntry().

			var oLabel = new sap.m.Label({
				text: QAstruct.question_text
			});

			var oSelect = new sap.m.Select({
				forceSelection: true
					// items: QAstruct.answer_text
			});

			QAstruct.answer_text.forEach(function(item) {
				var newItem = new sap.ui.core.Item({
					key: item,
					text: item
				});
				console.log(item);
				oSelect.addItem(newItem);
			});

			//oSelect.addItem(QAstruct.answer_text);

			var delIcon = new sap.ui.core.Icon({
				id: "Del" + counterStruct,
				src: "sap-icon://delete",
				press: this.onDeleteQuestion
			});

			var _oCcLayout = new sap.m.FlexBox({
				alignItems: "Center",
				justifyContent: "Start",
				items: [oLabel, oSelect, delIcon]
			});
			this.selectPanel.addContent(_oCcLayout);
			countAnswers = 3;
		}, //end of AddQuestion

		onDeleteInput: function(oEvent) {
			var rowItemContainer = oEvent.getSource().getParent();
			rowItemContainer.destroy();
		},

		onDeleteQuestion: function(oEvent) {
			var rowItemContainer = oEvent.getSource().getParent();
			console.log(oEvent.getSource());
			var questionId = oEvent.getSource().getId().substring(3);
			var removeIndex = null;
			QAstructList.forEach(function(index, QAstruct) {
				if (QAstruct.QAstructId === questionId) {
					removeIndex = index;
				}
			});
			QAstructList.splice(removeIndex, 1);
			console.log(questionId);
			rowItemContainer.destroy();

		},

		onAfterRendering: function() {
			if (!this.initialized) {
				this.initialized = true;
				this.geocoder = new google.maps.Geocoder();
				var mapOptions = {
					center: new google.maps.LatLng(46.7649352, 23.606376100000034),
					zoom: 13,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				this.map = new google.maps.Map(this.getView().byId("map_canvas").getDomRef(),
					mapOptions);
			}
		},
		actSearch: function() {

			var oView = this.getView();
			var latitude;
			var longitude;
			var map = this.map;
			var address = this.getView().byId("Location").getValue();
			markers.forEach(function(marker) {
				marker.setMap(null);
			});
			markers = [];
			this.geocoder.geocode({
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
			var mailListString = oView.byId("mailTxtArea").getValue();
			var title = oView.byId("Title").getValue();
			var location = oView.byId("Location").getValue();
			var latitude = oView.byId("Latitude").getValue();
			var longitude = oView.byId("Longitude").getValue();
			var date = oView.byId("Date").getValue();
			var time = oView.byId("Time").getValue();
			console.log(time);
			var dressCode = oView.byId("Dresscode").getValue();

			var oData = {
				Title: title,
				Location: location,
				Latitude: latitude,
				Longitude: longitude,
				Data: date,
				Time: time,
				Dresscode: dressCode,
				Mails: mailListString
			};

			var route = this.getRouter();
			oModel.create("/EventSet", oData, {
				success: function(oCompletedEntry) {
					eID = oCompletedEntry.IdEvent;
					//oFileUploader = oView.byId("oFileUploader");
					oUploadCollection.setUploadUrl("/EventSet('" + eID + "')/toPicture");
					console.log("Upload URL-ul este: " + oUploadCollection.getUploadUrl());
					oUploadCollection.upload();
					// oFileUploader.setSendXHR(true);
					// oFileUploader.setUploadOnChange(false);
					// oFileUploader.setUseMultipart(false);
					//oFileUploader.setUploadUrl("/EventSet('" + eID + "')/toPicture");
					// console.log(oFileUploader.getValue());
					// oModel.setTokenHandlingEnabled(true);
					// oModel.refreshSecurityToken(function() {
					// 	var token = oModel.getSecurityToken();
					// 	console.log(token);
					// 	oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "x-csrf-token", value: token }));
					// 	oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({
					// 		name: "slug",
					// 		value: oFileUploader.getValue()
					// 	}));

					//oFileUploader.upload();
					// can upload the file if token reset
					// });

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
											new sap.m.MessageToast.show("Event created successfully!");

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

					//var mailList = mailListString.split(', ');
					counterStruct = 0;
					var inviteText = oView.getModel("i18n").getResourceBundle().getText("appLinkInvite");
					sap.m.URLHelper.triggerEmail(mailListString, "New MHP event invitation!", inviteText);
				},
				error: function(oError) {
					console.log("There has been an error creating the event! Please try again.")
				}
			});
		},
		onChange: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			oUploadCollection = oEvent.getSource();
			var token = oModel.getSecurityToken();
			// Header Token
			var oCustomerHeaderToken = new sap.m.UploadCollectionParameter({
				name: "x-csrf-token",
				value: token
			});
			oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
			new	sap.m.MessageToast.show("Event change triggered");
		},

		// onFileDeleted: function(oEvent) {
		// 	MessageToast.show("Event fileDeleted triggered");
		// },

		// onFilenameLengthExceed: function(oEvent) {
		// 	MessageToast.show("Event filenameLengthExceed triggered");
		// },

		// onFileSizeExceed: function(oEvent) {
		// 	MessageToast.show("Event fileSizeExceed triggered");
		// },

		// onTypeMissmatch: function(oEvent) {
		// 	MessageToast.show("Event typeMissmatch triggered");
		// },

		onBeforeUploadStarts: function(oEvent) {
			// Header Slug
			var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter({
				name: "slug",
				value: oEvent.getParameter("fileName")
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
			setTimeout(function() {
			new	sap.m.MessageToast.show("Event beforeUploadStarts triggered");
			}, 4000);
		},

		onUploadComplete: function(oEvent) {
			var sUploadedFileName = oEvent.getParameter("files")[0].fileName;
			setTimeout(function() {

				for (var i = 0; i < oUploadCollection.getItems().length; i++) {
					if (oUploadCollection.getItems()[i].getFileName() === sUploadedFileName) {
						oUploadCollection.removeItem(oUploadCollection.getItems()[i]);
						break;
					}
				}

				// delay the success message in order to see other messages before
				new	sap.m.MessageToast.show("Event uploadComplete triggered");
			}.bind(this), 8000);
		},

		onSelectChange: function(oEvent) {
			oUploadCollection.setShowSeparators(oEvent.getParameters().selectedItem.getProperty("key"));
		}
	});

});