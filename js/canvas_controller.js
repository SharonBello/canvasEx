'use strict'

function init() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    addListeners()
}

const fillColor = document.querySelector('input[name="fillColor"]')
const penColor = document.querySelector('input[name="penColor"]')
const penWidth = document.querySelector('input[class="penWidth"]')
const clear = document.querySelector('.clear')
const download = document.querySelector('.download')


function isPenDown() {
    pen.isDown = false
}

function drawLine(x, y, xEnd = 250, yEnd = 250) {
    gCtx.lineWidth = penWidth.value
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.strokeStyle = penColor.value
    gCtx.stroke()
}

function drawZigzag(xStart = 85, yStart = 70, zigzagSpacing = 60) {
    gCtx.beginPath()
    gCtx.lineWidth = penWidth.value
    gCtx.moveTo(xStart, yStart)
    for (let n = 0; n < 7; n++) {
        let x = xStart + ((n + 1) * zigzagSpacing)
        let y
        // if n is even... y = startY + 100 } else { // if n is odd... y = startY }
        (n % 2 == 0) ? y = yStart + 100: y = yStart

        gCtx.lineTo(x, y)
    }
    gCtx.strokeStyle = penColor.value
    gCtx.stroke()
}

function drawSpiral(x, y) {
    let radius = 0
    let angle = 0
    gCtx.beginPath()
    gCtx.lineWidth = penWidth.value
    gCtx.moveTo(x, y)
    for (let n = 0; n < 150; n++) {
        radius += 0.75
        angle += (Math.PI * 2) / 50
        let x = gElCanvas.width / 2 + radius * Math.cos(angle)
        let y = gElCanvas.width / 2 + radius * Math.sin(angle)

        gCtx.lineTo(x, y)
    }
    gCtx.strokeStyle = penColor.value
    gCtx.stroke()
}

// Use recursive function to create a random tree
function drawTree(xStart, yStart, trunkWidth = 50, level) {
    level = 0
    if (level < 12) {
        let newX = 100 / (level + 2)
        let newY = 200 / (level + 2)

        let topRightX = xStart + Math.random() * newX
        let topRightY = yStart - Math.random() * newY

        let topLeftX = xStart - Math.random() * newX
        let topLeftY = yStart - Math.random() * newY


        //right branches
        gCtx.beginPath()
        gCtx.moveTo(xStart + trunkWidth / 4, yStart)
        gCtx.quadraticCurveTo(xStart + trunkWidth / 4, yStart - trunkWidth, topRightX, topRightY)
        gCtx.lineWidth = trunkWidth
        gCtx.lineCap = 'round'
        gCtx.stroke()

        //left branches
        gCtx.beginPath()
        gCtx.moveTo(xStart - trunkWidth / 4, yStart)
        gCtx.quadraticCurveTo(xStart - trunkWidth / 4, yStart - trunkWidth, topLeftX, topLeftY)
        gCtx.lineWidth = trunkWidth
        gCtx.lineCap = 'round'
        gCtx.stroke()

        drawTree(topRightX, topRightY, trunkWidth * 0.7, level + 1)
        drawTree(topLeftX, topLeftY, trunkWidth * 0.7, level + 1)
    }
}

function drawCloud(xStart = 200, yStart = 100) {
    // Transparent value
    gCtx.globalAlpha = 0.5

    gCtx.beginPath()
    gCtx.moveTo(xStart, yStart)
    gCtx.bezierCurveTo(xStart - 40, yStart + 20, xStart - 40, yStart + 70, xStart + 60, yStart + 70)
    gCtx.bezierCurveTo(xStart + 80, yStart + 100, xStart + 150, yStart + 100, xStart + 170, yStart + 70)
    gCtx.bezierCurveTo(xStart + 250, yStart + 70, xStart + 250, yStart + 40, xStart + 220, yStart + 20)
    gCtx.bezierCurveTo(xStart + 260, yStart - 40, xStart + 200, yStart - 50, xStart + 170, yStart - 30)
    gCtx.bezierCurveTo(xStart + 150, yStart - 75, xStart + 80, yStart - 60, xStart + 80, yStart - 30)
    gCtx.bezierCurveTo(xStart + 30, yStart - 75, xStart - 20, yStart - 60, xStart, yStart)
    gCtx.closePath()

    //add a radial gradient 
    let grdCenterX = 260
    let grdCenterY = 80
    let grd = gCtx.createRadialGradient(grdCenterX, grdCenterY, 10, grdCenterX, grdCenterY, 200)
    grd.addColorStop(0, "#8ED6FF") // light blue 
    grd.addColorStop(1, "#004CB3") // dark blue 
    gCtx.fillStyle = grd
    gCtx.fill()

    // set the line width and stroke color 
    gCtx.lineWidth = 5
    gCtx.strokeStyle = "#0000ff"
    gCtx.stroke()
}

