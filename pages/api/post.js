import connectDB from '../../db/mongodb';
import Post from '../../models/posts.model';
/**
 * @param {import('next).NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function POST(req, res) {
    try {
        await connectDB();
        const body = req.body;
        body.date = new Date();
        const createdPost = await Post.create(body);
        console.log('createdPost', createdPost);
        res.status(200).send({ status: 'success', result: createdPost })

    } catch (err) {
        console.log('err', err)
        res.status(400).send({ status: 'failed', err: err })
    }
}