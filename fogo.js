const ArrayPixelsFogo = []
const fogoLargura = 40
const fogoAltura = 40
const fogoPaletaCores = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function comecar(){

    criarEstruturaFogo()
    criarFonteFogo()
    renderizarFogo()

    setInterval(calcularPropagacaoFogo, 50)

}

function criarEstruturaFogo(){
    const numeroPixels = fogoLargura * fogoAltura

    for(let i = 0; i < numeroPixels; i++){
        ArrayPixelsFogo[i] = 0 
    }
}

function calcularPropagacaoFogo(){
    for(let coluna = 0; coluna < fogoLargura; coluna++){
        for(let linha = 0; linha < fogoAltura; linha++){
            const pixelIndex = coluna + (fogoLargura * linha)

            updateIntensidadeFogoPorPixel(pixelIndex)
        }
    }
    renderizarFogo()
}

function updateIntensidadeFogoPorPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fogoLargura

    if(belowPixelIndex >= fogoLargura * fogoAltura){
        return
    }

    const decair = Math.floor(Math.random() * 3) 
    const belowPixelIntensidadeFogo = ArrayPixelsFogo[belowPixelIndex]
    const novaIntensidadeFogo = belowPixelIntensidadeFogo - decair >= 0 ? belowPixelIntensidadeFogo - decair: 0


    ArrayPixelsFogo[currentPixelIndex - decair] = novaIntensidadeFogo
}

function renderizarFogo(){
    const debug = false
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let linha = 0; linha < fogoAltura; linha++){
        html += '<tr>'

        for (let coluna = 0; coluna < fogoLargura; coluna++){
            const pixelIndex = coluna + (fogoLargura * linha)
            const IntensidadeFogo = ArrayPixelsFogo[pixelIndex]

            if(debug === true){
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += IntensidadeFogo 
                html += '</td>'
            }else {
                const color = fogoPaletaCores[IntensidadeFogo]
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
             }
            
        }

        html += '</tr>'
    }

    html +=  '</table>'

    document.querySelector('#fogoCanvas').innerHTML = html
}

function criarFonteFogo(){
    for(let coluna = 0; coluna <= fogoLargura; coluna++){
        const overflowPixelIndex = fogoLargura * fogoAltura
        const pixelIndex = (overflowPixelIndex - fogoLargura) + coluna

        ArrayPixelsFogo[pixelIndex] = 36
    }
}


comecar()