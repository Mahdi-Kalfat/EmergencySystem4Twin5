pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout GIT') {
            steps {
                echo 'Pulling the latest code...'
                git branch: 'BackEnd',
                    url: 'https://github.com/Mahdi-Kalfat/EmergencySystem4Twin5.git'
            }
        }

        stage('Install Dependencies - Backend') {
            steps {
                script {
                    dir('BackEnd') {
                        sh 'rm -rf node_modules package-lock.json' 
                        sh 'npm install'  
                    }
                }
            }
        }

        stage('Run Tests - Backend') {
            steps {
                script {
                    dir('BackEnd') {
                        sh 'npm test' 
                    }
                }
            }
        }

        // stage('Building and Running Containers') {
        //     steps {
        //         script {
        //             dir('BackEnd') {
        //                 // Build and run containers using docker-compose
        //                 sh 'docker-compose up --build -d'
        //             }
        //         }
        //     }
        // }

        // stage('Cleanup') {
        //     steps {
        //         script {
        //             dir('BackEnd') {
        //                 // Bring down the containers after build and testing
        //                 sh 'docker-compose down'
        //             }
        //         }
        //     }
        // }
    }
}
