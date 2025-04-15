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
            stage('Pack NodeJS Project') {
      steps {
        dir('BackEnd') {
          sh 'npm pack'
        }
      }
    }
    stage('Upload to Nexus') {
      steps {
        script {
          dir('BackEnd') {
            def packageName = sh(script: "node -p \"require('./package.json').name\"", returnStdout: true).trim()
            def packageVersion = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
            def tgzFile = "${packageName}-${packageVersion}.tgz"

            nexusArtifactUploader(
              nexusVersion: 'nexus3',
              protocol: 'http',
              nexusUrl: '172.20.116.17:8081',
              groupId: 'com.nodejs.emergency',
              version: packageVersion,
              repository: 'npm-piweb', 
              credentialsId: 'deploymentRepo', 
              artifacts: [
                [
                  artifactId: packageName,
                  classifier: '',
                  file: tgzFile,
                  type: 'tgz'
                ]
              ]
            )
          }
        }
      }
    }

        stage('Analyse SonarQube') {
            steps {
                script {
                    dir('BackEnd') {
                        withSonarQubeEnv('sq1') {
                            sh '''
                                npx sonar-scanner \
                                  -Dsonar.projectKey=EmergencySystem4Twin5 \
                                  -Dsonar.sources=. \
                                  -Dsonar.host.url=$SONAR_HOST_URL \
                                  -Dsonar.login=$SONAR_AUTH_TOKEN
                            '''
                        }
                    }
                }
            }
        }

     /*   stage('Déploiement Docker Compose') {
            steps {
                script {
                    dir('BackEnd') {
                        sh 'docker pull $DOCKER_IMAGE'
                        sh 'docker compose down || true'
                        sh 'docker compose up -d'
                    }
                }
            }
        }*/

        stage('Vérification des conteneurs') {
            steps {
                script {
                    sh 'docker ps'
                }
            }
        }

        stage('Vérification Prometheus') {
            steps {
                script {
                    echo 'Vérification de l\'exposition des métriques de Jenkins'
                    sh 'curl -s http://172.20.116.17:8080/prometheus || echo "Erreur: Jenkins ne fournit pas les métriques"'

                    echo 'Vérification que Prometheus récupère les métriques'
                    sh 'curl -s http://localhost:9090/api/v1/targets | jq .'
                }
            }
        }
    }
}

