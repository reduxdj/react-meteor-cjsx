var reactTools = Npm.require('react-tools'),
	coffee = Npm.require('coffee-script'),
	cjsx = Npm.require('coffee-react-transform');

function handler(compileStep) {
  	var 	source = compileStep.read().toString('utf8'),
  			outputFile = compileStep.inputPath + ".coffee",
  			cs;

 	cs = coffee.compile( cjsx(source) );
  	compileStep.addJavaScript({path:outputFile,sourcePath:compileStep.inputPath,data:cs});
}

Plugin.registerSourceHandler("cjsx", handler);