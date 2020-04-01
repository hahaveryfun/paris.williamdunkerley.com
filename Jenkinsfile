#!/usr/bin/env groovy

node {
	stage('Clean Work Space') {
		cleanWs()
		sh 'pwd'
		sh 'ls'
	}
	stage('Checkout') {
		checkout scm
		sh 'git submodule update --init'
		echo "Branch Name: ${env.BRANCH_NAME}"
	}
	stage('Build') {
		sh 'yarn install'
		sh 'yarn build'
	}
	stage('Deploy') {
		String location = null;
		if (env.BRANCH_NAME == "master") {
			location = 'berlin';
		}
		if (env.BRANCH_NAME == "release") {
			location = 'vienna';
		}
		if (env.BRANCH_NAME.contains("feature/")) {
			location = 'perth';
		}
		if (location != null) {
			sh 'scp -r ./dist/* paris.williamdunkerley.com:/home/jenkins/'+location+'.williamdunkerley.com'
			sh 'ssh paris.williamdunkerley.com \'sudo /usr/sbin/service nginx restart\''
		}
	}
}