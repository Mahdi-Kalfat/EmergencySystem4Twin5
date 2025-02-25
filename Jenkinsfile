pipeline {
    agent any

    tools {
        nodejs "NodeJS"  // Ensure NodeJS tool is configured in Jenkins global tools
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
                        sh 'npm test'  // Ensure tests are working correctly
                    }
                }
            }
        }

        stage('Building and Running Containers') {
            steps {
                script {
                    dir('BackEnd') {
                        // Ensure Docker Compose is installed and configured correctly
                        sh 'docker-compose up --build -d'  // Run docker-compose commands
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    dir('BackEnd') {
                        // Ensure containers are shut down properly after the build
                        sh 'docker-compose down'  // Clean up after containers
                    }
                }
            }
        }
    }
}
