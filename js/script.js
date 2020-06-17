import Animations from "./animationManager.js";
import './lang.js';
import Config from "./config.js"
const spin = document.getElementById('spin');
const add_slot = document.getElementById('add-slot');



const slots = ['💎','🔮','🏆'];



const animations = new Animations();

//todo: add user slot
const sleep = (ms) => {
    return new Promise((r) => setTimeout(r, ms));
};
const message = async ({text = [], count = 'infinity', speed = 1000, callback = null}) =>  {
    if(!text[0]) throw new Error('need array for text');
    let i = 0;
    let textIndex = 0;
    while(animations.isPlay('message')) {
        if(count <= i && count !== 'infinity') {
            if(callback) callback();
            else animations.setAnimation('none')
        }
        if(textIndex >= text.length) textIndex = 0;
        document.title = text[textIndex];
        i++;
        textIndex++;
        await sleep(speed)
    }
};
const buttonDisable = (buttons, disable) => {
    if(!buttons[0]) buttons = [buttons];
    for(const button of buttons) {
        if(disable) button.setAttribute('disabled', 'true');
        else button.removeAttribute('disabled');
    }
};
const getSlot = () => {
    const slot = Math.ceil(Math.random()*slots.length-1);
    return slots[slot];
};
const getSlots = () => {
    return slots.map(getSlot);
};
const checkWin = (slots) => {
    for(let i=0;i<slots.length-1;i++) {
        if(slots[i] !== slots[i+1]) {
            alert('GAME OVER');
            animations.setAnimation('main');
            return;
        }
    }
    alert('WIN!!');
    animations.setAnimation('message',
        {text: ['⭐️WINNER', 'WINNER⭐️'], count: 3, speed: 800, callback: () => animations.setAnimation('main')})
};
const slotsAnimation = async () => {
    let speed = 20;
    while (animations.isPlay('game')) {
        const slotsRandom = getSlots();
        document.title = slotsRandom.reduce((acc, val) => {
            return acc + val;
        }, '');
        if(speed >= 1000) {
            checkWin(slotsRandom);
        }
        speed += 50;
        await sleep(speed);
    }
};
const mainAnimation = async () => {
    buttonDisable([spin, add_slot], false);
    let i = 0;
    while (animations.isPlay('main')) {
        if(i === slots.length - 1) i = 0;
        else i++;
        document.title = slots[i].repeat(slots.length);
        await sleep(1000);
    }
};
const StartGame = async () => {
    buttonDisable([spin, add_slot], true);
    animations.setAnimation('message',
        {text: [getSlot(), 'START', 'GAME'], count: 6, speed: 400, callback: () => animations.setAnimation('game')});
};
const AddSlot = async () => {
    buttonDisable([spin, add_slot], true);
    animations.setAnimation('message', {text: ['🎰Getting slot','Getting slot🎰'], speed: 500});
    try {
        const data = await fetch(`https://emoji-api.com/emojis?access_key=${Config.emojikey}`);
        const body = await data.json();
        const emoji = await body[Math.floor(Math.random() * body.length -1)];
        slots.push(emoji.character);
    } catch (e) {
        console.log(e);
        animations.setAnimation('none');
        document.title = 'Error, try again';
        await sleep(800);
    } finally {
        buttonDisable([spin, add_slot], false);
        animations.setAnimation('main');
    }
};

animations.createAnimation('main', mainAnimation);
animations.createAnimation('game', slotsAnimation);
animations.createAnimation('message', message);
//start
animations.setAnimation('main');
spin.addEventListener('click', StartGame);
add_slot.addEventListener('click', AddSlot);

