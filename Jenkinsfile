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
        stage('Verify Nexus Configuration') {
    steps {
        script {
            withCredentials([usernamePassword(
                credentialsId: 'deploymentRepo',
                usernameVariable: 'admin',
                passwordVariable: 'admin123'
            )]) {
                sh """
                    echo "Testing Nexus connection and repository..."
                    # Check if repository exists
                    curl -v -u ${NEXUS_USER}:${NEXUS_PASS} \
                    -X GET \
                    "http://172.20.116.17:8081/service/rest/v1/repositories/npm-piweb" \
                    || echo "Repository check failed"
                    
                    # Check upload permissions
                    echo "Testing upload permissions..."
                    echo "test" > test.txt
                    curl -v -u ${NEXUS_USER}:${NEXUS_PASS} \
                    --upload-file test.txt \
                    "http://172.20.116.17:8081/repository/npm-piweb/test.txt" \
                    || echo "Upload test failed"
                """
            }
        }
    }
}

stage('Upload to Nexus') {
    steps {
        dir('BackEnd') {
            script {
                def packageJson = readJSON file: 'package.json'
                def packageName = packageJson.name
                def packageVersion = packageJson.version
                def tgzFile = "emergencymanagementsystem-${packageVersion}.tgz"
                
                // Enhanced file verification
                def fileSize = sh(script: "stat -c%s ${tgzFile}", returnStdout: true).trim()
                if (fileSize.toInteger() == 0) {
                    error("ERROR: Package file ${tgzFile} is empty!")
                }
                
                echo "Uploading ${tgzFile} (size: ${fileSize} bytes) to Nexus"
                
                // Option 1: Using nexusArtifactUploader with enhanced logging
                try {
                    nexusArtifactUploader(
                        nexusVersion: 'nexus3',
                        protocol: 'http',
                        nexusUrl: '172.20.116.17:8081',
                        groupId: 'emergency',
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
                    echo "Upload successful through nexusArtifactUploader"
                } catch (Exception e) {
                    echo "nexusArtifactUploader failed, falling back to direct upload"
                    
                    // Option 2: Direct cURL upload as fallback
                    withCredentials([usernamePassword(
                        credentialsId: 'deploymentRepo',
                        usernameVariable: 'admin',
                        passwordVariable: 'admin123'
                    )]) {
                        def uploadStatus = sh(
                            script: """
                                curl -v -u ${NEXUS_USER}:${NEXUS_PASS} \
                                --upload-file ${tgzFile} \
                                "http://172.20.116.17:8081/repository/npm-piweb/${tgzFile}" \
                                -w "%{http_code}" -o /dev/null
                            """,
                            returnStdout: true
                        ).trim()
                        
                        if (uploadStatus != "200" && uploadStatus != "201") {
                            error("Direct upload failed with HTTP status ${uploadStatus}")
                        }
                        echo "Direct upload successful (HTTP ${uploadStatus})"
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
