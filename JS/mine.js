
let btnStart = document.querySelector(".main__btnStart");
let pickaxe = document.querySelector(".main_side_items__pickaxe img");
let shovel = document.querySelector(".main_side_items__shovel img");
let axe = document.querySelector(".main_side_items__axe img");
let reset = document.querySelector(".main_side_items__btn_resetworld");
let choosenTool = pickaxe;
let temp = pickaxe;
let choosenBlockTool = document.querySelector(".main_side_items__chosen img");
let remove = true;
let add = false;


initGame();

function initGame() {
    btnStart.addEventListener("click", startGame);
    pickaxe.addEventListener("click", chooseToolPickaxe);
    shovel.addEventListener("click", chooseToolShovel);
    axe.addEventListener("click", chooseToolAxe);
    choosenBlockTool.addEventListener("click", grabBlockToPlaceInWorld);
    reset.addEventListener("click", resetGame);
}

function resetGame(event) {
    axe.setAttribute("src", "Assets/axe.png");
    shovel.setAttribute("src", "Assets/shovel.png");
    pickaxe.setAttribute("src", "Assets/blue_pickaxe.png")

    axe.setAttribute("style", "border:1px solid white");
    pickaxe.setAttribute("style", "border:1px solid white");
    shovel.setAttribute("style", "border:1px solid white");
    choosenTool = pickaxe;
    temp = pickaxe;
    document.querySelector(".main_side_items__chosen img").setAttribute("src", "Assets/default.png");
    remove = true;
    add = false;
    let world = document.querySelector(".page1__left_panel_2__myWorld");
    world.innerHTML = "";
    createNewWorld();
}


