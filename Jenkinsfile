pipeline {
//    agent { docker { image 'mcr.microsoft.com/playwright:v1.29.0-focal' } }
    agent any
    tools { nodejs "nodePlaywright" }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'npm install'
            sh 'npx playwright test'
         }
      }
   }
}
