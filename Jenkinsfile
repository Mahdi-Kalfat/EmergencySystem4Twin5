pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM', 
                        branches: [[name: '*/Backend']],
                        userRemoteConfigs: [[url: 'https://github.com/Mahdi-Kalfat/EmergencySystem4Twin5.git']]
                    ])
                }
            }
        }
            stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh('npm install')
                }
            }
        }

        stage('Unit Test') {
            steps {
              script{
              sh('npm test')
            }
        }
    }
        stage('Build application'){
          steps {  
            script {
            sh('npm run build-dev')
          }
        }
        }


}
}

