const isEmpty = (str) => {
    if (str === null || str === "" || str === undefined) {
        return true
    }
    return false
} 

// 根据传过来的类型选择 校验方法
const checkValueByType = (type, value) => {
    //校验手机号
    if (type === "phone") {
        if (!isValidPhone(value)) {
            return false;
        }
        return true;
    }
    //校验邮箱
    else if (type === "email") {
        if (!isValidEmail(value)) {
            return false;
        }
        return true;
    }
}


const isValidPhone=(value) =>{  
    const phoneRegex = /^1[3-9]\d{9}$/;  
    return phoneRegex.test(value);
}  

const isValidEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value)
}

// 截取第一个分号后的内容
const ContentAfterFirstSemicolon=(str)=> {  
    const semicolonIndex = str.indexOf(':');  
    
    // 检查分号是否存在  
    if (semicolonIndex !== -1) {  
        // 截取分号后的内容  
        return str.substring(semicolonIndex + 1).trim(); // 使用trim()去除前后的空格  
    }  
    
    // 如果分号不存在，返回原字符串或空字符串  
    return '';  
} 


export default {
    isEmpty,
    checkValueByType,
    isValidPhone,
    ContentAfterFirstSemicolon
}