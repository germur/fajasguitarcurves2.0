
import Replicate from 'replicate';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { userImage, garmentImage, category } = JSON.parse(event.body);

        if (!process.env.REPLICATE_API_TOKEN) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Missing API Key configuration' })
            };
        }

        // IDM-VTON Model
        const output = await replicate.run(
            "cuuupid/idm-vton:c871bb9b0466074280c2a9a7386749c8b0fbfd81f16d0061c3b17fb08c48a1f1",
            {
                input: {
                    human_img: userImage,
                    garm_img: garmentImage,
                    garment_des: category || "faja",
                    is_checked: true,
                    is_checked_crop: true,
                    denoise_steps: 30,
                    seed: 42
                }
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ result: output }),
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to generate image', details: error.message }),
        };
    }
};
