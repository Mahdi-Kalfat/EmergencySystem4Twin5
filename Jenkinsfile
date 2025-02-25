pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM', 
                        branches: [[name: '*/BackEnd']],
                        userRemoteConfigs: [[url: 'https://github.com/Mahdi-Kalfat/EmergencySystem4Twin5.git']]
                    ])
                }
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm install -g nodemon'
                }
            }
        }



        stage('Build application') {
            steps {
                script {
                    sh 'npm run dev'
                }
            }
        }
    }
}
