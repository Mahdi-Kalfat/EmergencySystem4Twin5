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

        stage('Checkout docker-compose.yml from main') {
            steps {
                script {
                    dir('BackEnd') {
                        sh '''
                            git fetch origin main:main
                            git checkout main -- docker-compose.yml
                            ls -la  # Debugging: List files to verify the checkout
                        '''
                    }
                }
            }
        }

        stage('Building and Running Containers') {
            steps {
                script {
                    dir('BackEnd') {
                        sh 'docker-compose up --build -d'  // Run docker-compose commands
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    dir('BackEnd') {
                        sh 'docker-compose down'  // Clean up after containers
                    }
                }
            }
        }
    }
}
