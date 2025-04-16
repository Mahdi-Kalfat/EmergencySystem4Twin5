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
                    // Ajoutez des tests ou retirez cette étape si vous n'en avez pas
                    sh 'echo "No tests configured"'
                }
            }
        }

stage('Pack NodeJS Project') {
    steps {
        dir('BackEnd') {
            // 1. Incrémenter d'abord la version
            sh 'npm version patch --no-git-tag-version'
            
            // 2. Ensuite pack pour créer le .tgz avec la nouvelle version
            sh 'npm pack'

            // 3. Archiver le fichier généré
            archiveArtifacts artifacts: '*.tgz', fingerprint: true
        }
    }
}


stage('Deploy to Nexus') {
    steps {
        dir('BackEnd') {
            script {
                def version = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
                def packageFile = sh(script: 'ls *.tgz', returnStdout: true).trim()

                echo "Uploading file: ${packageFile} to Nexus"

                nexusArtifactUploader(
                    nexusVersion: 'nexus3',
                    protocol: 'http',
                    nexusUrl: "${env.NEXUS_URL}",
                    groupId: 'emergency',
                    version: "${version}",
                    repository: "${env.NEXUS_REPO}",
                    credentialsId: 'deploymentRepo',
                    artifacts: [[
                        artifactId: 'emergencymanagementsystem',
                        classifier: '',
                        file: "${packageFile}",
                        type: 'tgz'
                    ]]
                )
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
