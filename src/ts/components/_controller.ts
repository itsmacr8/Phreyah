interface fontScaleFormulaInterface {
    [key: string]: number;
}
const fontScaleFormula:fontScaleFormulaInterface = {
    'minor-second': 1.067,
    'major-second': 1.125,
    'minor-third': 1.200,
    'major-third': 1.250,
    'perfect-fourth': 1.333,
    'augmented-fourth': 1.444,
    'perfect-fifth': 1.500,
    'golden-ratio': 1.618
};

interface fontSizeInterface {
    [key: string]: {
        [key: string]: number;
    };
}
const fontSize:fontSizeInterface = {
    desktop: {},
    mobile: {}
};

const fontForm = document.querySelector('.font-scale-form');
fontForm?.addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const baseFontSize = Number((form.elements.namedItem('base-font-size') as HTMLInputElement).value);
    const scaleRatioName = (form.elements.namedItem('font-scale-ratio') as HTMLSelectElement).value;
    createFontSizes(baseFontSize, scaleRatioName, 'desktop')
    createFontSizes(baseFontSize, scaleRatioName, 'mobile')
    updateDomWithUserFontSize()
});

function createFontSizes(baseFS:number, scaleRatioName:string, screenSize:string) {
    let [h1, h2, h3, h4, h5, h6, baseFontSize, smallText] = getCalcDesktopFontSizes(baseFS, scaleRatioName)
    if (screenSize == 'mobile') {
        [h1, h2, h3, h4, h5, h6, baseFontSize, smallText] = getCalcMobileFontSizes(baseFS, scaleRatioName)
    }
    fontSize[screenSize]['h1'] = h1
    fontSize[screenSize]['h2'] = h2
    fontSize[screenSize]['h3'] = h3
    fontSize[screenSize]['h4'] = h4
    fontSize[screenSize]['h5'] = h5
    fontSize[screenSize]['h6'] = h6
    fontSize[screenSize]['p'] = baseFontSize
    fontSize[screenSize]['small'] = smallText
    console.log(h1, h2, h3, h4, h5, h6, baseFontSize, smallText)
}

function getCalcDesktopFontSizes(baseFontSize:number, ratioName:string) {
    const ratio:number = fontScaleFormula[ratioName]
    return getCalcFontSizes(baseFontSize, ratio)
}

function getCalcMobileFontSizes(baseFontSize:number, ratioName:string) {
    const ratio = fontScaleFormula[getPrevFontScaleFormula(ratioName)]
    const mobileBaseFontSize = Math.round(baseFontSize - Math.round((baseFontSize * ratio) - baseFontSize))
    return getCalcFontSizes(mobileBaseFontSize, ratio)
}

function getPrevFontScaleFormula(currentFormula:string):string {
    const fontScaleFormulas = Object.keys(fontScaleFormula);
    return fontScaleFormulas[fontScaleFormulas.indexOf(currentFormula) - 1];
}

function getCalcFontSizes(baseFontSize:number, ratio:number) {
    const smallText = Math.round(baseFontSize - Math.round((baseFontSize * ratio) - baseFontSize))
    const h6 = Math.round(baseFontSize * ratio)
    const h5 = Math.round(h6 * ratio)
    const h4 = Math.round(h5 * ratio)
    const h3 = Math.round(h4 * ratio)
    const h2 = Math.round(h3 * ratio)
    const h1 = Math.round(h2 * ratio)
    return [h1, h2, h3, h4, h5, h6, baseFontSize, smallText]
}

function updateDomWithUserFontSize() {
    for (const prop of Object.keys(fontSize['desktop'])) {
        const desktopFontSize = `${fontSize['desktop'][prop]}px`
        const mobileFontSize = `${fontSize['mobile'][prop]}px`
        const elements = document.querySelectorAll(prop) as NodeListOf<HTMLElement>
        for (const element of elements) {
            const currentText = `${element.textContent?.split('(')[0]}`;
            element.innerHTML = `${currentText} <strong class='font-info'>(Font size: clamp(${mobileFontSize}, 5vw, ${desktopFontSize});</strong>`;
            element.style.fontSize = `clamp(${mobileFontSize}, 5vw, ${desktopFontSize})`;
        }
    }
}
