pipeline {
    agent any
    tools { 
        nodejs "nodePlaywright"
    }
    stages {
      stage('e2e-tests') {
         steps {
             sh 'npm install'
             sh 'npx playwright install'
             sh 'sudo npx playwright install-deps'
             sh 'npx playwright test'
         }
      }
   }
}
