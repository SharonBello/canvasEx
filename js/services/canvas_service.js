'use strict'

const gTouchEvs = ['touchdown', 'touchmove', 'touchend', 'touchout']

let gElCanvas
let gCtx
let gCurrShape

let pen = {
    x: 0,
    y: 0,
    isDown: false
}

function draw(ev) {
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
    const {
        x,
        y
    } = pen

    switch (gCurrShape) {
        case 'line':
            drawLine(x, y)
            break;
        case 'circle':
            drawArc(x, y)
            break;
        case 'triangle':
            drawTriangle(x, y)
            break;
        case 'rect':
            drawRect(x, y)
            break;
        case 'free':
            freeDraw(x, y)
            break;
        case 'zigzag':
            drawZigzag(x, y)
            break;
        case 'spiral':
            drawSpiral(x, y)
            break;
        case 'tree':
            drawTree(x, y)
            break;
        case 'cloud':
            drawCloud(x, y)
            break;
        case 'gear':
            drawGear(x, y)
            break;
    }
}

function setShape(shape) {
    gCurrShape = shape.value
}

function getShape() {
    return gCurrShape
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', penDown)
    gElCanvas.addEventListener('mousemove', freeDraw)
    gElCanvas.addEventListener('mouseup', isPenDown)
    gElCanvas.addEventListener('mouseout', isPenDown)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchdown', penDown)
    gElCanvas.addEventListener('touchmove', freeDraw)
    gElCanvas.addEventListener('touchend', isPenDown)
    gElCanvas.addEventListener('mouseout', isPenDown)
}