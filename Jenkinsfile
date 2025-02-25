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

        // stage('Docker Compose Down') {
        //     steps {
        //         script {
        //             sh 'docker-compose down'
        //         }
        //     }
        // }

        stage('Install Dependencies - Backend') {
            steps {
                script {
                    dir('BackEnd') {
                        sh 'rm -rf node_modules package-lock.json' // Clean existing dependencies
                        sh 'npm install'  // Install all dependencies
                    }
                }
            }
        }


        stage('Run Tests - Backend') {
            steps {
                script {
                    dir('BackEnd') {
                        sh 'npm test'  // Run Jest or Mocha tests
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('BackEnd') {
                        sh 'npm run build'  // Build the Node.js backend if necessary
                    }
                }
            }
        }
    }
}
