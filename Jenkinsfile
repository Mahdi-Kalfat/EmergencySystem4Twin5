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
                    sh 'echo "No tests configured"'
                }
            }
        }

        stage('Pack NodeJS Project') {
            steps {
                dir('BackEnd') {
                    // D'abord incrémenter la version
                    sh 'npm version patch --no-git-tag-version'
                    
                    // Ensuite pack avec la nouvelle version
                    sh 'npm pack'
                    
                    // Vérification du fichier généré
                    sh 'ls -la *.tgz'
                    archiveArtifacts artifacts: '*.tgz', fingerprint: true
                }
            }
        }

        stage('Deploy to Nexus') {
            steps {
                dir('BackEnd') {
                    script {
                        // Récupérer la version exacte
                        def version = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
                        def packageFile = "emergencymanagementsystem-${version}.tgz"
                        
                        // Solution alternative avec curl pour npm registry
                        sh """
                            curl -v -u ${NEXUS_CREDENTIALS} \
                            -X POST \
                            -H 'Content-Type: application/octet-stream' \
                            --data-binary @${packageFile} \
                            "http://${env.NEXUS_URL}/repository/${env.NEXUS_REPO}/"
                        """
                        
                        // Alternative 2: Utilisation de npm publish si configuré
                        // sh 'npm config set registry http://${env.NEXUS_URL}/repository/${env.NEXUS_REPO}/'
                        // sh 'npm publish --registry=http://${env.NEXUS_URL}/repository/${env.NEXUS_REPO}/'
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
