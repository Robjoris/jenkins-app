pipeline {
    agent any
    
    tools { nodejs "nodejs"}
    
    stages {
        stage("npm") {
            steps {
                sh 'npm install'
                sh 'npm --version'
                sh 'npm run testCase'
            }
        }
    }
}
