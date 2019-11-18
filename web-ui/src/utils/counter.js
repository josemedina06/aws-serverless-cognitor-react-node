var count = 0;
function setcount() {
    count++;
};

export const startCount = () => {
    setInterval(() => {
        setcount();
    }, 60000)
};

export const stopCount = () => {
    clearInterval(startCount);
    return count;
}