pipeline {
    agent any
    stages {
        stage("npm") {
            steps {
                npm install
                npm run testCase
            }
        }
    }
}
