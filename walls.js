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
    // predefined_walls[utils.asGridCord(11, 7)] = true;

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

window.artgallery = () => {
    let events = [
        {type: "textMessage", text: "'cause An art gallery could never be as unique as you"},
        {type: "imagePopupWithText", src: "./images/m/acrobat_on_a_ball.gif", text: "Acrobat on a Ball, Pablo Picasso"},
        {type: "imagePopupWithText", src: "./images/m/waves.gif", text: "The Great Wave off Kanagawa, Hokusai"},
        {type: "imagePopupWithText", src: "./images/m/girl_with_a_pearl.jpg", text: "Girl With a Pearl Earring, Johannes Vermeer"},
        {type: "imagePopupWithText", src: "./images/m/two_fridas.jpg", text: "The Two Fridas, Frida Kahlo"},
        {type: "imagePopupWithText", src: "./images/m/hideandseek.jpg", text: "Hide-and-Seek, Friedrich Eduard Meyerheim"},
        {type: "imagePopupWithText", src: "./images/m/narcissus.jpg", text: "Narcissus, Caravaggio"},
        {type: "imagePopupWithText", src: "./images/m/selfportrait.jpeg", text: "Self Portrait, Dedicated to Dr Eloesser, Frida Kahlo"},
        {type: "imagePopupWithText", src: "./images/m/madameX.jpg", text: "Madame X, John Singer Sargent"},
        {type: "imagePopupWithText", src: "./images/m/doggu.jpg", text: "Girl with Dogs, Charles Burton Barber"},
        {type: "imagePopupWithText", src: "./images/m/sleep.jpeg", text: "The Ciesta, Vincent Van Gogh"},
        {type: "textMessage", text: "Add more paintings by making more memories!"}
    ]

    return events
}

window.nearspotify = () => {
    let events = [
        {type: "textMessage", text : "Sol: Can you hear that too?!"}
    ]

    return events;
}

window.shopevents = () => {
    let events = [
        {type: "textMessage", text: "Dream Shop: Limited Scenarios only, you are still an amateur dreamer :)"},
        {type: "textMessage", text: "Sol: sjsjs TT show me anything cute have"},
        {type: "imagePopupWithText", src: "./images/m/shower.jpg", text: "Shower Dream"},
        {type: "imagePopupWithText", src: "./images/m/romanticPicnic.jpg", text: "Romantic Picnic"},
        {type: "imagePopupWithText", src: "./images/m/cuteDream.png", text: "Making Cute Reel"},
        {type: "imagePopupWithText", src: "./images/m/deep.jpeg", text: "Deep Conversation"},
        {type: "imagePopupWithText", src: "./images/m/travelMate.jpg", text: "Travel Matey"},
        {type: "imagePopupWithText", src: "./images/m/sleeping_bag.jpg", text: "Human Sleeping Bag"},
        {type: "imagePopupWithText", src: "./images/m/makeupText.png", text: "Makeup Testing :')"},
        {type: "imagePopupWithText", src: "./images/m/analog.webp", text: "Analog Cam Modelling"},
        {type: "textMessage", text: "Practice Lucid Dreaming for More, good luck."},
    ]

    return events;
}