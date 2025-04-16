pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }
    environment {
        DOCKER_IMAGE = 'anasbettouzia/nodemongoapp:6.0'
        NEXUS_URL = '172.20.116.17:8081'
        NEXUS_REPO = 'npm-piweb'
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

                stage('Pack NodeJS Project') {
    steps {
        dir('BackEnd') {
            sh 'npm version patch --no-git-tag-version'
            sh 'rm -f *.tgz'
            sh 'npm pack'
            sh 'ls -la *.tgz'

            archiveArtifacts artifacts: '*.tgz', fingerprint: true
        }
    }
}

stage('Configure NPM for Nexus') {
    steps {
        dir('BackEnd') {
            withCredentials([usernamePassword(credentialsId: 'deploymentRepo', 
                           usernameVariable: 'NEXUS_USER', 
                           passwordVariable: 'NEXUS_PASS')]) {
                sh '''
                    npm config set registry http://172.20.116.17:8081/repository/npm-piweb/
                    npm config set _auth $(echo -n "${NEXUS_USER}:${NEXUS_PASS}" | base64)
                    npm config set always-auth true
                '''
            }
        }
    }
}

stage('Deploy to Nexus') {
    steps {
        dir('BackEnd') {
            script {
                    def packageJson = readJSON file: 'package.json'
                    def version = packageJson.version
                    def packageName = packageJson.name
                    def packageFile = "${packageName}-${version}.tgz"
                    
                    echo "Uploading ${packageFile} to Nexus"
                    
                    nexusPublisher(
                        nexusInstanceId: 'nexus3',
                        nexusRepositoryId: "${env.NEXUS_REPO}",
                        packages: [
                            [
                                $class: 'NpmPackage',
                                packageName: "${packageName}",
                                version: "${version}",
                                credentialsId: 'deploymentRepo',
                                file: "${packageFile}"
                            ]
                        ]
                    )
            }
        }
    }
}    


    }
}
