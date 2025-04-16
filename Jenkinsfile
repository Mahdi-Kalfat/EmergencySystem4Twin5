
pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }
    environment {
        DOCKER_IMAGE = 'anasbettouzia/nodemongoapp:6.0'
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
                sh 'npm install --registry=https://registry.npmjs.org'  
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
        stage('Deploy avec Docker Compose') {
            steps {
                script {
                    sh 'docker pull $DOCKER_IMAGE'
                    sh 'docker compose down || true'
                    sh 'docker compose up -d'
                }
            }
        }
        stage('Vérification des conteneurs') {
            steps {
                script {
                    sh 'docker ps'
                }
            }
        }


    }
}
