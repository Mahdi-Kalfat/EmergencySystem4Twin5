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
                echo 'Cloning BackEnd branch inside BackEnd directory'
                dir('BackEnd') {
                    git branch: 'BackEnd',
                        url: 'https://github.com/Mahdi-Kalfat/EmergencySystem4Twin5.git'
                }
            }
        }

        stage('Install Dependencies - Backend') {
            steps {
                dir('BackEnd') {
                    sh 'rm -rf node_modules package-lock.json'
                    sh 'npm install'
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

stage('Pack NodeJS Project') {
    steps {
        dir('BackEnd') {
            sh 'ls -la' // Show files before packing
            sh 'npm pack'
            sh 'ls -la' // Show files after packing
        }
    }
}

stage('Upload to Nexus') {
    steps {
        dir('BackEnd') {
            script {
                // Get package info
                def packageJson = readJSON file: 'package.json'
                def packageName = packageJson.name
                def packageVersion = packageJson.version
                def tgzFile = "${packageName}-${packageVersion}.tgz"
                
                // Verify file exists
                if (!fileExists(tgzFile)) {
                    error("ERROR: Package file ${tgzFile} not found!")
                }
                
                echo "Package file ${tgzFile} exists, preparing to upload"
                
                // Try uploading with timeout
                timeout(time: 5, unit: 'MINUTES') {
                    try {
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
                        echo "Successfully uploaded ${tgzFile} to Nexus"
                    } catch (Exception e) {
                        error("Failed to upload to Nexus: ${e.toString()}")
                    }
                }
            }
        }
    }
}

        stage('Analyse SonarQube') {
            steps {
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

        /*stage('Déploiement Docker Compose') {
            steps {
                dir('BackEnd') {
                    sh 'docker pull $DOCKER_IMAGE'
                    sh 'docker compose down || true'
                    sh 'docker compose up -d'
                }
            }
        }*/

        stage('Vérification des conteneurs') {
            steps {
                sh 'docker ps'
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
    }
}
