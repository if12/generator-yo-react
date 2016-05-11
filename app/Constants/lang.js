/*
* @Author: RoyChen
* @Date:   2016-03-17 16:37:48
* @Last Modified by:   RoyChen
* @Last Modified time: 2016-04-20 19:16:17
*/

'use strict';


const lang = {
  welcome:'  _  _  _____       ____  ____    __     ___  ____ '  + '\n' +
          ' ( \\/ )(  _  ) ___ (  _ \\( ___)  /__\\   / __)(_  _)' + '\n' +
          '  \\  /  )(_)( (___) )   / )__)  /(__)\\ ( (__   )(  ' + '\n' +
          '  (__) (_____)     (_)\\_)(____)(__)(__) \\___) (__) ',
  English: {
  	name:             "React Component Name:",
  	author:           "Athor:",
  	version:          "Component Version:",
  	description:      "Description Of React Component:",
  	isPublic:         "Do you want to public the Component ?:",
    CSSBuilder:       "Choose the CSS pre-processer",
  	packageInstaller: "Choose the tools for installing dependencies:",
  	initDepedencies:  "choose your dependencies 【Move up and down to reveal more choices】:"
  },

  Chinese: {
  	name:             "请输入组件名称：",
  	author:           "作者：：",
  	version:          "版本号：",
  	description:      "组件描述：",
  	isPublic:         "是否发布到NPM：",
    CSSBuilder:       "请选择CSS预处理器",
  	packageInstaller: "请选择包安装工具：",
  	initDepedencies:  "选择组件依赖，【上下方向键查看，空格键选中】："
  }
}



module.exports = lang;