pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        DOCKERHUB_USERNAME = 'anasbettouzia'
        DOCKER_IMAGE = 'anasbettouzia/nodemongoapp'
        DOCKER_IMAGE_FRONT = 'anasbettouzia/frontendemergency'
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
                dir('BackEnd') {
                    sh 'rm -rf node_modules package-lock.json'
                    sh 'npm install --registry=https://registry.npmjs.org'
                }
            }
        }

        stage('Run Tests - Backend') {
            steps {
                dir('BackEnd') {
                    sh 'npm test'
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

        stage('Build & Push Docker Backend') {
            steps {
                    dir('BackEnd') {
                withCredentials([string(credentialsId: 'DOCKERHUB_PASSWORD', variable: 'DOCKERHUB_PASSWORD')]) {
                    script {
                        def tag = "${env.BUILD_NUMBER}"
                        sh """
                            docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD
                            docker build -t $DOCKER_IMAGE:$tag ./BackEnd
                            docker tag $DOCKER_IMAGE:$tag $DOCKER_IMAGE:latest
                            docker push $DOCKER_IMAGE:$tag
                            docker push $DOCKER_IMAGE:latest
                        """
                    }
                }
                }
            }
        }

        stage('Build & Push Docker Frontend') {
            steps {
                withCredentials([string(credentialsId: 'DOCKERHUB_PASSWORD', variable: 'DOCKERHUB_PASSWORD')]) {
                    script {
                        def tag = "${env.BUILD_NUMBER}"
                        sh """
                            docker build -t $DOCKER_IMAGE_FRONT:$tag ./FrontEnd
                            docker tag $DOCKER_IMAGE_FRONT:$tag $DOCKER_IMAGE_FRONT:latest
                            docker push $DOCKER_IMAGE_FRONT:$tag
                            docker push $DOCKER_IMAGE_FRONT:latest
                        """
                    }
                }
            }
        }

        stage('Deploy avec Docker Compose') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }

        stage('Vérification des conteneurs') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Vérification Prometheus') {
            steps {
                echo 'Vérification Prometheus'
                sh 'curl -s http://172.20.116.17:8080/prometheus || echo "Erreur: Jenkins ne fournit pas les métriques"'
                sh 'curl -s http://localhost:9090/api/v1/targets | jq . || echo "jq non disponible"'
            }
        }
    }
}
