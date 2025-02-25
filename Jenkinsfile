pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM', 
                        branches: [[name: '*/Backend']],
                        userRemoteConfigs: [[url: 'https://github.com/Mahdi-Kalfat/EmergencySystem4Twin5.git']]
                    ])
                }
            }
        }


}
}

