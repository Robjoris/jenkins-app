pipeline {
    agent any
    tools { nodejs "nodePlaywright" }
    stages {
      stage('e2e-tests') {
         steps {
             sh 'npm install'
             sh 'npx playwright install'
             sh 'npx playwright install-deps chromium'
             sh 'npx playwright test --project=chromium'
         }
      }
   }
}
