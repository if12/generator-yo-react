/* 
* @Author:             Roy
* @Date:               2016-03-15 17:11:12
* @Description:        
* @Email:              chenxuezhong@360.cn
* @Last Modified by:   RoyChen
* @Last Modified time: 2016-05-11 17:27:26
*/


/*  _  _  _____       ____  ____    __     ___  ____ 
   ( \/ )(  _  ) ___ (  _ \( ___)  /__\   / __)(_  _)
    \  /  )(_)( (___) )   / )__)  /(__)\ ( (__   )(  
    (__) (_____)     (_)\_)(____)(__)(__) \___) (__) 
*/

'use strict';
const dependency = require('./Constants/dependencyList.js');
const Lang       = require('./Constants/lang.js');
const loaders    = require('./Constants/loaders');

const Generator  = require('yeoman-generator');
const glob       = require('glob');
const path       = require('path');
const fs         = require('fs');

module.exports = Generator.Base.extend({

	constructor: function(){
		Generator.Base.apply(this, arguments);
 		this.option('port', {type: Number, defaults: '3000'});


 		String.prototype.firstUpperCase = function(){	//首字母大写
		    return this.replace(/^\S/,function(s){return s.toUpperCase();});
		}
		String.prototype.camelCase = function(){	//小驼峰
			return this.replace(/-\w/g, function(m){
				return m.charAt(1).toUpperCase();
			})
		}
	},

	initializing: function (){
		this.log(Lang['welcome']);
		
		let language = this.config.get('language');
		if (!language){
			this._chooseLanguage();
		}else{
			this.lang = Lang[language];
		}
	},

	prompting: function(){
		let me   = this;
		let lang = me.lang;
		let done = this.async();
		const Q  = [
			{
				type:    'input',
				name:    'name',
				message: lang['name'],
				default: this.appname
			},
			{
				type:    'input',
			  	name:    'author',
			  	message: lang['author'],
			  	store:   true
			},
			{
				type:    'input',
			  	name:    'version',
			  	message: lang['version'],
			  	default: '1.0.0',
			  	store:   true
			},
			{
				type:    'input',
				name:    'description',
				message: lang['description'],
				default: `${this.appname} ui component for React`
			},
			{
				type:    'confirm',
			  	name:    'isPublic',
			  	message: lang['isPublic'],
			  	sotre:   true,
			  	default: false
			},
			{
				type:    'list',
			  	name:    'CSSBuilder',
			  	message: lang['CSSBuilder'],
			  	choices: ['less','sass'],
			  	default: 'less',
			  	store:   true,
			},
			{
				type:    'list',
			  	name:    'packageInstaller',
			  	message: lang['packageInstaller'],
			  	choices: ['npm','bower'],
			  	default: 'npm',
			  	store:   true,
			},
			{
				type:    'checkbox',
			  	name:    'initDepedencies',
			  	message: lang['initDepedencies'],
			  	choices: Object.keys(dependency['dependencyList']),
			  	store:   true
			}
		]
		this.prompt(Q, function(answer){
			me.answer = answer;
			me.answer.appName = answer.name.replace(/\s/g, '-').camelCase();
			done();
		});
	},

	writing: function(){
		let me              = this;
		const answer        = Object.assign(me.answer, this.options ,loaders);
		me._generatorDirectory(answer);
	},

	install:function(){
		this._installDependencies();
	},

	end: function(){
		this.log('Done');
		this.log('Start to Write your React Component');
	},

	_installDependencies: function(){
		let me               = this;
		let packageInstaller = me.answer.packageInstaller;
		let CSSBuilder       = me.answer.CSSBuilder;
		let DevDependencies  = [ ...dependency['devDependencies'], `${CSSBuilder}-loader`, `${CSSBuilder}`];
		let pkgList          = [];

		me.answer.initDepedencies.map( (key) =>{
			pkgList.push(dependency['dependencyList'][key]);
		});

		// install dependencies
		if (pkgList && pkgList.length){	
			me.runInstall(packageInstaller, pkgList, {	
				skipMessage: true,
				save:     true
			});
		}

		//install DevDependencies
		me._getBabelDev(DevDependencies);
		me.runInstall(packageInstaller, DevDependencies, {	
			skipMessage : true,
			saveDev: true
		},function(){
			// 梳理NPM node_modules中包依赖关系，减少冗余
			me.log('梳理NPM node_modules中包依赖关系，减少冗余');
			me.spawnCommandSync('npm', ['dedupe']);
		});
	},

	_getBabelDev:function(pkgList){
		let babelrc  = JSON.parse(fs.readFileSync(this.destinationPath('.babelrc')));
		for (let type in babelrc){
			babelrc[type].map((p) => {
				let  t = type.replace(/[s]{1}$/,'');
				pkgList.push(`babel-${t}-${p}`);
			})
		}
		return pkgList;
	},

	_generatorDirectory(data){
		let me           = this;
		const sourceRoot = me.sourceRoot();
		const destRoot   = me.destinationRoot();
  		let files 		 = glob.sync('**', { dot: true, nodir: true, cwd: sourceRoot });
  		files.map( (file) => {
  			let filePath = path.join(sourceRoot, file);	
  			let dest     = path.join(destRoot, file);
  			let dirName  = path.dirname(file);
  			let baseName = path.basename(file);

  			if (baseName.indexOf('~') === 0){		//以～开头为模板文件，需要动态传入参数生成最终模块 语法遵循ejs；
  				dest = path.join(destRoot, dirName, baseName.replace(/^~/,''));
  				me.template(file, dest, data);

  			}else{	//其它文件直接copy；
  				me.copy(filePath, dest);
  			}
  		})
	},


	_chooseLanguage: function(){
		let me   = this;
		let done = this.async();
		const L  = [
			{
				type:    'list',
				name:    'Language',
				message: '选择语言版本（choose the language）',
				choices: ['Chinese','English'],
				default: 'Chinese',
				store:   true
			}
		];

		this.prompt(L, function(answer){
			me.lang = Lang[answer.Language];
			me.config.set('language',answer.Language);
			done();
		});
	}


})