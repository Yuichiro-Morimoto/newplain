const stage = document.getElementById("stage");
const squareTemplate = document.getElementById("square-template");
const stoneStateList = [];
let currentColor = 1;
const currentTurnText = document.getElementById("current-turn");
const passButton = document.getElementById("pass");

const changeTurn = () => {
    currentColor = 3 - currentColor;

    if (currentColor === 1) {
        currentTurnText.textContent = "黒";
    } else {
        currentTurnText.textContent = "白";
    }
}

const getReversibleStones = (idx) => {
    const squareNums = [
        7 - (idx % 8),
        Math.min(7 - (idx % 8), (56 + (idx % 8) - idx) / 8),
        (56 + (idx % 8) - idx) / 8,
        Math.min(idx % 8, (56 + (idx % 8) - idx) / 8),
        idx % 8,
        Math.min(idx % 8, (idx - (idx % 8)) / 8),
        (idx - (idx % 8)) / 8,
        Math.min(7 - (idx % 8), (idx - (idx % 8)) / 8),
    ];
    const parameters = [1, 9, 8, 7, -1, -9, -8, -7];


    let results = [];

    for (let i = 0; i < 8; i++) {
        const box = [];
        const squareNum = squareNums[i];
        const param = parameters[i];
        const nextStoneState = stoneStateList[idx + param];

        if (nextStoneState === 0 || nextStoneState === currentColor) continue;
        box.push(idx + param);

        for (let j = 0; j < squareNum - 1; j++) {
            const targetIdx = idx + param * 2 + param * j;
            const targetColor = stoneStateList[targetIdx];
            if (targetColor === 0) continue;
            if (targetColor === currentColor) {
                results = results.concat(box);
                break;
            } else {
                box.push(targetIdx);
            }
        }
    }
    return results;
};

const onClickSquare = (index) => {
    const reversibleStones = getReversibleStones(index);

    if (stoneStateList[index] !== 0 || !reversibleStones.length) {
        return;
    }

    stoneStateList[index] = currentColor;
    document
        .querySelector(`[data-index='${index}']`)
        .setAttribute("data-state", currentColor);

    reversibleStones.forEach((key) => {
        stoneStateList[key] = currentColor;
        document.querySelector(`[data-index='${key}']`).setAttribute("data-state", currentColor);
    });

    if (stoneStateList.every((state) => state !== 0)) {
        const blackStonesNum = stoneStateList.filter(state => state === 1).length;
        const whiteStonesNum = 64 - whiteStonesNum;
    }

    changeTurn();
}

const createSquares = () => {
    for (let i = 0; i < 64; i++) {
        const square = squareTemplate.cloneNode(true);
        square.removeAttribute("id");
        stage.appendChild(square);

        const stone = square.querySelector('.stone');

        let defaultState;
        if (i == 27 || i == 36) {
            defaultState = 1;
        } else if (i == 28 || i == 35) {
            defaultState = 2;
        } else {
            defaultState = 0;
        }

        stone.setAttribute("data-state", defaultState);
        stone.setAttribute("data-index", i);
        stoneStateList.push(defaultState);

        square.addEventListener('click', () => {
            onClickSquare(i);
        });
    }
}

window.onload = () => {
    createSquares();
    passButton.addEventListener("click", changeTurn)
}

document.querySelector(`.stage`).animate(
    [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' }
    ],
    {
        duration: 200000,
        easing: 'linear',
        iterations: Infinity
    }
);

