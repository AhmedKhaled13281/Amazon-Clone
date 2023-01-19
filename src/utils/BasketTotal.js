export const getBasketTotal = (basket) => {
    let sum = 0
    basket.forEach(ele => {
        sum += ele.price * ele.amount
    });
    return sum
}