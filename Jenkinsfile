pipeline {
    agent any
    stages {
        stage("npm") {
            steps {
               sh "npm install"
               sh"npm run testCase"
            }
        }
    }
}
