pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.29.0-focal' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'npm install'
            sh 'npx playwright test'
         }
      }
   }
}
