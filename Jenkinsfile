pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/usuario/plotly-dashboard.git'
        IMAGE_NAME = 'usuarioDockerHub/plotly-dashboard'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Clonar Repositorio') {
            steps {
                git branch: 'main', url: REPO_URL
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh """
                    echo \$DOCKER_PASS | docker login \
                    -u \$DOCKER_USER --password-stdin
                    """
                }
            }
        }

        stage('Publicar Imagen') {
            steps {
                sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"

                sh """
                docker tag ${IMAGE_NAME}:${IMAGE_TAG} \
                ${IMAGE_NAME}:latest
                """

                sh "docker push ${IMAGE_NAME}:latest"
            }
        }
    }
}