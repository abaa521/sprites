pipeline {
  agent any
  environment {
    APP_NAME    = 'sprites'
    PORT        = '3015'
    NODE_ENV    = 'production'
    WORK_DIR    = "${env.WORKSPACE}"
    PUBLISH_DIR = 'C:/Publish/sprites'
    PNPM        = 'pnpm'
    NPX         = 'C:/Program Files/nodejs/npx.cmd'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Node Install') {
      steps {
        bat '%PNPM% install --frozen-lockfile'
      }
    }

    stage('Prepare Publish Dir') {
      steps {
        bat '''
        if not exist "%PUBLISH_DIR%" mkdir "%PUBLISH_DIR%"
        '''
        // 複製必要檔案到發佈資料夾
        bat '''
        robocopy "%WORK_DIR%" "%PUBLISH_DIR%" /MIR /XD .git node_modules .vscode .github /XF Jenkinsfile *.log *.md
        exit 0
        '''
      }
    }

    stage('Install Production Deps (Publish Dir)') {
      steps {
        bat '''
        cd /d "%PUBLISH_DIR%"
        %PNPM% install --frozen-lockfile --prod
        '''
      }
    }

    stage('PM2 Deploy') {
      steps {
        bat '''
        cd /d "%PUBLISH_DIR%"
        "%NPX%" pm2 describe %APP_NAME% >nul 2>&1 && (
          echo Restarting existing PM2 app: %APP_NAME%
          "%NPX%" pm2 restart ecosystem.config.js
        ) || (
          echo Starting new PM2 app: %APP_NAME%
          "%NPX%" pm2 start ecosystem.config.js
        )
        "%NPX%" pm2 save
        "%NPX%" pm2 ls
        '''
      }
    }
  }
  post {
    failure {
      echo 'Deploy failed.'
      bat '"%NPX%" pm2 logs %APP_NAME% --lines 200 --nostream || ver > nul'
    }
    success {
      echo 'Deploy success.'
    }
  }
}
