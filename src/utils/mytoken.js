// - 新增： window.localstorage.setItem(key, value)
// - 删除：window.localstorage.removeItem(key)
// - 修改：
//   - 没有修改的方法，如果要修改只能将原来的数据覆盖掉
//   - window.localstorage.setItem(key, value)
// - 查询：window.localstorage.getItem(key)

// 定义一个统一的key
const TOKEN_KEY = 'heimm'
// 设置token
export function setToken(value){
window.localStorage.setItem(TOKEN_KEY,value)
}
// 获取token
export function getToken(){
    return window.localStorage.getItem(TOKEN_KEY)
}

// 删除token
export function removeToken(){
    window.localStorage.removeItem(TOKEN_KEY)
}