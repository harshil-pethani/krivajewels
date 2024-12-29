import { Router } from 'express';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const router = Router();

const s3client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_KEY
    }
})

router.get('/upload-url', async (req, res) => {
    const { filename, contentType } = req.query;
    if (!filename || !contentType) {
        return res.status(400).json({ error: 'Filename and contentType are required' });
    }
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            ContentType: contentType
        });
        const uploadUrl = await getSignedUrl(s3client, command, { expiresIn: 3600 });
        return res.json({ uploadUrl });
    } catch (error) {
        return res.status(500).json({ error: 'Error generating upload URL' });
    }
});

export const deleteFileFromBucket = async (fileName) => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileName
        });
        const response = await s3client.send(command);
        if (response?.$metadata.httpStatusCode === 204 || response?.$metadata.httpStatusCode === 200 || response?.$metadata.httpStatusCode === 201) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

// Generate a signed URL for retrieving
router.get('/download-url', async (req, res) => {
    const { key } = req.query;
    if (!key) {
        return res.status(400).json({ error: 'Key is required' });
    }
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        });
        const downloadUrl = await getSignedUrl(s3client, command, { expiresIn: 3600 });
        res.json({ downloadUrl });
    } catch (error) {
        res.status(500).json({ error: 'Error generating download URL' });
    }
});

export default router;