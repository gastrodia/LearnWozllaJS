/**
 *
 * 解决WebStorm下jasmine函数语法分析出错, 导致函数名下面出现波浪线
 *
 */

window.expect = window.expect || function expect() {};
window.describe = window.describe || function describe() {};
window.beforeEach = window.beforeEach || function beforeEach() {};
window.afterEach = window.afterEach || function afterEach() {};
window.it = window.it || function it() {};
window.spyOn = window.spyOn || function spyOn() {};