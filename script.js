let currentLine = 0;
let currentSlot = 0;
let numLines = document.getElementsByClassName("line").length
let slotsPerLine = document.getElementsByClassName("line").item(0).getElementsByClassName("slot").length;
const allColors = ["red", "blue", "green", "yellow", "black", "white"];
let code = [];
for(let i = 0; i < slotsPerLine; i++){
  code[i] = allColors[Math.floor(Math.random() * allColors.length)]
}

function paste(color){  
  let slotsInLine = document.getElementsByClassName("line").item(currentLine).getElementsByClassName("slot");
  slotsInLine.item(currentSlot).style.background = color;
  slotsInLine.item(currentSlot).style.border = "2px solid lightblue";
  if(currentSlot < slotsPerLine - 1){
    currentSlot++;
  }
  else{
    currentSlot = 0;
  }
  if(currentSlot == 0){
    document.getElementsByClassName("line").item(currentLine).getElementsByClassName("answer").item(0).style.background = "green";
  }
  if(slotsInLine.item(currentSlot).style.background == "black"){
    slotsInLine.item(currentSlot).style.border = "2px solid white";
  }
  else{
    slotsInLine.item(currentSlot).style.border = "2px solid black";
  }
}

function confirmLine(){
  let lineAnswer = document.getElementsByClassName("line").item(currentLine).getElementsByClassName("answer").item(0)
  if(lineAnswer.style.background == "green"){
    let slotsInLine = document.getElementsByClassName("line").item(currentLine).getElementsByClassName("slot")
    let answerCombo = [];
    let colorsInLine = [];
    for(let i = 0; i < slotsInLine.length; i++){
      colorsInLine[i] = slotsInLine.item(i).style.background;
    }
    let codeCopy = code.slice(0);
    for(let i = 0; i < colorsInLine.length; i++){
      console.log(codeCopy[i], colorsInLine[i]);
      if(codeCopy[i] == colorsInLine[i]){
        answerCombo[i] = "red";
        delete codeCopy[i];
      }
      else if(codeCopy.indexOf(colorsInLine[i]) > -1){
        if(colorsInLine[codeCopy.indexOf(colorsInLine[i])] != colorsInLine[i]){
          answerCombo[i] = "white";
          delete codeCopy[codeCopy.indexOf(colorsInLine[i])];
        }
        else{
          answerCombo[i] = "black";
        }
      }
      else{
        answerCombo[i] = "black";
      }
    }
    function isRed(value){return value == "red"}
    function isWhite(value){return value == "white"}
    function isBlack(value){return value == "black"}
    let reds = answerCombo.filter(isRed);
    let whites = answerCombo.filter(isWhite);
    let blacks = answerCombo.filter(isBlack);
    answerCombo = reds.concat(whites, blacks);
    let answerPegs = lineAnswer.getElementsByClassName("answerPeg");
    for(let i = 0; i < answerPegs.length; i++){
      answerPegs.item(i).style.display = "flex";
      if(answerCombo[i] == "red"){
        answerPegs.item(i).title = "One peg is in the right place and is the right color!"
      }
      else if(answerCombo[i] == "white"){
        answerPegs.item(i).title = "One peg's color is in the combo, but it is in the wrong space"
      }
      else if(answerCombo[i] == "black"){
        answerPegs.item(i).title = "One peg's color isn't in the combo"
      }
      answerPegs.item(i).style.background = answerCombo[i];
    }
    if(currentLine < document.getElementsByClassName("line").length - 1){
      slotsInLine.item(currentSlot).style.border = "2px solid lightblue";
      lineAnswer.style.background = "gray";
      currentLine++;
      if(currentLine < document.getElementsByClassName('line').length - 1){
        document.getElementsByClassName("line").item(currentLine + 1).style.display = "flex";
      }
      currentSlot = 0;
      document.getElementsByClassName("line").item(currentLine).getElementsByClassName("slot").item(0).style.border = "2px solid black";
    }
    else if(!answerCombo.every(isRed)){
      let allLines = document.getElementsByClassName("line");
      for(let i = 0; i < numLines; i++){
        allLines.item(i).style.display = "none";
      }
      document.getElementsByClassName("winOrLose").item(0).style.display = "flex";
      document.getElementsByClassName("winOrLose").item(1).style.display = "flex";
      document.getElementsByTagName("h1").item(0).style.display = "flex";
      document.getElementsByTagName("h1").item(0).innerHTML = "You lose";
      document.getElementsByClassName("reloadButton").item(0).style.display = "flex";
      document.body.style.background = "rebeccapurple";
    }
    if(answerCombo.every(isRed)){
      let allLines = document.getElementsByClassName("line");
      for(let i = 0; i < numLines; i++){
        allLines.item(i).style.display = "none";
      }
      document.getElementsByClassName("winOrLose").item(0).style.display = "flex";
      document.getElementsByClassName("winOrLose").item(1).style.display = "flex";
      document.getElementsByTagName("h1").item(0).style.display = "flex";
      document.getElementsByTagName("h1").item(0).innerHTML = "YOU WIN!";
      document.getElementsByClassName("reloadButton").item(0).style.display = "flex";
      document.body.style.background = "gold";
    }
  }
}