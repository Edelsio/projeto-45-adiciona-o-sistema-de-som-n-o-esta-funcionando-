var ground;
var modulo;
var modulo_img;
var fundo_img;
var solo_invisivel;
var botão_restartImg, botão_restart;


var vx = 0;
var g = 0.0005;
var vy = 0;

estado_de_jogo = 1

function preload()
{
  somFundo = loadSound("game sound.mp3");

  modulo_img = loadImage("apollo 11.png");
  fundo_img = loadImage("bg_sur.png");
  botão_restartImg = loadImage("botão_restart.png")
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  somFundo.play();
  somFundo.setVolume(0.1);

  modulo = createSprite(250,50,30,30);
  modulo.addImage(modulo_img);
  modulo.scale = 0.3;

  solo_invisivel = createSprite(500, 550, 1000, 10);
  solo_invisivel.visible = false

  botão_restart = createSprite(500, 500, 10, 10);
  botão_restart.addImage(botão_restartImg);
  botão_restart.scale = 0.5;
  botão_restart.visible = false;

  botaoVolume = createImg("mute.png");
  botaoVolume.position(300, 25);
  botaoVolume.size(50, 50);
  botaoVolume.mouseClicked(pausar);

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(fundo_img,0,0);
  push()
  fill(255);
  text("Velocidade Vertical: "+round(vy),800,75);
  pop();

  //descida
  vy += g
  modulo.position.y+=vy;
  movendo()
 
  if(frameCount > 10){

    g = 0.0005
    vy -= g
  }

  if(modulo.isTouching(solo_invisivel) && vy != 0){

    estado_de_jogo = 0

  }

  if(modulo.isTouching(solo_invisivel) && vy < 1 && vy > 0){

    estado_de_jogo = 2

  }



  if(estado_de_jogo == 0){
    textSize(50)
    fill("white")
    text("Você Perdeu", 350, 350);

    botão_restart.visible = true
    somFundo.stop();

    if(mousePressedOver(botão_restart)){

      restart()
    }
  }

  if(estado_de_jogo == 2){
    textSize(50)
    fill("white")
    text("Você Venceu", 350, 350);
    somFundo.stop();
  }
  drawSprites();
}

 function movendo(){

  if(keyDown("UP")){

    vy -= 0.05
  }

  if(keyDown("DOWN")){
    
    vy += 0.05
  }

  if(keyDown("LEFT")){
    
    modulo.x -= 0.05
  }

  if(keyDown("RIGHT")){
    
    modulo.x += 0.05
  }

 }

 function pausar() {

  if (somFundo.isPlaying()) {
      somFundo.stop();

  } else {
      somFundo.play();
      somFundo.setVolume(0.1);
  }
}

 function restart(){

  estado_de_jogo = 1;

  botão_restart.visible = false;

  modulo.y = 50

  vy = 0

 }