function drawGear(x, y) {
    let centerX = gElCanvas.width / 2
    let centerY = gElCanvas.height / 2
    let outerRadius = 95
    let innerRadius = 50
    let midRadius = innerRadius * 1.6
    let holeRadius = 10
    let numPoints = 50

    // draw gear teeth 
    gCtx.beginPath()
    gCtx.lineJoin = "bevel"
    for (let n = 0; n < numPoints; n++) {
        let radius = null
        if (n % 2 == 0) {
            radius = outerRadius
        }
        // draw teeth connection which lies somewhere between the gear center and gear radius 
        else {
            radius = innerRadius
        }
        let theta = ((Math.PI * 2) / numPoints) * (n + 1)
        x = (radius * Math.sin(theta)) + centerX
        y = (radius * Math.cos(theta)) + centerY
        // if first iteration, use moveTo() to position the drawing cursor 
        if (n == 0) {
            gCtx.moveTo(x, y)
        }
        // if any other iteration, use lineTo() to connect sub paths 
        else {
            gCtx.lineTo(x, y)
        }
    }
    gCtx.closePath()
    gCtx.lineWidth = 5
    gCtx.strokeStyle = "#004CB3"
    gCtx.stroke()

    // draw gear body 
    gCtx.beginPath()
    gCtx.arc(centerX, centerY, midRadius, 0, 2 * Math.PI, false)

    // create a linear gradient 
    let grd = gCtx.createLinearGradient(230, 0, 370, 200)
    grd.addColorStop(0, "#8ED6FF") // light blue 
    grd.addColorStop(1, "#004CB3") // dark blue 
    gCtx.fillStyle = grd
    gCtx.fill()
    gCtx.lineWidth = 5
    gCtx.strokeStyle = "#004CB3"
    gCtx.stroke()

    // draw gear hole 
    gCtx.beginPath()
    gCtx.arc(x, y, holeRadius, 0, 2 * Math.PI, false)
    gCtx.fillStyle = "white"
    gCtx.fill()
    gCtx.strokeStyle = "#004CB3"
    gCtx.stroke()
}

function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = penWidth.value
    gCtx.moveTo(x, y)
    gCtx.lineTo(200, 330)
    gCtx.lineTo(50, 370)
    gCtx.lineTo(x, y)
    // gCtx.closePath()
    gCtx.fillStyle = fillColor.value
    gCtx.fill()
    gCtx.strokeStyle = penColor.value
    gCtx.stroke()
}

function drawRect(x, y) {
    gCtx.rect(x, y, 200, 200)
    gCtx.fillStyle = fillColor.value
    gCtx.fillRect(x, y, 200, 200)
    gCtx.strokeStyle = penColor.value
    gCtx.stroke()
}

function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = penWidth.value
    gCtx.arc(x, y, 50, 0, 2 * Math.PI)
    gCtx.fillStyle = fillColor.value
    gCtx.fill()
    gCtx.strokeStyle = penColor.value
    gCtx.stroke()
}

function freeDraw(e) {
    if ((!pen.isDown) || (getShape() !== 'free')) return

    gCtx.beginPath()
    gCtx.lineWidth = penWidth.value
    gCtx.moveTo(pen.x, pen.y)
    gCtx.lineTo(e.offsetX, e.offsetY)
    gCtx.strokeStyle = penColor.value
    gCtx.stroke()
    pen.x = e.offsetX
    pen.y = e.offsetY
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function penDown(e) {
    pen.isDown = true
    pen.x = e.offsetX
    pen.y = e.offsetY
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Amazing'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}