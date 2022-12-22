pipeline {
    agent {
        docker {
            image 'ubuntu'
            args '-u root:sudo -v /var/jenkins/workspace/test automation/'
        }
    }
    tools { nodejs "nodePlaywright" }
    stages {
      stage('e2e-tests') {
         steps {
             sh 'npm install'
             sh 'npx playwright install'
//              sh 'npx playwright install-deps --dry-run'
             sh 'npx playwright test'
         }
      }
   }
}
