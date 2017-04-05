const SEPARATOR = ";";
const POINT = ",";
const CODE = 0;
const COUNTS = 1;
const CONC = 2;
const UNIT = 3;
const PCV = 4;
var contents;
var readFileCallback;
function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    contents = e.target.result;
    displayContents(contents);
    readFileCallback(contents);
  };
  reader.readAsText(file);
}

function probeList(contents) {
 var t = "";
 var i = contents.indexOf("NTSHS");
 for (; i < contents.length; i++) {
  var c = contents.charAt(i);
  if (c == String.fromCharCode(27) || c == String.fromCharCode(0)) {
   while (i < contents.length && c != " ") {
    i++;
    c = contents.charAt(i);
   } 
  }
  t += c; 
 }
 var x = "";
 var str = t.split(String.fromCharCode(13)+String.fromCharCode(10));
 var res = new Array();
 for (i = 0; i < str.length; i++) {
  if (str[i].indexOf("NTSHS") == -1) { 
  if (str[i].indexOf("CODE") == -1) {
   var line = new Array();
     line = str[i].trim().split(/\s+/);
   if (line[0] != 'STD' && line[0] != 0) {
    if (line.length >= 4) {
     if (line.length < 5) {
      line.push('');
     }
     res.push(line);
    }
   }
  }
  } else {

  }
 }
 return res; 
}

function displayContents(contents) {
 var t = "";
 var i = contents.indexOf("NTSHS");
 for (; i < contents.length; i++) {
  var c = contents.charAt(i);
  if (c == String.fromCharCode(27) || c == String.fromCharCode(0)) {
   while (i < contents.length && c != " ") {
    i++;
    c = contents.charAt(i);
   } 
  }
  t += c; 
 }
 var x = "";
 var str = t.split(String.fromCharCode(13)+String.fromCharCode(10));

 for (i = 0; i < str.length; i++) {
  if (str[i].indexOf("NTSHS") == -1) { 
  if (str[i].indexOf("CODE") == -1) {
   var line = str[i].trim().split(/\s+/);
   if (line.length >= 4) {
//    x += (line[0].trim() + SEPARATOR + line[1].trim() + SEPARATOR + line[2].trim() + SEPARATOR + line[3].trim());
    x += ("\"" + line[0].trim().replace(/\./g, POINT) + "\"" + SEPARATOR + "\"" + line[1].trim().replace(/\./g, POINT) + "\"" + SEPARATOR + "\"" + line[2].trim().replace(/\./g, POINT) + "\"" + SEPARATOR + "\"" + line[3].trim().replace(/\./g, POINT) + "\"");
    if (line.length >= 5) {
//     x += SEPARATOR + line[4].trim();
     x += SEPARATOR + "\"" + line[4].trim().replace(/\./g, POINT) + "\"";
    }
    //Uncommant for lenebreak for display
    //x += "<br>";
     x += "\n";
   }
  }
  } else {
    var line = str[i].trim().split(/\s+/);
    x += line[3] + "\n";
  }
 }
// Uncomment following two lines to display decoded content
 var element = document.getElementById('file-content');
 element.innerHTML = x;
 //Save file
/*
 var filename = 'data_'+(new Date()).getTime()+'.csv';
        var blob = new Blob([x], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
*/

}
