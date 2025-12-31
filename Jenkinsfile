pipeline {
  agent any
  environment {
    APP_NAME     = 'sprites'
    PORT         = '3015'
    DOCKER_IMAGE = 'sprites:latest'
    PUBLISH_DIR  = 'C:/Publish/sprites'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        bat '''
        docker build -t %DOCKER_IMAGE% .
        '''
      }
    }

    stage('Prepare Publish Dir') {
      steps {
        bat '''
        if not exist "%PUBLISH_DIR%" mkdir "%PUBLISH_DIR%"
        '''
      }
    }

    stage('Stop Existing Container') {
      steps {
        bat '''
        docker stop %APP_NAME% >nul 2>&1 || exit /b 0
        docker rm %APP_NAME% >nul 2>&1 || exit /b 0
        '''
      }
    }

    stage('Run Docker Container') {
      steps {
        bat '''
        docker run -d ^
          --name %APP_NAME% ^
          -p %PORT%:%PORT% ^
          --restart always ^
          --memory 256m ^
          --cpus 0.5 ^
          %DOCKER_IMAGE%
        '''
      }
    }

    stage('Verify Container') {
      steps {
        bat '''
        timeout /t 5 /nobreak
        docker ps -a | find "%APP_NAME%"
        '''
      }
    }
  }
  post {
    failure {
      echo 'Deploy failed.'
      bat '''
      docker logs %APP_NAME% --tail 100 || ver > nul
      '''
    }
    success {
      echo 'Deploy success. Sprites server is running on port %PORT%'
      bat '''
      docker ps | find "%APP_NAME%"
      '''
    }
  }
}
