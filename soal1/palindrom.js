function isPalindrome(x) {
    let str = x.toString();
    let reversedStr = str.split('').reverse().join('');
    
    return str === reversedStr;
}

console.log(isPalindrome(121));
console.log(isPalindrome('test'));
console.log(isPalindrome('ini'));