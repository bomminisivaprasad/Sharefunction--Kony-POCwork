
# Sharing function  Kony
#### Share function to share the files from your device. You can use the APIs of the component to share files using the file paths or the base64 value. Write this code to take screenshot, convert the base64 code on button unlock function. Response of base64 code first five letters we will decide mimeTypeString.
- var mimeTypeString = base64.substring(0,5);
        if(mimeTypeString === "iVBOR") => PNG
- if(mimeTypeString === "JVBERi") => PDF
- if(mimeTypeString.substring(0,3) === "/9j") =>JPG

``` javascript
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
// Onclick function 
  shareImage : function () {
    try {
      var img = kony.image.createImageFromSnapShot(this.view.flxMain); // snapshot the from
      var imageRawBytes = img.getImageAsRawBytes();
      base64 = kony.convertToBase64(imageRawBytes);  // Base64 conversion 
if(base64.length > 0)
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
  }
  ```
  #### Get Device Info if it is androi or iphone by using this code
 ```
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
  }
  ```
  #### Creating read and write file function 
  ```
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
  }
  ```
 #### Sahre Android function 
  
  ```
    shareUsingAndroid : function(path)
  {
    try{ var konyPackage = java.import("com.konylabs.android.KonyMain");
        var Intent = java.import("android.content.Intent");
        var String = java.import("java.lang.String");
        var uriObj = java.import("android.net.Uri");
        var fileObj = java.import("java.io.File");
        var intentObj = new Intent(Intent.ACTION_SEND);
        var contextObj = konyPackage.getActContext();
        Intent.setType(base64tContentType);
        Intent.putExtra(Intent.EXTRA_SUBJECT,"Test for sahre function");
        var uri = uriObj.parse(path);
        intentObj.putExtra(Intent.EXTRA_STREAM,uri);
        contextObj.startActivity(Intent.createChooser(intentObj,"Choose App")); }
    catch(error){
      kony.print("shareUsingAndroid"+JSON.stringify(error));
    }
  }
  ```
  #### Sahre with Iphone function 
  ```
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
    

  }
  ```
