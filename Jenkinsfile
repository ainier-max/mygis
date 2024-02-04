pipeline {
     agent {
         node {
             label 'centos7'
             customWorkspace '/opt/jenkins-node/qb/workspace/gis_swordspect'
                 }
             }
     options {
         buildDiscarder(logRotator(numToKeepStr: '15'))
	     disableConcurrentBuilds()
     }
     parameters {
         choice choices: ['npm'], description: '请选择本次打包要打前端、后端还是都要（npm代表前端、maven代表后端、both代表都要）', name: 'packagemode'
		 string defaultValue: '1.0.0', description: '请输入前端包版本号。请输入前三段，如：1.0.0', name: 'npmversion', trim: false
     }
     tools {
         maven 'apache-maven-3.0.4'
         jdk 'jdk1.8'
     }
     environment {
         NODE_HOME = "/usr/local/node"
         SASS_BINARY_PATH = "/opt/linux-x64-72_binding.node"
         PATH = "$SASS_BINARY_PATH/bin:$PATH:$NODE_HOME/bin"
     }
     stages {
         stage('NPM-Build') {
		     when {
                 expression {
                     return  ("$packagemode" == "npm" ) || ("$packagemode" == "both" )
                 }
             }
             steps {
                 sh '''rm package-lock.json -f
                       npm install node-sass
                       npm install @qb/qb-base
                       npm install @qb/qb-ui
                       npm install
                       npm run build'''
             }
             post {
	             success {
	                 sh """rm -fr target
                           mkdir target
					       tar -cvf target/GIS-SWORDSPECT-WEB-${npmversion}.${SVN_REVISION}-BETA-${BUILD_TIMESTAMP}.rar dist """
	                 archiveArtifacts 'target/*.rar'
		         }
             }
         }
         stage('Vue Deployment') {
		     when {
                 expression {
                     return  ("$packagemode" == "npm" )
                 }
             }
	         steps {
	             sshPublisher(publishers: [sshPublisherDesc(configName: '172.16.0.103(70vue)', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: """mkdir -p /home/docker/cloud/gis_swordspect/html
	                               rm -fr /home/docker/cloud/gis_swordspect/html/*
                                 cd /opt
                                 tar -xvf GIS-SWORDSPECT-WEB-${npmversion}.${SVN_REVISION}-BETA-${BUILD_TIMESTAMP}.rar
                                 cp -fr dist/* /home/docker/cloud/gis_swordspect/html/
                                 rm -fr /opt/*""", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/opt', remoteDirectorySDF: false, removePrefix: 'target', sourceFiles: 'target/*.rar')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
		     }
         }
     }
     post {
         failure {
             emailext body: "Please go to ${BUILD_URL} and verify the build", subject: "Job '${JOB_NAME}' (${BUILD_NUMBER}) is waiting for input", to: 'huangsp@dragoninfo.com.cn'
         }
     }
}
