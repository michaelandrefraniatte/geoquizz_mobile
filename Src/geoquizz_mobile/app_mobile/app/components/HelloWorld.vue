<template>
    <Page class="page" loaded="pageLoaded">
        <ActionBar title="GeoQuizz Photographe" class="action-bar" />
        <StackLayout>
            <Button :text="textTakePicture" class="btn btn-primary" marginTop="20"
                @tap="takePicture"></Button>
            <Button :text="textSendPicture" class="btn btn-primary" marginTop="0"
                @tap="sendPicture($event)"></Button>
            <TextField v-model="description" />
            <Image :src="pictureFromCamera"></Image>
        </StackLayout>
    </Page>
</template>

<script>
    import VueRx from "../vue-rx";
    import Vue from "nativescript-vue";
    import * as camera from "../nativescript-camera";
    import * as http from "http";
    const app = require("tns-core-modules/application");
    const platform = require("platform");
    const fs = require("file-system");
    const imagePicker = require("nativescript-imagepicker");
    const rxjs = require("rxjs");
    const operators = require("rxjs/operators");
    const bgHttp = require("nativescript-background-http");
    Vue.use(VueRx);
    Vue.config.silent = false;
    var options = {
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: true
    };
    import {
        request,
        getFile,
        getImage,
        getJSON,
        getString
    } from "tns-core-modules/http";
    const geolocation = require("nativescript-geolocation");
    const {
        Accuracy
    } = require("tns-core-modules/ui/enums");
    import ModalComponent from "./ModalComponent";
    export default {
        data() {
            return {
                pictureFromCamera: null,
                textTakePicture: "Photographier",
                textSendPicture: "Envoyer la photo",
                lat: "",
                lon: "",
                speed: "",
                addr: "",
                session: bgHttp.session("image-upload"),
                currentFileNameBeingUploaded: "",
                description: "Description...",
                urlngrok: "http://cf8149b9.ngrok.io"
            };
        },
        subscriptions() {
            this.event$ = new rxjs.BehaviorSubject({});
            return {
                event: this.event$,
                eventLog: this.event$.pipe(
                    operators.sampleTime(200),
                    operators.concatMap(value => rxjs.of(value)),
                    operators.scan((acc, logEntry) => {
                        acc.push(logEntry);
                        return acc;
                    }, []), // emit only logs for the this.currentFileNameBeingUploaded
                    operators.map(allLogs =>
                        allLogs.filter(
                            logEntry =>
                            !!logEntry &&
                            logEntry.eventTitle &&
                            logEntry.eventTitle.indexOf(
                                this.currentFileNameBeingUploaded
                            ) > 0
                        )
                    )
                )
            };
        },
        methods: {
            takePicture() {
                // See the options at https://github.com/NativeScript/nativescript-camera#using-the-options-to-take-memory-efficient-picture
                // for more information on how to customize the pictures you take.
                camera
                    .takePicture(options)
                    .then(imageAsset => {
                        this.pictureFromCamera = imageAsset;
                    })
                    .catch(err => {
                        console.log("Error -> " + err.message);
                    });
            },
            postRequest() {
                request({
                    url: this.urlngrok + "/geolocalisation/",
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    content: JSON.stringify({
                        latitude: this.lat,
                        longitude: this.lon,
                        description: this.description
                    })
                }).then(
                    response => {
                        const result = response.content.toJSON();
                    },
                    e => {}
                );
            },
            getGeolocalisation() {
                geolocation
                    .getCurrentLocation({
                        desiredAccuracy: Accuracy.high,
                        maximumAge: 5000,
                        timeout: 20000
                    })
                    .then(res => {
                        this.lat = res.latitude;
                        this.lon = res.longitude;
                        this.speed = res.speed;
                        // get the address (REQUIRES YOUR OWN GOOGLE MAP API KEY!)
                        fetch(
                                "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                                res.latitude +
                                "," +
                                res.longitude +
                                "&key=AIzaSyDwxfea8ecYMmGKMO39JF1ko5bhF4UocpM"
                            )
                            .then(response => response.json())
                            .then(r => {
                                this.addr = r.results[0].formatted_address;
                            });
                    });
            },
            sendPicture() {
                /* 
                                        this.showModal();
                                        let context = imagePicker.create({
                                            mode: "single"
                                        });
                                        this.startSelection(context);
                                        */

                if (this.pictureFromCamera != null) {
                    let pathofpicturefromcamera = null;
                    if (platform.isIOS) {
                        pathofpicturefromcamera = this.pictureFromCamera.ios;
                    } else {
                        pathofpicturefromcamera = this.pictureFromCamera.android;
                    }
                    this.showModal();
                    this.uploadImage(pathofpicturefromcamera);
                }
            },
            showModal() {
                this.$store.commit("closingModal");
                this.$showModal(ModalComponent);
            },
            closeModal() {
                this.$store.commit("closingModal");
            },
            startSelection(context) {
                context
                    .authorize()
                    .then(() => {
                        return context.present();
                    })
                    .then(selection => {
                        this.showWelcome = false;
                        let imageAsset = selection.length > 0 ? selection[
                            0] : null;
                        if (imageAsset) {
                            this.getImageFilePath(imageAsset).then(path => {
                                console.log(
                                    `
            path: $ {
                path
            }
            `
                                );
                                this.uploadImage(path);
                            });
                        }
                    })
                    .catch(function(e) {
                        console.log(e);
                    });
            },
            uploadImage(path) {
                let file = fs.File.fromPath(path);
                this.currentFileNameBeingUploaded = file.path.substr(
                    file.path.lastIndexOf("/") + 1
                );
                let request = this.createNewRequest();
                request.description = "uploading image " + file.path;
                request.headers["File-Name"] = this.currentFileNameBeingUploaded;
                var params = [{
                        name: "test",
                        value: "value"
                    },
                    {
                        name: "fileToUpload",
                        filename: file.path,
                        mimeType: "image/jpeg"
                    }
                ];
                var task = this.session.multipartUpload(params, request);
                task.on("progress", this.onEvent.bind(this));
                task.on("error", this.onEvent.bind(this));
                task.on("responded", this.onEvent.bind(this));
                task.on("complete", this.onEvent.bind(this));
            },
            createNewRequest() {
                let url;
                // NOTE: using https://httpbin.org/post for testing purposes,
                // you'll need to use your own service in real - world app
                if (platform.isIOS) {
                    url = this.urlngrok + "/photo";
                } else {
                    url = this.urlngrok + "/photo";
                }
                //"https://httpbin.org/post"
                //"http://www.csm-testcenter.org/test"
                let request = {
                    url: url,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream"
                    },
                    description: "uploading file...",
                    androidAutoDeleteAfterUpload: false,
                    androidNotificationTitle: "NativeScript HTTP background"
                };
                return request;
            },
            getImageFilePath(imageAsset) {
                return new Promise(resolve => {
                    if (platform.isIOS) {
                        const options = PHImageRequestOptions.new();
                        options.synchronous = true;
                        options.version =
                            PHImageRequestOptionsVersion.Current;
                        options.deliveryMode =
                            PHImageRequestOptionsDeliveryMode.HighQualityFormat;
                        PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(
                            imageAsset.ios,
                            options,
                            nsData => {
                                // create file from image asset and return its path
                                const tempFolderPath = fs.knownFolders
                                    .temp()
                                    .getFolder("nsimagepicker").path;
                                const tempFilePath = fs.path.join(
                                    tempFolderPath,
                                    Date.now() + ".jpg"
                                );
                                nsData.writeToFileAtomically(
                                    tempFilePath, true);
                                resolve(tempFilePath);
                            }
                        );
                    } else {
                        // return imageAsset.android, since it 's the path of the file
                        resolve(imageAsset.android);
                    }
                });
            },
            onEvent(e) {
                let eventEntry = {
                    eventTitle: e.eventName + " " + e.object.description,
                    eventData: {
                        error: e.error ? e.error.toString() : e.error,
                        currentBytes: e.currentBytes,
                        totalBytes: e.totalBytes,
                        body: e.data
                        // raw: JSON.stringify(e) // uncomment for debugging purposes
                    }
                };
                this.getGeolocalisation();
                if (e.eventName == "complete") {
                    this.postRequest();
                    this.closeModal();
                    /*
                                                                alert({
                                                                        title: "Merci",
                                                                        message: "Photo, description, et géolocalisation envoyées",
                                                                        okButtonText: "ok"
                                                                });
                                                                */
                    this.description = "Description...";
                }
                this.event$.next(eventEntry);
            }
        }
    };
</script>
<style scoped>
    .page {
        background: white;
    }
</style>