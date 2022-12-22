pipeline {
    agent any
    tools { 
        nodejs "nodePlaywright"
        docker "docker"
    }
    stages {
      stage('e2e-tests') {
         steps {
             sh 'npm install'
             sh 'npx playwright install'
//              sh 'sudo npx playwright install-deps chromium'
//              sh 'npx playwright test --project=chromium'
         }
      }
   }
}
