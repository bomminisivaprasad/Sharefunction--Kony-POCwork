 
   
function onclickbtn(){

var testImg = kony.image.createImageFromSnapShot(frmHome.Flxgrp);

frmHome.Img2.image = testImg;

var testRaw = testImg.getImageAsRawBytes();

var path =kony.io.FileSystem.getDataDirectoryPath();
var sharedDir = path+constants.FILE_PATH_SEPARATOR+"images";
var sharefolder = new kony.io.File(sharedDir).createDirectory();
var fileLoc = sharedDir+constants.FILE_PATH_SEPARATOR+"test.png";

var myfile=new kony.io.File(fileLoc).createFile(); 
 
  var write=new kony.io.File(fileLoc).write(testRaw);

var fileRawBytes=new kony.io.File(fileLoc).read();

var to = [""];

var cc = [""];

var bcc = [""];

var sub = "Testing Screenshot attachment";

var msgbody = "Testing openEmail with attachment";

var attachment = {mimetype: "text/*",attachment: fileRawBytes };

kony.phone.openEmail(to,cc,bcc,sub, msgbody, false, [attachment]);


}




