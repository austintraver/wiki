#!/bin/zsh

typeset filename=${${(%):-%N}:A:t}

if ((${#} != 1)) {
	print "${filename}: invalid # of commands" >&2
	exit 1
}

if [[ ${1} == 'before' ]] {
	hugo
} elif [[ ${1} == 'after' ]] {
	firebase open 'hosting:site'
} else {
	print -- "${filename}: unrecognized argument ${1}" >&2
	exit 1
}

exit 0
