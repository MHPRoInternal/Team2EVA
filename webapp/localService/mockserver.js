sap.ui.define([
        "sap/ui/core/util/MockServer"
    ], function (MockServer) {  // eslint-disable-line id-match
        "use strict";
        var oMockServer,
            _sAppModulePath = "eventManagementEVA/",
            _sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

        return {

            /**
             * Initializes the mock server.
             * You can configure the delay with the URL parameter "serverDelay".
             * The local mock data in this folder is returned instead of the real data for testing.
             * @public
             */
            init: function () {
                var oUriParameters = jQuery.sap.getUriParameters(),
                    sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),

                    // sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
                    sEntity = "SOHeaders",

                    sErrorParam = oUriParameters.get("errorType"),
                    iErrorCode = sErrorParam === "badRequest" ? 400 : 500,

                    // oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
                    oMainDataSource = "http://bcsw-sap078.mymhp.net:8000/sap/opu/odata/sap/ZINTERNSHIP_2018_SRV",
                    sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + "localService/metadata.xml".replace(".xml", ""), ".xml"),

                    // ensure there is a trailing slash
                    sMockServerUrl = /.*\/$/.test(oMainDataSource) ? oMainDataSource : oMainDataSource + "/";



                oMockServer = new MockServer({
                    rootUri: sMockServerUrl
                });

                // configure mock server with a delay of 1s
                MockServer.config({
                    autoRespond: true,
                    autoRespondAfter: (oUriParameters.get("serverDelay") || 1000)
                });

                // load local mock data

                oMockServer.simulate(sMetadataUrl, {
                    sMockdataBaseUrl: sJsonFilesUrl,
                    bGenerateMissingMockData: true
                });
                // add function imports
                var aRequests = oMockServer.getRequests();

                oMockServer.setRequests(aRequests);


                oMockServer.start();

                jQuery.sap.log.info("Running the app with mock data");


            },

            /**
             * @public returns the mockserver of the app, should be used in integration tests
             * @returns {sap.ui.core.util.MockServer} the mockserver instance
             */
            getMockServer: function () {
                return oMockServer;
            }


        };

    }
);