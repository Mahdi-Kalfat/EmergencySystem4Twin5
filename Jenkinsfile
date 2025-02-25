pipeline {
    agent any
     tools {
        nodejs 'Node18' // Use the configured NodeJS installation
    }

    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh('npm install')
                }
            }
        }

        stage('Unit Test') {
            steps {
              script{
              sh('npm test')
            }
        }
    }
        stage('Build application'){
          steps {  
            script {
            sh('npm run build-dev')
          }
        }
        }
}
}

