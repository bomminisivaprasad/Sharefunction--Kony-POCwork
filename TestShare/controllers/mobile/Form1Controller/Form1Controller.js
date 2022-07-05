var base64tContentType = "";
var base64Type = "";
var base64String  = "";
var subject = "";
var fileName =  "";
var deviceInfo = "";
var base64="";
var gblbestfilepath="";
define({ 

  onNavigate : function(){
    this.view.flxSahre.onClick=this.shareImage;

  },
  shareImage : function () {
    try {
      var img = kony.image.createImageFromSnapShot(this.view.flxMain);
      var imageRawBytes = img.getImageAsRawBytes();
      base64 = kony.convertToBase64(imageRawBytes); if(base64.length > 0)
      {
        base64String = base64;
        var mimeTypeString = base64.substring(0,5);
        if(mimeTypeString === "iVBOR")
        {
          base64Type = "png";
          base64tContentType = "image/png";
          this.getDeviceInfo();
        }
        else if(mimeTypeString.substring(0,3) === "/9j")
        {
          base64Type = "jpg";
          base64tContentType = "image/jpg";
          this.getDeviceInfo();
        }
        else{
          alert("Unsupported file");
        }
      } } catch (err) {
        kony.print("shareImage" + JSON.stringify(err));
      }
  },
  sharePDF : function() {
    try {
      var base64 = "JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G";
      if(base64.length > 0)
      {
        base64String = base64;
        var mimeTypeString = base64.substring(0,5);
        if(mimeTypeString === "JVBERi" || mimeTypeString === "JVBER")
        {
          base64Type = "pdf";
          base64tContentType = "application/pdf";
          this.getDeviceInfo();
        }
        else{
          alert("Unsupported file");
        }
      } } catch (err) {
        kony.print("sharePDF" + JSON.stringify(err));
      }
  },
  shareTxt : function() {
    try {
      //var base64 = "Kony Mobile Fabric is the platform for integrating app with backends through middleware services - the product is categorized as a MBaaS or Mobile Backend as a Service";
      var base64 = "S29ueSBNb2JpbGUgRmFicmljIGlzIHRoZSBwbGF0Zm9ybSBmb3IgaW50ZWdyYXRpbmcgYXBwIHdpdGggYmFja2VuZHMgdGhyb3VnaCBtaWRkbGV3YXJlIHNlcnZpY2VzIC0gdGhlIHByb2R1Y3QgaXMgY2F0ZWdvcml6ZWQgYXMgYSBNQmFhUyBvciBNb2JpbGUgQmFja2VuZCBhcyBhIFNlcnZpY2UNCg=="; if(base64.length > 0)
      {
        base64String = base64;
        this.getDeviceInfo();
      }
      else{
        alert("Unsupported file");
      } } catch (err) {
        kony.print("sharePDF" + JSON.stringify(err));
      }
  },
  getDeviceInfo : function(){
    try{
      var deviceName = kony.os.deviceInfo().name;
      if (deviceName === "android")
      {
        deviceInfo = "android";
        this.createMyFile();
      }
      else if(deviceName === "iPhone")
      {
        deviceInfo = "iPhone";
        this.createMyFile();
      }
      else
      {
        kony.print("Unsupported device type");
      }
    }catch(error){
      kony.print("getDeviceInfo"+JSON.stringify(error));
    }
  },
  createMyFile : function()
  {
    try{
      var rawbytes;
      var fileExtension;
      var destDirPath;
      fileName = "social"; if(base64String !== null)
      {
        rawbytes = kony.convertToRawBytes(base64String);
      }
      else{
        return;
      } if (base64tContentType === "image/png")
      {
        fileExtension = ".png";
      }
      else if(base64tContentType === "image/jpg")
      {
        fileExtension = ".jpg";
      }
      else if(base64tContentType === "application/pdf")
      {
        fileExtension = ".pdf";
      }
      else
      {
        // fileExtension = ".txt";
        fileExtension = ".docx";
      } if(deviceInfo === "android")
      {
        destDirPath = kony.io.FileSystem.getExternalStorageDirectoryPath()+"/Sharing";
      }
      else if(deviceInfo === "iPhone")
      {
        destDirPath = kony.io.FileSystem.getDataDirectoryPath()+"/Sharing";
      } 
      var destFilePath = destDirPath + fileName+fileExtension;
      var directory = new kony.io.File(destDirPath);
      if((!directory.exists()))
      {
        directory.createDirectory();
      }
      else {
        directory.remove(true);
        directory.createDirectory();
      } var fileObj = new kony.io.File(destFilePath);
      if(!(fileObj.exists()))
      {
        fileObj.createFile();
      }
      else
      {
        fileObj.remove();
        fileObj.createFile();
      }
      var writeObj = new kony.io.File(destFilePath).write(rawbytes);
      if(writeObj)
        
      { if(deviceInfo === "android")
      
      {
       gblbestfilepath=destFilePath;
        //this.requestpermission();
        
        this.shareUsingAndroid(destFilePath);
      }
       else if(deviceInfo === "iPhone")
       {
         this.shareUsingiPhone(destFilePath);
       }
       else
       {
         kony.print("Unsupported device type");
       } } }catch(error){
         kony.print("createMyFile"+JSON.stringify(error));
       }
  },

  shareUsingAndroid : function(path)
  {
    try{ var konyPackage = java.import("com.konylabs.android.KonyMain");
        var Intent = java.import("android.content.Intent");
        var String = java.import("java.lang.String");
        var uriObj = java.import("android.net.Uri");
        var fileObj = java.import("java.io.File");
        var intentObj = new Intent(Intent.ACTION_SEND);
        var contextObj = konyPackage.getActContext();
        // Intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        // Intent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
        Intent.setType(base64tContentType);
        Intent.putExtra(Intent.EXTRA_SUBJECT,"Test for sahre function");
        //var uri = uriObj.fromFile(new fileObj(path));
        var uri = uriObj.parse(path);
        intentObj.putExtra(Intent.EXTRA_STREAM,uri);
        contextObj.startActivity(Intent.createChooser(intentObj,"Choose App")); }
    catch(error){
      kony.print("shareUsingAndroid"+JSON.stringify(error));
    }
  },

  shareUsingiPhone : function(path)
  {
    try{ var textToShare = "Sharing Content";
        var NSURL = objc.import("NSURL");
        var NSURLObjectLink=NSURL.fileURLWithPath(path);
        var shareItems = [textToShare, NSURLObjectLink];
        var UIActivityViewController = objc.import("UIActivityViewController");
        var avcObject=UIActivityViewController.alloc().initWithActivityItemsApplicationActivities(shareItems, undefined);
        var UIApplication = objc.import("UIApplication");
        UIApplication.sharedApplication().keyWindow.rootViewController.presentViewControllerAnimatedCompletion(avcObject, true, undefined); }catch(error){
          kony.print("shareUsingiPhone"+JSON.stringify(error));
        }
//   },
//   requestpermission : function () {

//     var options = {
//       "isVideoCapture": true,
//       "getNeverAskAgainStatus": true
//     }

//     kony.application.requestPermission(kony.os.RESOURCE_LOCATION, permissionStatusCallback, options);

//   },

//   permissionStatusCallback : function (response) {

//     alert("response ::" + JSON.stringify(response));

//     if (response.status == kony.application.PERMISSION_GRANTED) {
//       this.shareUsingAndroid(gblbestfilepath);

//      // kony.location.getCurrentPosition();

//     } else if (response.status == kony.application.PERMISSION_DENIED) {


//       Requestpermission(); /* To show the reason to users for granting the permission to use the feature and then raise a request. */

//     } else if (response.status == kony.application.PERMISSION_NEVER_ASK_AGAIN) {


//       kony.application.openApplicationSettings(); /* To show the reason to users for granting the permission to use the feature and then open application settings to grant the request. */

//     }

    

  }
});