function startGame(event) {
    hidePreviousPage1(event);
    createNewWorld();//full picture matrix
}
function hidePreviousPage1(event) {
    let page1__left_panel_1 = document.querySelector(".page1__left_panel_1");
    let page1__left_panel_2 = document.querySelector(".page1__left_panel_2");
    let page1__left_panel_2__myWorld = document.querySelector(".page1__left_panel_2__myWorld");
    page1__left_panel_1.setAttribute("style", "display:none;");
    page1__left_panel_2.setAttribute("style", "display:grid;");
    page1__left_panel_2__myWorld.setAttribute("style", "display:grid;");
}
function createNewWorld() {

    let worldArr = [];
    worldArr = [];
    for (let row = 0; row < 20; row++) {

        worldArr[row] = [];

        for (let column = 0; column < 20; column++) {
            let page1__left_panel_2__myWorld = document.querySelector(".page1__left_panel_2__myWorld");
            let div = document.createElement("div");
            div.classList.add("block");

            div.addEventListener("click", useToolToRemoveAddBlock);

            div.classList.add("blockSky");
            page1__left_panel_2__myWorld.append(div);
            let img = document.querySelector(".block.blockSky");
            worldArr[row][column] = img;

            if (row < 14) {

                if (row == 13 && column == 1 || row == 13 && column == 2 || row == 13 && column == 3 || row == 12 && column == 2) {
                    div.classList.add("blockTreeLeaf");
                    page1__left_panel_2__myWorld.append(div);
                    let img = document.querySelector(".block.blockTreeLeaf");
                    worldArr[row][column] = img;
                }
                if (row == 13 && column == 19 || row == 13 && column == 14 || row == 13 && column == 13) {
                    div.classList.add("blockStone");
                    page1__left_panel_2__myWorld.append(div);
                    let img = document.querySelector(".block.blockStone");
                    worldArr[row][column] = img;
                }
            }
            if (row == 13 && column == 16 || row == 12 && column == 16 || row == 11 && column == 16) {
                div.classList.add("blockTreeTrunk");
                page1__left_panel_2__myWorld.append(div);
                let img = document.querySelector(".block.blockTreeTrunk");
                worldArr[row][column] = img;
            }
            if (row == 10 && column == 16 || row == 9 && column == 16 || row == 8 && column == 16 ||
                row == 10 && column == 15 || row == 10 && column == 17 || row == 9 && column == 15 || row == 9 && column == 17 ||
                row == 8 && column == 15 || row == 8 && column == 17) {
                div.classList.add("blockTreeLeaf");
                page1__left_panel_2__myWorld.append(div);
                let img = document.querySelector(".block.blockTreeLeaf");
                worldArr[row][column] = img;
            }
            if (row == 8 && column == 7 || row == 8 && column == 8 || row == 7 && column == 7
                || row == 7 && column == 8 || row == 7 && column == 9 || row == 7 && column == 10
                || row == 6 && column == 9 || row == 6 && column == 10
                || row == 7 && column == 9 || row == 7 && column == 10
                || row == 6 && column == 9 || row == 6 && column == 10) {
                div.classList.add("blockWhite");
                page1__left_panel_2__myWorld.append(div);
                let img = document.querySelector(".block.blockWhite");
                worldArr[row][column] = img;
            }

            if (row == 14) {
                div.classList.add("blockTopLand");
                page1__left_panel_2__myWorld.append(div);
                let img = document.querySelector(".block.blockTopLand");
                worldArr[row][column] = img;
            }
            if (row > 14) {
                div.classList.add("blockBottomLand");
                page1__left_panel_2__myWorld.append(div);
                let img = document.querySelector(".block.blockBottomLand");
                worldArr[row][column] = img;
            }

        }
    }
}
function useToolToRemoveAddBlock(event) {//shovel-land,pickaxe-for stone,axe-tree green&&tree root=trunk
    let stone = event.currentTarget.classList.contains("blockStone");
    let treeLeaf = event.currentTarget.classList.contains("blockTreeLeaf");
    let treeTrunk = event.currentTarget.classList.contains("blockTreeTrunk");
    let topLand = event.currentTarget.classList.contains("blockTopLand");
    let bottomLand = event.currentTarget.classList.contains("blockBottomLand");
    let sky = event.currentTarget.classList.contains("blockSky");
    let img = document.querySelector(".main_side_items__chosen img");

    if (remove === true) {//remove flow
        if (temp.getAttribute("src").includes("shovel"))
            shovel.setAttribute("style", "border: 1px solid white;");
        else if (temp.getAttribute("src").includes("pickaxe"))
            pickaxe.setAttribute("style", "border: 1px solid white;");
        else if (temp.getAttribute("src").includes("axe"))
            axe.setAttribute("style", "border: 1px solid white;");

        //is invalid tool for block
        if (stone && (choosenTool === shovel || choosenTool === axe)) {
            choosenTool.setAttribute("style", "border: 1px solid red;");
            setTimeout(function (o) {
                choosenTool.setAttribute("style", "border: 1px solid white;");
            }, 1000)
            if (temp.match("/^shovel$/"))
                temp = shovel;
            else
                temp = pickaxe;
            temp = choosenTool.getAttribute("src");
            if (temp.match("/^axe$/"))
                temp = axe;
            else
                temp = shovel;
        }
        debugger;
        if ((treeLeaf || treeTrunk) && (choosenTool === shovel || choosenTool === pickaxe)) {
            choosenTool.setAttribute("style", "border: 1px solid red;");
            setTimeout(function (o) {
                choosenTool.setAttribute("style", "border: 1px solid white;");
            }, 1000)
            temp = choosenTool.getAttribute("src");
            if (temp.match("/^shovel$/"))
                temp = shovel;
            else
                temp = pickaxe;
        }
        if ((topLand || bottomLand) && (choosenTool === axe || choosenTool === pickaxe)) {
            choosenTool.setAttribute("style", "border: 1px solid red;");
            setTimeout(function (o) {
                choosenTool.setAttribute("style", "border: 1px solid white;");
            }, 1000)
            temp = choosenTool.getAttribute("src");;
            if (temp.match("/^axe$/"))
                temp = axe;
            else
                temp = pickaxe;
        }

        if (stone && choosenTool == pickaxe) {
            choosenBlockTool = event.toElement.classList[2];
            event.currentTarget.classList.remove("blockStone");
            img.setAttribute("src", "Assets/stone_block.png");
        }

        if (treeLeaf && choosenTool == axe) {
            choosenBlockTool = event.currentTarget.classList[2];
            event.currentTarget.classList.remove("blockTreeLeaf");
            img.setAttribute("src", "Assets/tree_leaf.png");

        }
        if (treeTrunk && choosenTool == axe) {
            choosenBlockTool = event.currentTarget.classList[2];
            event.currentTarget.classList.remove("blockTreeTrunk");
            img.setAttribute("src", "Assets/tree_trunk.png");

        }
        if (topLand && choosenTool == shovel) {
            choosenBlockTool = event.currentTarget.classList[2];
            event.currentTarget.classList.remove("blockTopLand");
            img.setAttribute("src", "Assets/land_top_block.png");

        }
        if (bottomLand && choosenTool == shovel) {
            choosenBlockTool = event.currentTarget.classList[2];
            event.currentTarget.classList.remove("blockBottomLand");
            img.setAttribute("src", "Assets/land_bottom_block.png");

        }

    }

    if (add === true) {//add flow
        if (choosenBlockTool === "blockStone" && choosenTool != null) {
            event.currentTarget.classList.add("blockStone");
            event.currentTarget.setAttribute("src", "Assets/stone_block.png");

            debugger;
            img.setAttribute("src", "Assets/default.png");
            add = false;
            remove = true;
            choosenTool = null;
            if (choosenTool === pickaxe)
                pickaxe.setAttribute("src", "Assets/pickaxe.png");
            if (choosenTool === shovel)
                pickaxe.setAttribute("src", "Assets/shovel.png");
            if (choosenTool === axe)
                pickaxe.setAttribute("src", "Assets/axe.png");

        }
        if (choosenBlockTool === "blockTopLand") {
            event.currentTarget.classList.add("blockTopLand");
            event.currentTarget.setAttribute("src", "Assets/land_bottom_block.png");

            img.setAttribute("src", "Assets/default.png");
            add = false;
            remove = true;
            choosenTool = null;
        }
        if (choosenBlockTool === "blockBottomLand") {
            event.currentTarget.classList.add("blockBottomLand");
            event.currentTarget.setAttribute("src", "Assets/land_top_block.png");
            img.setAttribute("src", "Assets/default.png");
            add = false;
            remove = true;
            choosenTool = null;
        }
        if (choosenBlockTool === "blockTreeLeaf") {
            event.currentTarget.classList.add("blockTreeLeaf");
            event.currentTarget.setAttribute("src", "Assets/tree_leaf.png");
            img.setAttribute("src", "Assets/default.png");
            add = false;
            remove = true;
            choosenTool = null;
        }
        if (choosenBlockTool === "blockTreeTrunk") {
            event.currentTarget.classList.add("blockTreeTrunk");
            event.currentTarget.setAttribute("src", "Assets/tree_trunk.png");
            img.setAttribute("src", "Assets/default.png");
            add = false;
            remove = true;
            choosenTool = null;
        }
    }
}

