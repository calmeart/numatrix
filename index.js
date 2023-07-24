$(document).ready(function() {
    const $dateInput = $('#dateInput');
    const $helperValueContainer = $('.helperValuesContainer');
    const $matrixContainer = $('.matrixContainer');

    let dateSelected;
    let matrix = [];

    $dateInput.change(function(event) {
        dateSelected = event.target.value;

        helper = getHelperValues(dateSelected);
        for (let key of Object.keys(helper)) {
            insertTable(key, helper[key])
        }

        // add first to the matrix
        let secondHelper = splitAndSum(helper.first);
        insertTable('second', secondHelper)

        // calculate third helper
        let thirdHelper = helper.first - (matrix[0][0] * 2);
        // insert second to matrix
        let destiny = splitAndSum(secondHelper);
        insertTable('third', thirdHelper);

        //insert fourth
        let fourthHelper = splitAndSum(thirdHelper);
        insertTable('fourth', fourthHelper);
        splitAndSum(fourthHelper);

        //destiny number
        insertTable('destiny', destiny);

        for (let row of matrix) {
            let num = 8 - row.length;
            row.push(...Array(num).fill(' '));
            for (let col of row) {
                insertMatrix(col);
            }
        }
    });


    /**
     * HELPER FUNCTIONS
     */

    function getHelperValues(date) {
        let day = new Date(date).getDate();
        let month = new Date(date).getMonth() + 1;
        let year = new Date(date).getFullYear();
    
        // add date values to matrix
        return {
            day, 
            month, 
            year,
            first: splitAndSum(day) + splitAndSum(month) + splitAndSum(year)
        };
    };
    
    // split the numbers and add them to matrix
    function splitAndSum(value) {
        let array = value.toString().split('');
        matrix.push(array);
        return array.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    
    function insertTable (key, value) {
        let element = `<div class="helperValues">
        <p>${key.toUpperCase()}: </p>
        <p>${value}</p>
        </div>`;
        $helperValueContainer.append(element);
    };
    
    function insertMatrix(value) {
        $matrixContainer.append(`
        <div class="matrixValues">${value}</div>
        `)
    }
});

