let worksheetArr = new Array();
let delay = 300;

export const setWorksheet = (worksheets) => {
    worksheetArr = worksheets.worksheets.map(worksheet => (
        {
            id: worksheet.id,
            worksheet_name: worksheet.worksheet_name,
            worksheet_url: worksheet.worksheet_url
        }
    ));
};

export const fetchWorksheets = () => {
    console.log('action fetch worksheets');
    return new Promise(resolve => {
        setTimeout(_=> resolve(worksheetArr), delay)
    })
}