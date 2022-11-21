/* vamos a dibujar la tabla que ya esta hecha grid en el css, pero le vamos a poner bordes
    para ello, a la primera fila le vamos a poner un borde inferior, a la última fila le 
    vamos a poner un borde superior. A la columna de la izquierda le vamos a poner un borde
    derecho, mientras que a la columna de la derecha le vamos a poner un borde izquierdo.
*/

// vamos a crear un array normal de JS con todos los elementos del html con clase "box"
const boxes = Array.from(document.getElementsByClassName("box"));
// console.log(boxes); // to see in the console it worked

//setting up agarrar la variable playText de un elemento que tenga el ID de playText
const playText = document.getElementById("playText");

// para jalar el botôn de reinicio que pusimos en el html (lo traemos por ID)
const restartButton = document.getElementById("restartButton");

// para llevar registro de las casillas clicadas y no dejar que vuelva a ser clicada
// todas en null al iniciar, una vez clicada la casilla, va a cambiar
const spaces = [null, null, null, null, null, null, null, null, null];



// para los jugagores, para saber de quiên es el turno
const O_TEXT = "0";
const X_TEXT = "X";
let currentPlayer;

// una funciôn para dibujar la tabla (los bordes)
const drawBoard = () => {
    
    // a cada elemento del array (a cada box)...
    boxes.forEach((box, index) => {
        
        let styleString = "";

        // si el elemento en con îndice [i] index es menor a 3 (los tres de la primera fila), 
        // ponles borde inferior 
        if (index < 3) {
            styleString += `border-bottom: 3px solid var(--purple);`;
        }

        // la columna la izquierda con boxes con îndices: 0, 3, 6
        if (index % 3 === 0) {
            styleString += "border-right: 3px solid var(--purple);";
        }

        // columna derecha, boxes: 2, 5, 8
        if (index % 3 === 2) {
            styleString += "border-left: 3px solid var(--purple);";
        }

        // la ûltima fila: boxes 6, 7, 8
        if (index > 5) {
            styleString += "border-top: 3px solid var(--purple);";
        }

        box.style = styleString;

        // ahora vamos a agregar listeners para cada vez que se haga click en las boxes
        box.addEventListener("click", boxClicked);
    });
};

// cuando el jugador haga clic
const boxClicked = (e) => {
    // just to check (in the console) if its working
    // console.log("box was clicked");

    //para saber cuâl celda fue clicada
    // event.target.tagName or id, to find out which element triggered a specific event
    const id = e.target.id;
    // console.log(id); // imprime en la consola la celda clicada

    // if there's nothing en el elemento con îndice ID del array spaces creado arriba, lo 
    // cual es cierto porque todos elementos estân empzando en null... sustitûyelo
    // por el currenPlayer que es X u O
    if (!spaces[id]) {
        spaces[id] = currentPlayer; // actualiza ese elemento null por currentPLayer (x u o)
        e.target.innerText = currentPlayer; // overwrite el texto del evento por currentPlayer (x u o)

        // para definir quien gana... la ponemos antes de que se escoja el turno siguiente
        if (playerHasWon()) {
            
            playText.innerText = `${currentPlayer} has won!`;
            
            return; // salimos de la funcion, ya no se va a continuar
        };


        //por ûltimo vamos a actualizar al jugador, para que sea el turno del otro
        // aquî estâ usando un teranry expression pero tmb podrîa ser con un IF statement
        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    };

};

// la funcion que decide quien / como se gana, al tener 3 casillas seguidas con el mismo sîmbolo
// entonces la estrategia es hacerlo manual: establecer diferentes combinaciones de casillas
//que resultan en gane de partida, por ejemplo, las casillas:0,1,2 (fila superior)
const playerHasWon = () => {

    // si el jugador en turno tiene la casilla 0
    if (spaces[0] === currentPlayer) {

        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} wins up top.`);
            return true;
        }

        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally \\ .`);
            return true;
        }

        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins on the left.`);
            return true;
        }

    }
    
    if (spaces[8] === currentPlayer) {

        if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins on the right.`);
            return true;
        }

        if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins on the bottom.`);
            return true;
        }

    }

    if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins vertically in the middle.`);
            return true;
        }

        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins horizontally in the middle.`);
            return true;
        }

        if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins diagonally / .`);
            return true;
        }
    }
};

// funciôn que describe lo que pasa al reiniciar partida
const restart = () => {
    
    //lo que queremos es limpiar, poner en null cada elemento del array spaces
    // para que se pueda reiniciar el conteo cuando se reinicie el juego
    spaces.forEach((space, index) => {
        spaces[index] = null;
    });

    // tambiên queremos eliminar el texto que aparece en el tablero, es decir, las Xs y las Os
    boxes.forEach(box => {
        box.innerText = "";
    });
    
    playText.innerText = `Let's Play!`;
    currentPlayer = O_TEXT;
    
};

// la funcion que asigna lo que va a suceder cuando se apriete el boton de restart
// cuando se le haga click al botôn restart, se activa la funcion llamada restart (descrita arriba)
restartButton.addEventListener("click", restart);

restart();
drawBoard();