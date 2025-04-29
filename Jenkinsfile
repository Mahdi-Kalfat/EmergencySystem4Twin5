pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }
    environment {
        DOCKER_IMAGE = 'anasbettouzia/nodemongoapp:6.0',
        DOCKER_IMAGE_Front = 'anasbettouzia/frontendemergency'
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
        
stage('Analyse SonarQube') {
    steps {
        dir('BackEnd') {
            withSonarQubeEnv('sq1') {
                sh '''
                    npm install -g sonar-scanner --registry=https://registry.npmjs.org
                    sonar-scanner \
                      -Dsonar.projectKey=EmergencySystem4Twin5 \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=$SONAR_HOST_URL \
                      -Dsonar.login=$SONAR_AUTH_TOKEN
                '''
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
                stage('Vérification Prometheus') {
            steps {
                echo 'Vérification de l\'exposition des métriques de Jenkins'
                sh 'curl -s http://172.20.116.17:8080/prometheus || echo "Erreur: Jenkins ne fournit pas les métriques"'

                echo 'Vérification que Prometheus récupère les métriques'
                sh 'curl -s http://localhost:9090/api/v1/targets | jq .'
            }
        }
                stage('Deploy Front avec Docker Compose') {
            steps {
                script {
                    sh 'docker pull $DOCKER_IMAGE_Front'
                    sh 'docker compose down || true'
                    sh 'docker compose up -d'
                }
            }
        }


    }
}
