const path = require("path");
const cloudinary = require("cloudinary");
const DataUri = require("datauri/parser");
// const {
//   ListObjectsV2Command,
//   S3Client,
//   GetObjectCommand,
//   PutObjectCommand,
// } = require("@aws-sdk/client-s3");

// const fetchConfig = {
//   credentials: {
//     accessKeyId: "",
//     secretAccessKey: "",
//   },
//   region: "",
// };

// const s3 = new S3Client(fetchConfig);

export const cloudinaryService = async (
  files: any,
  service: any
): Promise<{ successful: boolean; message: string; urls: any[] }> => {
  try {
    cloudinary.config({
      cloud_name: "dopuv9ng2",
      api_key: "455659881127534",
      api_secret: "T4s_1Q4uw-kgOqJtUKXW5_1MJuw",
    });

    const urls = [];

    const dtauri = new DataUri();

    for (const file of files) {
      const dataUri = dtauri.format(
        path.extname(file.originalname),
        file.buffer
      );

      const final_file = dataUri.content;

      const image = await cloudinary.v2.uploader.upload_large(final_file);

      urls.push(image.secure_url);
      console.log(urls)
    }

    return { successful: true, message: "files uploaded successfully", urls };
  } catch (error) {
    return { successful: false, message: (error as Error).message, urls: [] };
  }
};

// export const AWSService = async (
//   files: any,
//   service: any
// ): Promise<{ successful: boolean; message: string; urls: any[] }> => {
//   try {
//     const urls = [];

//     const dtauri = new DataUri();

//     for (const file of files) {
//       const putCommand = new PutObjectCommand({
//         Bucket: "bucketName",
//         Key: file.originalname,
//         Body: file.buffer,
//       });

//       const img = await s3.send(putCommand);

//       urls.push(img.secure_url);
//     }

//     return { successful: true, message: "files uploaded successfully", urls };
//   } catch (error) {
//     return { successful: false, message: (error as Error).message, urls: [] };
//   }
// };
