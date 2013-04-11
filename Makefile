all: usage

usage:
	@echo
	@echo "Targets: test compile"
	@echo
	@echo "    test       : run jslint on the file"
	@echo "    compile    : not implemented yet"

test: jquery.textareaCounter.plugin.js
	jshint $<
