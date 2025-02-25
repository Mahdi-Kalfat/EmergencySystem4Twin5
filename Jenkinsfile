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
                url: 'https://github.com/Mahdi-Kalfat/EmergencySystem4Twin5.git',
            }
        }

        stage('Docker Compose Down') {
            steps {
                script {
                    sh 'docker-compose down'
                }
            }
        }

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

        stage('Install Dependencies - Frontend') {
            steps {
                script {
                    dir('FrontEnd') {
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


        // stage('Docker Build & Push Backend') {
        //     steps {
        //         script {
        //             dir('BackEnd') {
        //                 docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        //                     def backendImage = docker.build("narnidhal/foyer-backend:6.0")
        //                     backendImage.push()
        //                 }
        //             }
        //         }
        //     }
        // }

        // stage('Docker Build & Push Frontend') {
        //     steps {
        //         script {
        //             dir('FrontEnd') {
        //                 docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
        //                     def frontendImage = docker.build("narnidhal/foyer-frontend:4")
        //                     frontendImage.push()
        //                 }
        //             }
        //         }
        //     }
        // }

        // stage('Deploy with Docker Compose') {
        //     steps {
        //         script {
        //             sh 'docker-compose up -d --build'
        //         }
        //     }
        // }
    }
}
