pipeline {
    agent any
    }
    tools { nodejs "nodePlaywright" }
    stages {
      stage('Initialize'){
         def dockerHome = tool 'myDocker'
         env.PATH = "${dockerHome}/bin:${env.PATH}"
      }
      stage('sudo user') {
          sh 'sudo usermod -a -G docker jenkins'
      }
      stage('e2e-tests') {
         steps {
             sh 'npm install'
             sh 'npx playwright install'
             sh 'npx playwright install-deps --dry-run'
             sh 'npx playwright test'
         }
      }
   }
}
