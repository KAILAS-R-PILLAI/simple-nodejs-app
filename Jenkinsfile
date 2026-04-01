pipeline {
    agent any
    
    stages {
        stage ('Git Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'jenkins-git-scm', url: 'https://github.com/KAILAS-R-PILLAI/simple-nodejs-app']])
                sh 'ls -l'
            }
        }
        
        stage ('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage ('Test Application') {
            steps {
                sh 'npm test'
            }
        }
        
        stage ('Build Docker Image') {
            steps {
                sh 'docker build -t nodeapp:lts .'
            }
        }
        
        stage ('Stop and Delete Old Containers') {
            steps {
                sh '''
                docker stop nodeapp-task || true
                docker rm nodeapp-task || true
                '''
            }
        }
        
        stage ('Run Docker Image') {
            steps {
                sh 'docker run -d --name nodeapp-task -p 3000:3000 nodeapp:lts'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
