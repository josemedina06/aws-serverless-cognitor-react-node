let analysisArr = new Array();
let delay = 300;

export const setAnalysis = (analysis) => {
    analysisArr = analysis.analysis.map(anal => (
        {
            id: anal.id,
            name: anal.name,
            url: anal.url,
            date: anal.date
        }
    ));
};

export const fetchAnalysis = () => {
    console.log('action fetch analysis');
    return new Promise(resolve => {
        setTimeout(_=> resolve(analysisArr), delay)
    })
}