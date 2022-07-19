
// let inputValue = {"distance": {"unit": "cm", "value": 0.5}, "convert_to": "m"};

//when the user clicks convert button, updateInputValue function is called
function init() {
    const input = document.getElementById('input');
    input.addEventListener("keyup", updateInputValue);
    const inputType = document.getElementById('inputType');
    inputType.addEventListener("change", updateInputValue);
    const resultType = document.getElementById('resultType');
    resultType.addEventListener("change", updateInputValue);
    // const convertButton = document.getElementById('convertBtn');
    // convertButton.addEventListener("click", updateInputValue);

}

init();

function updateInputValue() {
   const inputValue = {
        "distance": {
            "unit": document.getElementById('inputType').value,
            "value": document.getElementById('input').value,
        }
        ,
        "convert_to": document.getElementById('resultType').value
    };

    console.log('inputValue', inputValue);

    getMeasurementsData(inputValue);
}

async function getMeasurementsData(inputValue) {
    console.log('inputValue 2', inputValue);
    const response = await fetch("data.json");
    const measurementsData = await response.json();

    const convertResult = converter(inputValue, measurementsData);
    console.log('convertResult', convertResult.value);

    document.getElementById('result').value = convertResult.value;

}

function converter(inputValue, measurementsData) {
    const sameUnit = measurementsData.find((item) => item.unit === inputValue.distance.unit && item.unit === inputValue.convert_to);

    if(sameUnit) {
        return inputValue.distance;
    }

    const measurementItem = measurementsData.find((item) => {
        return item.unit === inputValue.distance.unit && item.convert_to === inputValue.convert_to;
    });

    const value = (measurementItem.operation === 'multiply') ? inputValue.distance.value * measurementItem.index : inputValue.distance.value / measurementItem.index;
    return {
        unit: inputValue.convert_to,
        value: Number(value).toFixed(2)
    }
}


// let inputValue = {"distance": {"unit": "cm", "value": 0.5}, "convert_to": "m"};
//
// function init() {
//     const convertButton = document.getElementById('convertBtn');
//     convertButton.addEventListener("click", updateInputValue);
// }
//
// init();
//
// function updateInputValue() {
//     inputValue = {
//         "distance": {
//             "unit": document.getElementById('inputType').value,
//             "value": document.getElementById('input').value,
//         }
//         ,
//         "convert_to": document.getElementById('resultType').value
//     };
//
//     console.log('inputValue', inputValue);
//
//     getMeasurementsData();
// }
//
// async function getMeasurementsData () {
//     const response = await fetch("data.json");
//     const measurementsData = await response.json();
//     console.log('getMeasurementsData', measurementsData)
//
//     const convertResult = converter(inputValue, measurementsData);
//
//     document.getElementById('result').value = convertResult.value;
//     console.log('convertResult', convertResult);
// }
//
// function converter(inputValue, measurementsData) {
//     const sameUnit = measurementsData.find((item) => item.unit === inputValue.distance.unit && item.unit === inputValue.convert_to);
//
//     if(sameUnit) {
//         console.log('sameUnit', inputValue);
//         return inputValue.distance;
//     }
//
//     const measurementItem = measurementsData.find((item) => {
//         return item.unit === inputValue.distance.unit && item.convert_to === inputValue.convert_to;
//     });
//
//     console.log('measurementItem', measurementItem);
//
//     const value = (measurementItem.operation === 'multiply') ? inputValue.distance.value * measurementItem.index : inputValue.distance.value / measurementItem.index;
//     console.log('inputValue.distance.value', inputValue.distance.value);
//     console.log('measurementItem.index', measurementItem.index);
//
//     return {
//         unit: inputValue.convert_to,
//         value
//     }
// }
