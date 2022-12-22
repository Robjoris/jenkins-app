pipeline {
    agent any
    
    tools { nodejs "nodePlaywright"}
    
    stages {
        stage("npm") {
            steps {
                sh 'npm install'
                sh 'npm --version'
                sh 'npm install -D @playwright/test'
                sh 'npm run installPlaywright'
                sh 'npm run playwrightRights'
                sh 'npm run testCase'
            }
        }
    }
}
