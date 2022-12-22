pipeline {
    agent any
    
    tools { nodejs "nodePlaywright"}
    
    stages {
        stage("npm") {
            steps {
                sh 'npm install'
                sh 'npm --version'
                sh 'npm run installPlaywright'
                sh 'npm run testCase'
            }
        }
    }
}
