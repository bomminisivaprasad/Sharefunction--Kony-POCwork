
# Sharing function  Kony
#### Share function to share the files from your device. You can use the APIs of the component to share files using the file paths or the base64 value. Write this code to take screenshot, convert the base64 code on button unlock function.
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
