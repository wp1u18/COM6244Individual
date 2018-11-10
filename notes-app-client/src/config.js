export default {
    s3: {
        REGION: "eu-west-2",
        BUCKET: "notes-app-api-prod-serverlessdeploymentbucket-7c462j0479uu"
    },
    apiGateway: {
        REGION: "eu-west-2",
        URL: "https://hq5uzkor05.execute-api.eu-west-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "eu-west-2",
        USER_POOL_ID: "eu-west-2_dr2iLk95C",
        APP_CLIENT_ID: "1385ea5brvt6c5p9ikeg4c1rjs",
        IDENTITY_POOL_ID: "eu-west-2:94cc4c1b-2053-46d5-a8a2-79119d22c1aa"
    }
};