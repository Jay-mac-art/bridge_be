pipeline {
	agent any
	options {
        skipStagesAfterUnstable()
		timeout(time: 30, unit: 'MINUTES')
    	}
// ECR_URL, ENV, env.JOB_NAME, branch
	environment { 
        ECR_URL = '408153089286.dkr.ecr.ap-south-1.amazonaws.com/cvs-event-backend-dev'
		ENV = 'dev'
    	}
	stages {
		stage('BUILD') {
			when{
				branch 'development'
			}
			steps {
				script {
					committerEmail = sh (
      				script: 'git log -1 --pretty=format:"%an"',
      				returnStdout: true
					).trim()
				}
				echo "Committer Email : '${committerEmail}'"
				slackSend (
					color: 'good',
					channel: '#pl-builds-alerts',
					message: "${env.JOB_NAME} | Job has initiated : #${env.BUILD_NUMBER} by ${committerEmail}")
				slackSend (
					color: 'warning',
					channel: '#pl-builds-alerts',
					message: "${env.JOB_NAME} | Build is started : #${env.BUILD_NUMBER}")
				echo "Step: BUILD, initiated..."
				sh "docker build -t '${ECR_URL}':'${BUILD_NUMBER}' ."
				slackSend (
					color: 'warning',
					channel: '#pl-builds-alerts',
					message: "${env.JOB_NAME} | Build has been completed : #${env.BUILD_NUMBER}")
			}
		}
		stage('ECR PUSH') {
			when{
				branch 'development'
			}
			steps {
				echo "Step: Pushing Image ..."
				sh "aws ecr get-login --no-include-email --region ap-south-1 | sh"
				sh "docker push '${ECR_URL}':${BUILD_NUMBER}"
           		slackSend (
					color: 'warning',
					channel: '#pl-builds-alerts',
					message: "${env.JOB_NAME} | Build has been pushed to the ECR : #${env.BUILD_NUMBER}")
			}
		}
		stage('DEPLOY') {
			when{
				branch 'development'
			}
			steps {
				echo "Deploying into '${ENV}' environment"
				sh "aws eks --region ap-south-1 update-kubeconfig --name p2epro-stg"
				sh "sed -i 's/<VERSION>/${BUILD_NUMBER}/g' deployment-'${ENV}'.yaml"
				sh "kubectl apply -f deployment-'${ENV}'.yaml"
				echo "'${ENV}' deployment completed: '${env.BUILD_ID}' on '${env.BUILD_URL}'"
           		slackSend (
					color: 'warning',
					channel: '#pl-builds-alerts',
					message: "${env.JOB_NAME} | Deployment has been completed : #${env.BUILD_NUMBER}")
			}
		}
		stage('POST_CHECKS') {
			when{
				branch 'development'
			}
			steps {
				echo "POST test"
			}	
			post {
				always {
					echo "ALWAYS test1"
				}
				success {
					slackSend (
						color: 'good',
						channel: '#pl-builds-alerts',
						message: "${env.JOB_NAME} | Job has succeeded : #${env.BUILD_NUMBER} in ${currentBuild.durationString.replace(' and counting', '')} \n For more info, please click (<${env.BUILD_URL}|here>)")
				}
				failure {
					slackSend (
						color: 'danger',
						channel: '#pl-builds-alerts',
						message: "${env.JOB_NAME} | @channel - Job has failed #${env.BUILD_NUMBER}\nPlease check full info, (<${env.BUILD_URL}|here>)")
				}
			}
		}
	}
	post {
		always {
			echo "ALWAYS test2"
		}
		aborted {
			slackSend (
				color: '#AEACAC',
				channel: '#pl-builds-alerts',
				message: "${env.JOB_NAME} | Job has aborted : #${env.BUILD_NUMBER} in ${currentBuild.durationString.replace(' and counting', '')} \n For more info, please click (<${env.BUILD_URL}|here>)")
		}
		failure {
			slackSend (
				color: 'danger',
				channel: '#pl-builds-alerts',
				message: "${env.JOB_NAME} | @channel - Job has failed #${env.BUILD_NUMBER}\nPlease check full info, (<${env.BUILD_URL}|here>)")
		}
	}
}
