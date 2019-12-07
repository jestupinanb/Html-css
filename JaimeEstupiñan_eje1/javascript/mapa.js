//La escala a la cual se ajusto el tamaño del mapa para trabajar sobre esta
//El mapa se adapta a diferentes resoluciones como se explica mas adelante
const mapScale = 0.50;

//Se crea el juego con la resolucion ajustada, ademas se asigna preload y create como las funciones que se han creado
var game = new Phaser.Game(3000 * mapScale, 2000 * mapScale, Phaser.AUTO, 'map', { preload: preload, create: create });

//Se guardo en un arreglo todas las variables correspondientes a cada uno de los respectivos botones
var pieces = [
    {
        xCor: 1719 * mapScale,
        yCor: 57 * mapScale,
        url: '/images/mapa/Australia_interactive_map_pieza_1.png',
        id: 'map_1',
        html: 'informationMap_1'
    },
    {
        xCor: 1840 * mapScale,
        yCor: 1079 * mapScale,
        url: '/images/mapa/Australia_interactive_map_pieza_2.png',
        id: 'map_2',
        html: 'informationMap_2'
    },
    {
        xCor: 1265 * mapScale,
        yCor: 937 * mapScale,
        url: '/images/mapa/Australia_interactive_map_pieza_3.png',
        id: 'map_3',
        html: 'informationMap_3'
    },
    {
        xCor: 1186 * mapScale,
        yCor: 26 * mapScale,
        url: '/images/mapa/Australia_interactive_map_pieza_4.png',
        id: 'map_4',
        html: 'informationMap_4'
    },
    {
        xCor: 221 * mapScale,
        yCor: 286 * mapScale,
        url: '/images/mapa/Australia_interactive_map_pieza_5.png',
        id: 'map_5',
        html: 'informationMap_5'
    },
    {
        xCor: 1799 * mapScale,
        yCor: 1374 * mapScale,
        url: '/images/mapa/Australia_interactive_map_pieza_6.png',
        id: 'map_6',
        html: 'informationMap_6'
    }
]

var button_informacion = {
    xCor: 1250,
    yCor: 50,
    url_1: '/images/mapa/button_informacion_1.png',
    url_2: '/images/mapa/button_informacion_2.png',
    id_1: 'info_1',
    id_2: 'info_2',
    html: 'informationMap'
}
//Variable encargada de almacenar el sonido
var fx;

//Funcion preload usada por phaser
function preload() {
    console.log("preload")
    //Se carga la imagen del mapa 
    game.load.image('back_mapa', "/images/mapa/Australia_interactive_map.jpg")
    //Se carga el boton de la informacion
    game.load.image(button_informacion.id_1, button_informacion.url_1);
    game.load.image(button_informacion.id_2, button_informacion.url_2);
    //Se carga el audio
    game.load.audio('sfx', '/sounds/sound.wav');
    //Se recorre el arreglo que se guardo anteriormente
    pieces.map(
        //Se carga cada una de las piezas con su respectivo id y url
        piece => {
            game.load.image(piece.id, piece.url);
        }
    )
}

//Funcion create usada por phaser
function create() {
    console.log("create")
    //Configurando el audio
    fx = game.add.audio('sfx');
    fx.allowMultiple = true;
    //Asignando un nombre al audio, un tiempo en el que inicia y el tiempo en el que termina
    fx.addMarker('over', 0, 0.5);

    //Ajustando la imagen al tamaño de la pantalla y mantiendo su ratio
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    //Se carga la imagen del mapa
    var image = game.add.image(0, 0, 'back_mapa')
    image.scale.setTo(mapScale);
    image.visible = true

    //Para cada una de las piezas se crea un boton
    pieces.map(
        piece => {
            //Se crea el boton, con los datos que tiene la pieza y se le asigna la funcion que se ejecuta al dar click (onClick)
            pieceButton = game.add.button(piece.xCor, piece.yCor, piece.id, onClick, this)
            //Se re escala
            pieceButton.scale.setTo(mapScale);
            //Se muestra
            pieceButton.visible = true;
            //Empieza oculto
            pieceButton.alpha = 0;
            //Se le asignan las funciones repectivas para el over, el out
            pieceButton.onInputOver.add(over, this);
            pieceButton.onInputOut.add(out, this);
            pieceButton.data = piece.html
        }
    )

    //Agregando el boton de la informacion
    let info = game.add.button(button_informacion.xCor, button_informacion.yCor, button_informacion.id_1, onClickInformacion, this);
    info.visible = true;
    info.onInputOver.add(overInformacion, this);
    info.onInputOut.add(outInformacion, this);
    console.log(overInformacion)
}

//Funcion que se ejecuta cuando ocurre el over sobre los botones
function over(piece) {
    //Se cambia la opacidad del boton para que el usuario pueda identificar sobre que boton esta 
    piece.alpha = 0.5;
    //Se ejecuta el sonido
    fx.play("over")
}

//Funcion que se ejecuta cuando el mouse sale del over de los botones
function out(piece) {
    //Cuando sale se del over del boton se coloca la opacidad en cero para que se identifique que el usuario no tiene el mouse sobre este
    piece.alpha = 0;
}

//Funcion que se ejecuta cuando se da click sobre los botones
function onClick(piece) {
    //Ocultando la pieza al dar click
    out(piece)
    //Se oculta el documento del mapa
    document.getElementById("map").style.display = "none"
    //Se muestra el documento de la pieza(boton) correspondiente
    document.getElementById(piece.data).style.display = "block"
}

//Funcion que es ejecutada por los botones de los div que contienen la informacion
//De los diferentes estados de Australia
function onClickReturnMap(id) {
    //Se ocuta el documento html correspondiente
    document.getElementById(id).style.display = "none"
    //Se muestra el mapa(Canvas)
    document.getElementById("map").style.display = "block"
    //Se ejecuta el sonido
    fx.play("over")
}

//Funcion del over del boton de la informacion
function overInformacion(info) {
    //Se ejecuta el sonido
    fx.play("over")
    //Se cambia la textura, es decir la imagen que tiene el boton
    info.loadTexture(button_informacion.id_2);
}

//Funcion del out del boton de la informacion
function outInformacion(info) {
    //Se cambia la textura, es decir la imagen que tiene el boton
    info.loadTexture(button_informacion.id_1);
}

//Funcion al dar click en el boton de informacion
function onClickInformacion(info){
    outInformacion(info)
    //Se oculta el documento del mapa
    document.getElementById("map").style.display = "none"
    //Se muestra el documento de la pieza(boton) correspondiente
    document.getElementById(button_informacion.html).style.display = "block"
}