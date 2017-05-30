function Scan2(string1, string2, sensitivity){
  var x;
  var y;
  try{
  x = string1.split(" ");
  y = string2.split(" ");
  }
  catch(e){
    return "ERROR";
  }
  var streak = 0;
  var total = 0;
  var a = 0;
  var b = 0;
  var broken = 0;
  var sensitivitySave = sensitivity;
  while(a < x.length && b < y.length){
    var found = false;
    /*if(streak == 0){
      sensitivity = sensitivitySave;
    }
    else{
      sensitivity = 1;
    }*/
    for(var c = b; c <= b + sensitivity && c < y.length && found == false; c++){
      if(y[c] == x[a]){
        found = true;
        b = c;
        break;
      }
    }
    if(found == false){
      for(var d = a; d <= a + sensitivity && d < x.length && found == false; d++){
        if(x[d] == y[b]){
          found = true;
          a = d;
          break;
        }
      }
    }
    if(found == true){
      streak++;
      if(streak >= 3){
        broken = 0;
      }
    }
    else{
      broken++;
      if(broken >= 3){
      if(streak >= 3){
        total += streak;
      }
      streak = 0;
      }
    }
    a++;
    b++;
  }
  total += streak;
  if(x.length > y.length){
    return Math.round(total / y.length * 1000) / 10;
  }
  else{
    return Math.round(total / x.length * 1000) / 10;
  }
}
function PercentScan2(string1, string2, sensitivity){
  var x;
  var y;
  try{
  x = string1.split(" ");
  y = string2.split(" ");
  }
  catch(e){
    return "ERROR";
  }
  var streak = 0;
  var total = 0;
  var a = 0;
  var b = 0;
  var dsave = 0;
  var csave = 0;
  var broken = 0;
  while(a < x.length && b < y.length){
    var found = false;
    for(var c = csave; c <= csave + sensitivity && c <= y.length; c++){
      if(y[c] == x[a]){
        if(found == false && streak >= 1){
          b = c;
          csave = c;
          broken = 0;
        }
        found = true;
        lastc = c;
        break;
      }
    }
    if(found == false){
      for(var d = dsave; d <= dsave + sensitivity && d <= x.length && found == false; d++){
        if(x[d] == y[b]){
          if (found == false && streak >= 1){
            a = d;
            dsave = d;
            broken = 0;
          }
          found = true;
          lastd = d;
          break;
        }
      }
    }
    if(found == true){
      streak++;
      //broken = 0;
    }
    else{
      broken++;
      if(broken >= 3 && streak >= 3){
      total += streak;
      }
      if(broken >= 3){
        streak = 0;
      }
      //return found;
    }
    a++;
    b++;
    dsave++;
    csave++;
  }
  if(streak >= 3){
    total += streak;
  }
  //return total;
  if(x.length > y.length){
    return Math.round(total / y.length * 1000) / 10;
  }
  else{
    return Math.round(total / x.length * 1000) / 10;
  }
}
function ScanTwo(input, term, sensitivity){
  var biggest = "Matches";
  var listlength = 0;
  for( var b = 0; b < input.length - 1; b++){
    if(term != input[b][0]){
      var x = Scan2(term, input[b][0], sensitivity);
      if(x == "ERROR"){
        return(b + " " + input[b][0]);
      }
      //return x;
      if(x > 10){
        biggest = (biggest + " | Row #:" + (b + 3) + " Similarity:" + x);
        listlength++;
      }
    }
    input[b][0] = "";
  }
  return biggest;
}
function PercentScanTwo(input, term, sensitivity){
  var biggest = "Matches";
  var listlength = 0;
  for( var b = 0; b < input.length - 1; b++){
    if(term != input[b][0]){
      var x = PercentScan2(term, input[b][0], sensitivity);
      if(x == "ERROR"){
        return(b + " " + input[b][0]);
      }
      //return x;
      if(x > 40){
        biggest = (biggest + " | Row #:" + (b + 1) + " Similarity:" + x + "%");
        listlength++;
      }
    }
    input[b][0] = "";
  }
  return biggest;
}
function GetURL(input, ID, shorten){
  var queue;
  if(ID != "main" && ID != "help" && ID != "wp" && ID != "garage"){
    ID = "main";
  }
  /*if(ID == "garage"){
    return ID;
  }*/
  var response;
  if(response = UrlFetchApp.fetch(input)){
    Logger.log(response.getContentText());
    var x = response.getContentText();
    var y = x.split("<");
    var z = 0;
    var numberfound = false;
    var locked = false;
    for(var a = 0; a < y.length - 1; a++){
      if(RealText(y[a], shorten) != "undefined"){
        var b = RealText(y[a], shorten);
        /*try{
          b.replaceText("&#8217;", "'");
        }
        catch(e){}*/
        //var b = y[a][1];
        //return b;
        if(b == "Was This Article Helpful? " && numberfound == true && ID == "help"){
          numberfound = false;
          locked = true;
        }
        if(b == "(480) 505-8877 " && numberfound == true && ID == "main"){
          numberfound = false;
          locked = true;
        }
        if(b == "Related from the GoDaddy blog " && numberfound == true && ID == "wp"){
          numberfound = false;
          locked = true;
        }
        if(b == "GoDaddy" && numberfound == true && ID == "garage"){
          numberfound = false;
          locked = true;
        }
        if(b != "\n" && b != "" && b != false && numberfound == true){
          if(b == "."){
            b = ". "
            return b;
          }
          try{
            if((b.charAt(0) == ',' && b.charAt(1) == ' ') || (b.charAt(0) == '.' && b.charAt(1) == ' ') || (b.charAt(0) == ':' && (b.charAt(1) == ' ' || b.charAt(1) == '\n')) || (b.charAt(0) == ')' && b.charAt(1) == ' ')){
              if(y[z - 1].charAt(y[z - 1].length - 1) == ' '){
                y[z - 1] = y[z - 1].substring(0, y[z - 1].length - 1);
              }
            }
          }
          catch(e){}
          y[z] = b;
          z++;
        }
        if(b == "(480) 505-8877 " && locked == false && ID == "help"){
          numberfound = true;
        }
        if(b == "GoDaddy Blog " && locked == false && ID == "main"){
          numberfound = true;
        }
        if(b == "GoDaddy Blog " && locked == false && ID == "wp"){
          numberfound = true;
        }
        if(b == "Menu " && locked == false && ID == "garage"){
          numberfound = true;
          //return "garage";
        }
      }
      y[a] = "";
    }
    return y;
    return "foo";
  }
  //Logger.log(response.getContentText());
  
}
function ScanFront(input, scanFor){
  var clean = true;
  for(var a = 0; a < input.length && a < scanFor.length; a++){
    if(input.charAt(a) != scanFor.charAt(a)){
      clean = false;
      return clean;
    }
  }
  return clean;
}
function RealText(input, shorten){
  //y[a].charAt(0) == '/' || (y[a].charAt(0) == 'p' && y[a].charAt(1) == '>') || (y[a].charAt(0) == 's' && y[a].charAt(1) == 't' && y[a].charAt(2) == 'r')
  var clean = true;
  var output = 0;
  var b = input.split(">");
  //return b[1];
  try{
    //if(b[1].charAt(0) == 'v' && b[1].charAt(1) == 'a' && b[1].charAt(2) == 'r'){clean = false;}
    //if(b[1].charAt(0) == '\'' && b[1].charAt(1) == ')' && b[1].charAt(2) == ';'){clean = false;}
    //if(b[1].charAt(0) == '\'' && b[1].charAt(1) == ' ' && b[1].charAt(2) == '+'){clean = false;}
    if(b[1].charAt(b[1].length - 1) == ";"){b[1] = b[1].substring(0, b[1].length - 6);}
    if(b[1].charAt(0) == '&' && b[1].charAt(1) == 'n' && b[1].charAt(2) == 'b'){b[1] = b[1].substring(6);}
    if(shorten == true){if(b[1].charAt(0) == '\n' || b[1].charAt(1) == '\n'){clean = false;}}
    if(b[0].charAt(0) == 's' && b[0].charAt(1) == 't' && b[0].charAt(2) == 'y' && b[0].charAt(3) == 'l'){clean = false;}
    if(b[0].charAt(0) == 's' && b[0].charAt(1) == 'c' && b[0].charAt(2) == 'r' && b[0].charAt(3) == 'i'){clean = false;}
    if(b[1].charAt(0) == '"' && b[1].charAt(1) == ')'){clean = false;}
    //if(b[1].charAt(0) == '\n' || b[1].charAt(1) == '\n'){clean = false;}
    if(b[1] == "&nbsp;" || b[1] == "-&nbsp;"){clean = false;}
    if(b[1].charAt(b[1].length - 1) != ' ' && b[1] != "("){
      b[1] = (b[1] + " ");
    }
    if(b[1].charAt(0) == ' '){
      b[1] = (b[1].substring(1));
    }
  }
  catch(e){}
  if(clean == true){
  return b[1];
  }
  if(clean == false){
    return "undefined";
  }
}
function stuff(){}
function split1(input){
  return input.split(" ");
}
function Splice(input){
  var output = ""
  for(var a = 0; a < input.length && output.length < 49000; a++){
    if(input[a] == "."){
      input[a] = ". ";
    }
    try{
      if(input[a].charAt(0) == ' '){
        input[a] = (input[a].substring(1));
      }
    }
    catch(e){}
    output = (output + input[a]);
  }
  input = output.split("\n");
  output = "";
  for(var a = 0; a < input.length && output.length < 49000; a++){
    if(input[a] == "."){
      input[a] = ". ";
    }
    try{
      if(input[a].charAt(0) == ' '){
        input[a] = (input[a].substring(1));
      }
    }
    catch(e){}
    output = (output + input[a]);
  }
  return output;
}
function RemoveExtraSpaces(input){
  //try{
    var x = input.split(" ");
    var output = "";
    for(var a = 0; a < x.length; a++){
      /*if(x[a] == "Don&#8217;t"){
        x[a] = "Don't";
      }
      if(x[a] == "let&#8217;s"){
        x[a] = "let's";
      }
      if(x[a] == "you&#8217;ve"){
        x[a] = "you've";
      }
      if(x[a] == "Let&#8217;s"){
        x[a] = "Let's";
      }
      if(x[a] == "That&#8217;s"){
        x[a] = "That's";
      }
      if(x[a] == "You&#8217;re"){
        x[a] = "You're";
      }
      if(x[a] == "you&#8217;re"){
        x[a] = "you're";
      }
      if(x[a] == "they&#8217;re"){
        x[a] = "they're";
      }
      if(x[a] == "don&#8217;t"){
        x[a] = "don't";
      }
      if(x[a] == "it&#8217;s"){
        x[a] = "it's";
      }*/
      /*for(int b = 0; b < x[a].length; b++){
        if(x[a].charAt(b) == '&' && x[a].charAt(b + 1) == '#')
      }*/
      x[a] = x[a].toString().replace("&#8217;", "'");
      x[a] = x[a].toString().replace("&#8220;", "\"");
      x[a] = x[a].toString().replace("&#8221;", "\"");
      x[a] = x[a].toString().replace("&amp;", "&");
      if(x[a] != "" && x[a] != false){
        if(output == ""){
          output = (output + x[a]);
        }
        else{
          output = (output + " " + x[a]);
        }
      }
    }
    //output = output.replace(/&quot;/g, "\"");
    return output;
  //}
  //catch(e){
    return "error"
  //}
}
function RemoveExtraLines(input){
  try{
    var x = input.split('\n');
    var output = "";
    for(var a = 0; a < x.length; a++){
      if(x[a] != "" && (x[a].charAt(1) != ' ')){
        if(output == ""){
          output = (output + x[a]);
        }
        else{
          output = (output + " " + x[a]);
        }
      }
    }
    //output = output.replace(/&quot;/g, "\"");
    return output;
  }
  catch(e){
    return "error"
  }
}
function SentenceScan(input1){
  //try{
    var x = input1.split(". ");
    return x;
  //}
  //catch(e){
    //return "ERROR"
  //}
}
function SentencePercent(input1, input2, sensitivity, threshold){
  var x = input1.split(". ");
  var y = input2.split(". ");
  var divide = 0;
    for(var a = 0; a < x.length; a++){
      var average = 0;
      for(var b = 0; b < y.length; b++){
        var c = Scan2(x[a], y[b], sensitivity);
        if(c > threshold){
          average += c;
        }
      }
      average /= y.length;
      average = Math.round(average * 100) / 100;
      x[a] = average;
    }
    return x;
  //}
  //catch(e){
}
function SentenceGroup(input1, input2, sensitivity, threshold, sentences){
  var x = input1.split(". ");
  var y = input2.split(". ");
  //return x;
  for(var a = 0; a < x.length; a++){
    for(var b = 1; b < sentences && b < x.length - a; b++){
      x[a] = (x[a] + " " + x[a + b]);
    }
  }
  for(var a = 0; a < y.length; a++){
    for(var b = 1; b < sentences && b < y.length - a; b++){
      y[a] = (y[a] + " " + y[a + b]);
    }
  }
  //return "foo";
  var divide = 0;
    for(var a = 0; a < x.length; a++){
      var average = 0;
      for(var b = 0; b < y.length; b++){
        var c = Scan2(x[a], y[b], sensitivity);
        if(c > threshold){
          average = y[b];
        }
      }
      //average /= y.length;
      //average = Math.round(average * 100) / 100;
      x[a] = average;
    }
    return x;
  //}
  //catch(e){
}
function SentenceGroupScan(input1, sentences){
  //try{
    var x = input1.split(". ");
    for(var a = 0; a < x.length; a++){
      for(var b = 1; b < sentences && b < x.length - a; b++){
        x[a] = (x[a] + " " + x[a + b]);
      }
    }
    return x;
  //}
  //catch(e){
    //return "ERROR"
  //}
}
function Scan2Flag(string1, string2, sensitivity, output){
  var streaks = 0;
  var x;
  var y;
  try{
  x = string1.split(" ");
  y = string2.split(" ");
  }
  catch(e){
    return "ERROR";
  }
  var streak = 0;
  var total = 0;
  var a = 0;
  var b = 0;
  var broken = 0;
  var sensitivitySave = sensitivity;
  while(a < x.length && b < y.length){
    var found = false;
    /*if(streak == 0){
      sensitivity = sensitivitySave;
    }
    else{
      sensitivity = 1;
    }*/
    for(var c = b; c <= b + sensitivity && c < y.length && found == false; c++){
      if(y[c] == x[a]){
        x[a] = "[" + x[a] + " | " + streaks + "-" + streak + "a]"
        y[c] = "[" + y[c] + " | " + streaks + "-" + streak + "b]"
        found = true;
        b = c;
        break;
      }
    }
    if(found == false){
      for(var d = a; d <= a + sensitivity && d < x.length && found == false; d++){
        if(x[d] == y[b]){
          x[d] = "[" + x[d] + " | " + streaks + "-" + streak + "b]"
          y[b] = "[" + y[b] + " | " + streaks + "-" + streak + "a]"
          found = true;
          a = d;
          break;
        }
      }
    }
    if(found == true){
      streak++;
      if(streak >= 3){
        broken = 0;
      }
    }
    else{
      broken++;
      if(broken >= 3){
      total += streak;
      if(streak > 0){
        streaks++;
      }
      streak = 0;
      }
    }
    a++;
    b++;
  }
  for(var a = 1; a < x.length; a++){
    x[0] = x[0] + " " + x[a];
  }
  for(var a = 1; a < y.length; a++){
    y[0] = y[0] + " " + y[a];
  }
  output[0] = x[0];
  output[1] = y[0];
  return output;
  total += streak;
  if(x.length > y.length){
    return Math.round(total / y.length * 1000) / 10;
  }
  else{
    return Math.round(total / x.length * 1000) / 10;
  }
}