window.bigmapwalls1 = () => {

    let predefined_walls = {}

    for(let i = 0; i < 33; ++i){
        predefined_walls[utils.asGridCord(-1, i)] = true
        predefined_walls[utils.asGridCord(23, i)] = true
    }

    for(let i = 0; i < 45; ++i){
        predefined_walls[utils.asGridCord(i, -1)] = true
        predefined_walls[utils.asGridCord(i, 13)] = true
    }

    for(let i = 0; i < 7; ++i){
        predefined_walls[utils.asGridCord(i, 5)] = true;
    }

    predefined_walls[utils.asGridCord(1, 5)] = false;
    predefined_walls[utils.asGridCord(1, 4)] = true;

    predefined_walls[utils.asGridCord(7, 4)] = true;

    for(let i=8; i < 16; ++i){
        predefined_walls[utils.asGridCord(i, 3)] = true;
    }

    for(let i=0; i<13; ++i){
        predefined_walls[utils.asGridCord(i, 8)] = true;
    }

    // for(let i=1; i<5; ++i){
    //     predefined_walls[utils.asGridCord(i, 7)] = true;
    // }

    predefined_walls[utils.asGridCord(10, 7)] = true;
    predefined_walls[utils.asGridCord(10, 6)] = true;
    predefined_walls[utils.asGridCord(11, 7)] = true;

    predefined_walls[utils.asGridCord(15, 6)] = true;
    predefined_walls[utils.asGridCord(15, 7)] = true;


    for(let i = 15; i < 23; ++i){
        predefined_walls[utils.asGridCord(i, 8)] = true;
    }

    predefined_walls[utils.asGridCord(17, 3)] = true;
    predefined_walls[utils.asGridCord(17, 2)] = true;

    for(let i = 18; i < 23; ++i){
        predefined_walls[utils.asGridCord(i, 5)] = true;
        predefined_walls[utils.asGridCord(i, 3)] = true;
    }

    predefined_walls[utils.asGridCord(15, 1)] = true;
    predefined_walls[utils.asGridCord(15, 2)] = true;
    predefined_walls[utils.asGridCord(12, 0)] = true;

    predefined_walls[utils.asGridCord(12, 1)] = true;
    predefined_walls[utils.asGridCord(13, 1)] = true;
    predefined_walls[utils.asGridCord(14, 1)] = true;


    predefined_walls[utils.asGridCord(19, 5)] = false;
    predefined_walls[utils.asGridCord(19, 4)] = true;
    predefined_walls[utils.asGridCord(18, 4)] = true;

    return predefined_walls;
}
