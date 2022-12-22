pipeline {
    agent any
    tools { nodejs "nodePlaywright" }
    stages {
//       stage('sudo user') {
//         steps {
//           sh 'sudo usermod -a -G docker jenkins'
//         }
//       }
      stage('e2e-tests') {
         steps {
             sh 'npm install'
             sh 'npx playwright install'
             sh 'npx playwright install-deps'
             sh 'npx playwright test'
         }
      }
   }
}
