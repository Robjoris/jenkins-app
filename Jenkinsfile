pipeline {
    agent any
    tools { nodejs "nodePlaywright" }
    
    stages {
        stage("npm") {
            steps {
                sh 'npm install'
                sh 'npm --version'
                sh 'npm init playwright@latest --yes -- --quiet --browser=chromium --lang=js --gha'
//                 sh 'apt-get install -y gstreamer1.0-libav libnss3-tools libatk-bridge2.0-0 libcups2-dev libxkbcommon-x11-0 libxcomposite-dev libxrandr2 libgbm-dev libgtk-3-0'
//                 sh 'npm run playwrightRights'
                sh 'npm run testCase'
            }
        }
    }
}
