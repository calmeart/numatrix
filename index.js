$(document).ready(function() {
    const $dateInput = $('#dateInput');
    const $resultContainer = $('section.results');

    $dateInput.change(function(event) {
        $resultContainer.css("display", "none");
        $('.appended').remove();

        let dateSelected = event.target.value;
        let helper = getHelperValues(dateSelected);
        let matrix = formMatrix(helper);
        let object = formCharacterNumbers(matrix, helper);

        $(`.flexContainer div.date`).append(`<p class="appended">${convertDate(dateSelected)}</p>`);
        for (let key in object) {
            let string = object[key] == 0 || object[key] == '' || object[key] == '-' ? "---" : object[key]
            $(`.flexContainer div.${key}`).append(`<p class="appended">${string}</p>`);

            // select the explanation from json
            let exp = '';
            if (key === 'character') {
                if (string === '---') {
                    if (object.responsibility.includes('8')) {
                        exp = data[key]["w8"].ru
                    } else {
                        exp = data[key]["wout8"].ru
                    }
                } else {
                    if (!!data[key][string]) {
                        exp = data[key][string].ru
                    } else {
                        exp = data[key]["max"].ru
                    }
                }
            } else {
                if (string === '---') {
                    exp = data[key]["-"].ru
                } else {
                    if (!!data[key][string]) {
                        exp = data[key][string].ru
                    } else {
                        exp = data[key]["max"].ru
                    }
                }
            }
            
            $(`.explanationContainer div.${key}`).append(`<span class="appended">${exp}</span>`);
        }

        $resultContainer.css("display", "flex");
    });


    /**
     * HELPER FUNCTIONS
     */

    function getHelperValues(date) {
        let day = new Date(date).getDate();
        let month = new Date(date).getMonth() + 1;
        let year = new Date(date).getFullYear();
        let first = splitAndSum(day) + splitAndSum(month) + splitAndSum(year);
        let second = splitAndSum(first);
        let third = parseInt(first) - (2 * (parseInt(day.toString()[0])));
        let fourth = splitAndSum(third);
        let destiny = splitAndSum(second);
    
        return {
            day, 
            month, 
            year,
            first,
            second,
            third,
            fourth,
            destiny
        };
    };
    
    // split the numbers
    function splitAndSum(value) {
        let array = value.toString().split('');
        return array.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }

    function convertDate(date) {
        date = new Date(date);
        return `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`
    }

    function formMatrix(helper) {
        let string = '';
        for (let key in helper) {
            if (key !== 'destiny') string = string.concat(helper[key]);
        }

        let array = string.split('');
        let matrix = {};

        for (let i = 1; i < 10; i++) {
            matrix[i] = array.filter(item => item == i).length;
        }

        return matrix;
    }

    function formCharacterNumbers(matrix, helper) {
        return {
            character: matrix[1] > 0 ? "1".repeat(matrix[1]) : "-",
            energy: matrix[2] > 0 ?"2".repeat(matrix[2]) : "-",
            interest: matrix[3] > 0 ?"3".repeat(matrix[3]) : "-",
            health: matrix[4] > 0 ?"4".repeat(matrix[4]) : "-",
            logic: matrix[5] > 0 ?"5".repeat(matrix[5]) : "-",
            effort: matrix[6] > 0 ?"6".repeat(matrix[6]) : "-",
            luck: matrix[7] > 0 ?"7".repeat(matrix[7]) : "-",
            responsibility: matrix[8] > 0 ?"8".repeat(matrix[8]) : "-",
            memory: matrix[9] > 0 ?"9".repeat(matrix[9]) : "-",
            destiny: helper.destiny,
            goal: matrix[1] + matrix[4] + matrix[7],
            family: matrix[2] + matrix[5] + matrix[8],
            habits: matrix[3] + matrix[6] + matrix[9],
            confidence: matrix[1] + matrix[2] + matrix[3],
            materiality: matrix[4] + matrix[5] + matrix[6],
            talent: matrix[7] + matrix[8] + matrix[9],
            spirituality: matrix[1] + matrix[5] + matrix[9],
            temperament: matrix[3] + matrix[5] + matrix[7],
        }
    }
    
});