function chooseToolPickaxe(event) {
    switch (choosenTool) {
        case shovel:
            shovel.setAttribute("src", "Assets/shovel.png");
            break;
        case axe:
            axe.setAttribute("src", "Assets/axe.png");
            break;
    }
    pickaxe.setAttribute("src", "Assets/blue_pickaxe.png");
    choosenTool = pickaxe;
}

function chooseToolShovel(event) {
    switch (choosenTool) {
        case axe:
            axe.setAttribute("src", "Assets/axe.png");
            break;
        case pickaxe:
            pickaxe.setAttribute("src", "Assets/pickaxe.png");
            break;
    }
    shovel.setAttribute("src", "Assets/blue_shovel.png");
    choosenTool = shovel;
}

function chooseToolAxe(event) {
    switch (choosenTool) {//previous tool should be removed from purpule background
        case shovel:
            shovel.setAttribute("src", "Assets/shovel.png");
            break;
        case pickaxe:
            pickaxe.setAttribute("src", "Assets/pickaxe.png");
            break;
    }
    axe.setAttribute("src", "Assets/blue_axe.png");
    choosenTool = axe;
}

function grabBlockToPlaceInWorld(event) {
    debugger;
    if (choosenBlockTool != "") {
        add = true;
        remove = false;
        if (choosenTool === pickaxe)
            pickaxe.setAttribute("src", "Assets/pickaxe.png");
        if (choosenTool === shovel)
            shovel.setAttribute("src", "Assets/shovel.png");
        if (choosenTool === axe)
            axe.setAttribute("src", "Assets/axe.png");

    }
}