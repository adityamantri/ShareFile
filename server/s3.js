import aws from 'aws-sdk';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { promisify } from 'util';

dotenv.config();

const randomBytes = promisify(crypto.randomBytes); 
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_KEY
const bucketName = process.env.AWS_BUCKET_NAME

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion:"v4"
});

const generateSignedUrl = async () => {
    const bytes = await randomBytes(16);
    const imageName = bytes.toString('hex');
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60*60
    }

    const signedUrl = await s3.getSignedUrlPromise('putObject', params)
    return signedUrl;
}

export default generateSignedUrl;