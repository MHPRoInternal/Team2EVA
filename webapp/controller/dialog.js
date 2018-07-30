var oPage = new sap.m.Page({

                    title: 'Players Details',

             });

             var oButton1 = new sap.m.Button('Submit', {

                    text: 'New Entry',

                    tap: [ oController.NewEntry, oController ]

             });
    var oButton2 = new sap.m.Button('', {

                    text: 'Save',

                   tap: [ oController.Save, oController ]

             });

             var oButton3 = new sap.m.Button('Cancel', {

                    text: Cancel,

                    tap: [ oController.Cancel, oController ]

             });

             var oDialog = new sap.m.Dialog('Dialog1',{

                    title:'Details ofNew Entry',

                    modal: true,

                    contentWidth:'1em',

                    buttons: [ oButton2, oButton3 ],

             content:[

                      new sap.m.Label({text:'First name'}),

                      new sap.m.Input({

                    maxLength: 20,

                    id: 'FName'

                      }),

                      new sap.m.Label({text:'LastName'}),

                      new sap.m.Input({

                   maxLength: 20,

                     id: 'LName'

                       }),

                      new sap.m.Label({text:'Age'}),

                      new sap.m.Input({

                   maxLength: 3,

                   id: 'Age' 

                    }),

                      ]

             });

             var oTable = new sap.m.Table({

                    id: 'Players',

                    columns: [

                    new sap.m.Column({

                           width: '1em',

                           header: new sap.m.Label({

                           text: 'First Names'

                           })

                    }),new sap.m.Column({

                           width: '1em',

                           header: new sap.m.Label({

                           text:'Last Name'

                           })

                    }),new sap.m.Column({

                           width: 'cx',

                           header: new sap.m.Label({

                            text: 'Age'

                           })

                    })

                    ]

             });

             oPage.addContent(oButton1);

             oPage.addContent(oTable);

             return oPage;