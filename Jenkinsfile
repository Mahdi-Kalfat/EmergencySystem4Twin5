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
        stage('Building images (node and mongo)') {
            steps{
                script {
                            sh('docker-compose build')
        }
    }
}

    }
}
